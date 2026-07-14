import { useEffect, useState, useRef } from "react";
import {
  collection, getDocs, doc, getDoc,
  setDoc, addDoc, updateDoc, deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { seedData } from "../seed";

const CLOUDINARY_CLOUD = "dzhctf6ew";
const CLOUDINARY_PRESET = "neevestate_uploads";

async function uploadToCloudinary(file, onProgress) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_PRESET);
  formData.append("folder", "neevestate");

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD}/image/upload`);
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) onProgress(Math.round((e.loaded / e.total) * 100));
    };
    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText);
      console.log("Cloudinary response:", xhr.status, res);
      if (xhr.status === 200) resolve(res.secure_url);
      else reject(new Error(res.error?.message || `HTTP ${xhr.status}: Upload failed`));
    };
    xhr.onerror = () => reject(new Error("Network error — check console"));
    xhr.send(formData);
  });
}

const ACCENT = "#7a5c2e";
const ACCENT_LIGHT = "#f0e8df";
const PASSWORD_KEY = "neev_admin_pw";
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "neev@admin123";

const inputStyle = {
  width: "100%", padding: "10px 13px", border: "1px solid #ddd6ce",
  borderRadius: "8px", fontSize: "14px", outline: "none",
  background: "#faf7f3", color: "#2c1a0e", fontFamily: "inherit", boxSizing: "border-box",
};
const labelStyle = {
  fontSize: "12px", fontWeight: 600, color: "#7a6655",
  textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: "6px", display: "block",
};
const btnPrimary = {
  background: ACCENT, color: "#fff", border: "none",
  padding: "10px 22px", borderRadius: "8px", fontWeight: 600,
  fontSize: "14px", cursor: "pointer",
};
const btnDanger = {
  background: "#fee2e2", color: "#b91c1c", border: "none",
  padding: "7px 14px", borderRadius: "6px", fontWeight: 600,
  fontSize: "13px", cursor: "pointer",
};

const BLANK_PLOT = {
  title: "", price: "", priceUnit: "Ankanam", badge: "DTCP Approved",
  type: "Open Plot", sizeRange: "", facing: "", location: "",
  city: "", image: "", images: [], description: "", features: "", approvals: "DTCP", category: "Open Plot",
};

export default function Admin() {
  const [password, setPassword] = useState(sessionStorage.getItem(PASSWORD_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState("hero");

  const [hero, setHero] = useState(null);
  const [heroSaving, setHeroSaving] = useState(false);
  const [heroMsg, setHeroMsg] = useState("");

  const [plots, setPlots] = useState([]);
  const [editingPlot, setEditingPlot] = useState(null);
  const [isNew, setIsNew] = useState(false);
  const [plotMsg, setPlotMsg] = useState("");
  const [seeding, setSeeding] = useState(false);
  const [seedMsg, setSeedMsg] = useState("");

  const login = async (e) => {
    e.preventDefault();
    if (password !== ADMIN_PASSWORD) { setAuthError("Wrong password."); return; }
    const snap = await getDoc(doc(db, "config", "hero"));
    setHero(snap.exists() ? snap.data() : {});
    sessionStorage.setItem(PASSWORD_KEY, password);
    setAuthed(true);
    loadPlots();
  };

  const loadPlots = async () => {
    const snap = await getDocs(collection(db, "properties"));
    setPlots(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  };

  const saveHero = async () => {
    setHeroSaving(true);
    await setDoc(doc(db, "config", "hero"), hero);
    setHeroSaving(false);
    setHeroMsg("Saved successfully!");
    setTimeout(() => setHeroMsg(""), 3000);
  };

  const savePlot = async () => {
    const imgs = Array.isArray(editingPlot.images) ? editingPlot.images.filter(Boolean) : [];
    const body = {
      ...editingPlot,
      price: parseInt(editingPlot.price),
      priceUnit: "Ankanam",
      sizeRange: editingPlot.sizeRange && !editingPlot.sizeRange.toLowerCase().includes("ankanam")
        ? `${editingPlot.sizeRange} Ankanam's`
        : editingPlot.sizeRange,
      features: typeof editingPlot.features === "string"
        ? editingPlot.features.split(",").map((f) => f.trim()).filter(Boolean)
        : editingPlot.features,
      images: imgs,
      // keep legacy `image` as first image for backwards compat
      image: imgs[0] || editingPlot.image || "",
    };
    delete body.id;

    if (isNew) {
      const docRef = await addDoc(collection(db, "properties"), body);
      setPlots((p) => [...p, { id: docRef.id, ...body }]);
    } else {
      await updateDoc(doc(db, "properties", editingPlot.id), body);
      setPlots((p) => p.map((x) => (x.id === editingPlot.id ? { id: editingPlot.id, ...body } : x)));
    }
    setEditingPlot(null);
    setPlotMsg(isNew ? "Plot added!" : "Plot updated!");
    setTimeout(() => setPlotMsg(""), 3000);
  };

  const deletePlot = async (id) => {
    if (!confirm("Delete this plot?")) return;
    await deleteDoc(doc(db, "properties", id));
    setPlots((p) => p.filter((x) => x.id !== id));
    setPlotMsg("Plot deleted.");
    setTimeout(() => setPlotMsg(""), 3000);
  };

  const handleSeed = async () => {
    setSeeding(true);
    setSeedMsg("");
    await seedData();
    await loadPlots();
    setSeeding(false);
    setSeedMsg("All data seeded successfully!");
    setTimeout(() => setSeedMsg(""), 5000);
  };

  if (!authed) return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f0eb" }}>
      <div style={{ background: "#fff", borderRadius: "16px", padding: "44px 40px", width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(122,92,46,0.12)", border: "1px solid #e8ddd3" }}>
        <div style={{ marginBottom: "28px" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "22px", color: "#2c1a0e" }}>Neev</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "22px", color: ACCENT }}> Estate</span>
          <p style={{ fontSize: "13px", color: "#7a6655", marginTop: "4px" }}>Admin Panel</p>
        </div>
        <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={labelStyle}>Admin Password</label>
            <input type="password" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} required />
            {authError && <p style={{ color: "#b91c1c", fontSize: "13px", marginTop: "6px" }}>{authError}</p>}
          </div>
          <button type="submit" style={{ ...btnPrimary, padding: "12px" }}>Sign In</button>
        </form>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#f5f0eb" }}>
      <div style={{ background: "#fff", borderBottom: "1px solid #e8ddd3", padding: "0 32px", height: "60px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "18px", color: "#2c1a0e" }}>Neev</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "18px", color: ACCENT }}> Estate</span>
          <span style={{ fontSize: "13px", color: "#7a6655", marginLeft: "10px" }}>/ Admin</span>
        </div>
        <button onClick={() => { sessionStorage.removeItem(PASSWORD_KEY); setAuthed(false); }} style={{ background: "none", border: "none", color: "#7a6655", fontSize: "14px", cursor: "pointer" }}>
          Sign out
        </button>
      </div>

      {/* Seed banner — shown until data exists */}
      <div style={{ background: "#fffbeb", borderBottom: "1px solid #fde68a", padding: "12px 32px", display: "flex", alignItems: "center", gap: "16px" }}>
        <p style={{ fontSize: "13px", color: "#92400e", flex: 1 }}>
          First time setup? Click "Seed Database" to load your 6 default properties into Firestore.
        </p>
        <button onClick={handleSeed} disabled={seeding} style={{ ...btnPrimary, background: "#d97706", fontSize: "13px", padding: "8px 18px" }}>
          {seeding ? "Seeding..." : "🌱 Seed Database"}
        </button>
        {seedMsg && <span style={{ fontSize: "13px", color: "#15803d", fontWeight: 600 }}>✓ {seedMsg}</span>}
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "36px 24px" }}>
        <div style={{ display: "flex", gap: "4px", marginBottom: "32px", borderBottom: "1px solid #e8ddd3" }}>
          {[{ id: "hero", label: "🖼 Hero Section" }, { id: "plots", label: "🗺 Plots Manager" }].map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              padding: "10px 22px", border: "none", cursor: "pointer", fontWeight: 600, fontSize: "14px", borderRadius: "8px 8px 0 0",
              background: tab === t.id ? "#fff" : "transparent",
              color: tab === t.id ? ACCENT : "#7a6655",
              borderBottom: tab === t.id ? `2px solid ${ACCENT}` : "2px solid transparent",
            }}>{t.label}</button>
          ))}
        </div>

        {/* HERO TAB */}
        {tab === "hero" && hero && (
          <div style={{ background: "#fff", borderRadius: "14px", padding: "32px", border: "1px solid #e8ddd3" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", marginBottom: "28px" }}>Hero Section</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Badge Text</label>
                <input style={inputStyle} value={hero.badge || ""} onChange={(e) => setHero({ ...hero, badge: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Headline (use \n for line breaks)</label>
                <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={hero.headline || ""} onChange={(e) => setHero({ ...hero, headline: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Subtext</label>
                <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={hero.subtext || ""} onChange={(e) => setHero({ ...hero, subtext: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Primary CTA</label>
                <input style={inputStyle} value={hero.cta1 || ""} onChange={(e) => setHero({ ...hero, cta1: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Secondary CTA</label>
                <input style={inputStyle} value={hero.cta2 || ""} onChange={(e) => setHero({ ...hero, cta2: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Background Image</label>
                <ImageUploader
                  currentUrl={hero.imageUrl}
                  onUpload={(url) => setHero({ ...hero, imageUrl: url })}
                  previewHeight="160px"
                />
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "28px" }}>
              <button onClick={saveHero} style={btnPrimary} disabled={heroSaving}>{heroSaving ? "Saving..." : "Save Changes"}</button>
              {heroMsg && <span style={{ fontSize: "14px", color: "#15803d", fontWeight: 500 }}>✓ {heroMsg}</span>}
            </div>
          </div>
        )}

        {/* PLOTS TAB */}
        {tab === "plots" && (
          <div>
            {editingPlot ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "32px", border: "1px solid #e8ddd3", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", marginBottom: "24px" }}>
                  {isNew ? "Add New Plot" : "Edit Plot"}
                </h2>
                <PlotForm plot={editingPlot} onChange={setEditingPlot} />
                <div style={{ display: "flex", gap: "12px", marginTop: "24px" }}>
                  <button onClick={savePlot} style={btnPrimary}>{isNew ? "Add Plot" : "Save Changes"}</button>
                  <button onClick={() => setEditingPlot(null)} style={{ ...btnPrimary, background: "#f1f5f9", color: "#4a3728" }}>Cancel</button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px" }}>All Plots ({plots.length})</h2>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {plotMsg && <span style={{ fontSize: "14px", color: "#15803d", fontWeight: 500 }}>✓ {plotMsg}</span>}
                  <button onClick={() => { setIsNew(true); setEditingPlot({ ...BLANK_PLOT }); }} style={btnPrimary}>+ Add Plot</button>
                </div>
              </div>
            )}

            {!editingPlot && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {plots.map((p) => (
                  <div key={p.id} style={{ background: "#fff", borderRadius: "12px", padding: "18px 20px", border: "1px solid #e8ddd3", display: "flex", alignItems: "center", gap: "16px" }}>
                    <img src={p.image} alt={p.title} style={{ width: "80px", height: "60px", objectFit: "cover", borderRadius: "8px", flexShrink: 0 }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: "15px", color: "#2c1a0e" }}>{p.title}</p>
                      <p style={{ fontSize: "13px", color: "#7a6655", marginTop: "2px" }}>{p.location}</p>
                      <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                        <span style={{ background: ACCENT_LIGHT, color: ACCENT, padding: "2px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600 }}>{p.badge}</span>
                        <span style={{ fontSize: "13px", color: ACCENT, fontWeight: 700 }}>₹{Number(p.price).toLocaleString("en-IN")} / {p.priceUnit}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                      <button onClick={() => { setIsNew(false); setEditingPlot({ ...p, features: Array.isArray(p.features) ? p.features.join(", ") : p.features, images: p.images || (p.image ? [p.image] : []) }); }} style={{ ...btnPrimary, padding: "7px 16px" }}>Edit</button>
                      <button onClick={() => deletePlot(p.id)} style={btnDanger}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Image Uploader with Cloudinary ──
function ImageUploader({ currentUrl, onUpload, previewHeight = "140px" }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const url = await uploadToCloudinary(file, setProgress);
      onUpload(url);
    } catch (err) {
      setError(err.message || "Upload failed. Try again.");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
        <input
          type="url"
          placeholder="Paste image URL or upload a file"
          value={currentUrl || ""}
          onChange={(e) => onUpload(e.target.value)}
          style={{ ...inputStyle, flex: 1 }}
        />
        <button type="button" onClick={() => fileRef.current.click()}
          style={{ ...inputStyle, width: "auto", whiteSpace: "nowrap", cursor: "pointer", background: ACCENT_LIGHT, color: ACCENT, fontWeight: 600 }}>
          📁 Upload
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
      </div>
      {uploading && (
        <div style={{ marginTop: "8px" }}>
          <div style={{ height: "4px", background: "#e8ddd3", borderRadius: "2px" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: ACCENT, borderRadius: "2px", transition: "width 0.2s" }} />
          </div>
          <p style={{ fontSize: "12px", color: "#7a6655", marginTop: "4px" }}>Uploading... {progress}%</p>
        </div>
      )}
      {error && <p style={{ fontSize: "12px", color: "#b91c1c", marginTop: "4px" }}>{error}</p>}
      {currentUrl && !uploading && (
        <img src={currentUrl} alt="preview" style={{ marginTop: "10px", width: "100%", height: previewHeight, objectFit: "cover", borderRadius: "8px" }} />
      )}
    </div>
  );
}

// ── Multi-Image Uploader ──
function MultiImageUploader({ images = [], onChange }) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const fileRef = useRef();

  const handleFiles = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    setUploading(true);
    setError("");
    try {
      const urls = [];
      for (let i = 0; i < files.length; i++) {
        const url = await uploadToCloudinary(files[i], (p) =>
          setProgress(Math.round(((i + p / 100) / files.length) * 100))
        );
        urls.push(url);
      }
      onChange([...images, ...urls]);
    } catch (err) {
      setError(err.message || "Upload failed. Try again.");
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = "";
    }
  };

  const remove = (idx) => onChange(images.filter((_, i) => i !== idx));
  const moveUp = (idx) => {
    if (idx === 0) return;
    const arr = [...images];
    [arr[idx - 1], arr[idx]] = [arr[idx], arr[idx - 1]];
    onChange(arr);
  };

  return (
    <div>
      {/* Thumbnail grid */}
      {images.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "10px", marginBottom: "12px" }}>
          {images.map((url, i) => (
            <div key={i} style={{ position: "relative", width: "120px", borderRadius: "8px", overflow: "hidden", border: i === 0 ? `2px solid ${ACCENT}` : "2px solid #e8ddd3" }}>
              <img src={url} alt={`img-${i}`} style={{ width: "100%", height: "80px", objectFit: "cover", display: "block" }} />
              {i === 0 && (
                <span style={{ position: "absolute", top: "4px", left: "4px", background: ACCENT, color: "#fff", fontSize: "10px", fontWeight: 700, padding: "2px 6px", borderRadius: "4px" }}>
                  COVER
                </span>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 6px", background: "#faf7f3" }}>
                {i > 0 ? (
                  <button type="button" onClick={() => moveUp(i)} title="Set as cover"
                    style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: ACCENT }}>⬆</button>
                ) : <span />}
                <button type="button" onClick={() => remove(i)} title="Remove"
                  style={{ background: "none", border: "none", cursor: "pointer", fontSize: "13px", color: "#b91c1c" }}>✕</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      <button type="button" onClick={() => fileRef.current.click()}
        style={{ ...inputStyle, width: "auto", whiteSpace: "nowrap", cursor: "pointer", background: ACCENT_LIGHT, color: ACCENT, fontWeight: 600, display: "inline-block" }}>
        📁 Add Images {images.length > 0 ? `(${images.length} added)` : ""}
      </button>
      <input ref={fileRef} type="file" accept="image/*" multiple onChange={handleFiles} style={{ display: "none" }} />

      {uploading && (
        <div style={{ marginTop: "8px" }}>
          <div style={{ height: "4px", background: "#e8ddd3", borderRadius: "2px" }}>
            <div style={{ height: "100%", width: `${progress}%`, background: ACCENT, borderRadius: "2px", transition: "width 0.2s" }} />
          </div>
          <p style={{ fontSize: "12px", color: "#7a6655", marginTop: "4px" }}>Uploading... {progress}%</p>
        </div>
      )}
      {error && <p style={{ fontSize: "12px", color: "#b91c1c", marginTop: "4px" }}>{error}</p>}
      {images.length > 0 && <p style={{ fontSize: "11px", color: "#7a6655", marginTop: "6px" }}>First image is the cover. Use ⬆ to reorder.</p>}
    </div>
  );
}
function PlotForm({ plot, onChange }) {
  const set = (k) => (e) => onChange((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div>
        <label style={labelStyle}>Title</label>
        <input style={inputStyle} value={plot.title} onChange={set("title")} placeholder="Neev Greens Phase I" />
      </div>
      <div>
        <label style={labelStyle}>Price (₹ per Ankanam)</label>
        <input style={inputStyle} type="number" value={plot.price} onChange={set("price")} placeholder="24999" />
      </div>
      <div>
        <label style={labelStyle}>Badge</label>
        <select style={inputStyle} value={plot.badge} onChange={set("badge")}>
          {["DTCP Approved", "RERA Registered", "NUDA Approved", "Gated Community", "Farm Land"].map((b) => <option key={b}>{b}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Category</label>
        <select style={inputStyle} value={plot.category} onChange={set("category")}>
          {["Open Plot", "Gated Community", "Farm Land"].map((c) => <option key={c}>{c}</option>)}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Size Range (Ankanam's)</label>
        <input style={inputStyle} value={plot.sizeRange} onChange={set("sizeRange")} placeholder="200 – 500 Ankanam's" />
      </div>
      <div>
        <label style={labelStyle}>Facing</label>
        <input style={inputStyle} value={plot.facing} onChange={set("facing")} placeholder="East & North" />
      </div>
      <div>
        <label style={labelStyle}>City</label>
        <input style={inputStyle} value={plot.city} onChange={set("city")} placeholder="Guntur" />
      </div>
      <div>
        <label style={labelStyle}>Approvals</label>
        <input style={inputStyle} value={plot.approvals} onChange={set("approvals")} placeholder="DTCP" />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelStyle}>Location</label>
        <input style={inputStyle} value={plot.location} onChange={set("location")} placeholder="Amaravati Capital Region, Guntur Dist., AP" />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelStyle}>Plot Images</label>
        <MultiImageUploader
          images={plot.images || (plot.image ? [plot.image] : [])}
          onChange={(imgs) => onChange((p) => ({ ...p, images: imgs }))}
        />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelStyle}>Description</label>
        <textarea rows={3} style={{ ...inputStyle, resize: "vertical" }} value={plot.description} onChange={set("description")} />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label style={labelStyle}>Features (comma separated)</label>
        <input style={inputStyle} value={plot.features} onChange={set("features")} placeholder="DTCP Approved, Gated Layout, BT Roads" />
      </div>
    </div>
  );
}
