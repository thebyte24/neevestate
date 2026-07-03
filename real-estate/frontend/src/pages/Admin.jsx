import { useEffect, useState } from "react";

const ACCENT = "#7a5c2e";
const ACCENT_LIGHT = "#f0e8df";
const PASSWORD_KEY = "neev_admin_pw";

const inputStyle = {
  width: "100%", padding: "10px 13px", border: "1px solid #ddd6ce",
  borderRadius: "8px", fontSize: "14px", outline: "none",
  background: "#faf7f3", color: "#2c1a0e", fontFamily: "inherit",
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
  title: "", price: "", priceUnit: "sq.yd", badge: "DTCP Approved",
  type: "Open Plot", sizeRange: "", facing: "", location: "",
  city: "", image: "", description: "",
  features: "", approvals: "DTCP", category: "Open Plot",
};

export default function Admin() {
  const [password, setPassword] = useState(sessionStorage.getItem(PASSWORD_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");
  const [tab, setTab] = useState("hero");

  // Hero state
  const [hero, setHero] = useState(null);
  const [heroSaving, setHeroSaving] = useState(false);
  const [heroMsg, setHeroMsg] = useState("");

  // Plots state
  const [plots, setPlots] = useState([]);
  const [editingPlot, setEditingPlot] = useState(null); // null | plot object
  const [isNew, setIsNew] = useState(false);
  const [plotMsg, setPlotMsg] = useState("");

  const headers = { "Content-Type": "application/json", "x-admin-password": password };

  const login = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/admin/hero", { headers });
    if (res.status === 401) { setAuthError("Wrong password."); return; }
    const data = await res.json();
    setHero(data);
    sessionStorage.setItem(PASSWORD_KEY, password);
    setAuthed(true);
    loadPlots();
  };

  const loadPlots = async () => {
    const res = await fetch("/api/admin/plots", { headers });
    setPlots(await res.json());
  };

  const saveHero = async () => {
    setHeroSaving(true);
    await fetch("/api/admin/hero", { method: "PUT", headers, body: JSON.stringify(hero) });
    setHeroSaving(false);
    setHeroMsg("Saved successfully!");
    setTimeout(() => setHeroMsg(""), 3000);
  };

  const savePlot = async () => {
    const body = {
      ...editingPlot,
      price: parseInt(editingPlot.price),
      features: typeof editingPlot.features === "string"
        ? editingPlot.features.split(",").map((f) => f.trim()).filter(Boolean)
        : editingPlot.features,
    };
    if (isNew) {
      const res = await fetch("/api/admin/plots", { method: "POST", headers, body: JSON.stringify(body) });
      const created = await res.json();
      setPlots((p) => [...p, created]);
    } else {
      const res = await fetch(`/api/admin/plots/${editingPlot.id}`, { method: "PUT", headers, body: JSON.stringify(body) });
      const updated = await res.json();
      setPlots((p) => p.map((x) => (x.id === updated.id ? updated : x)));
    }
    setEditingPlot(null);
    setPlotMsg(isNew ? "Plot added!" : "Plot updated!");
    setTimeout(() => setPlotMsg(""), 3000);
  };

  const deletePlot = async (id) => {
    if (!confirm("Delete this plot?")) return;
    await fetch(`/api/admin/plots/${id}`, { method: "DELETE", headers });
    setPlots((p) => p.filter((x) => x.id !== id));
    setPlotMsg("Plot deleted.");
    setTimeout(() => setPlotMsg(""), 3000);
  };

  // ── Login screen ──
  if (!authed) return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center",
      justifyContent: "center", background: "#f5f0eb",
    }}>
      <div style={{
        background: "#fff", borderRadius: "16px", padding: "44px 40px",
        width: "100%", maxWidth: "400px", boxShadow: "0 8px 32px rgba(122,92,46,0.12)",
        border: "1px solid #e8ddd3",
      }}>
        <div style={{ marginBottom: "28px" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "22px", color: "#2c1a0e" }}>Neev</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "22px", color: ACCENT }}> Estate</span>
          <p style={{ fontSize: "13px", color: "#7a6655", marginTop: "4px" }}>Admin Panel</p>
        </div>
        <form onSubmit={login} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
          <div>
            <label style={labelStyle}>Admin Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
            {authError && <p style={{ color: "#b91c1c", fontSize: "13px", marginTop: "6px" }}>{authError}</p>}
          </div>
          <button type="submit" style={{ ...btnPrimary, padding: "12px" }}>Sign In</button>
        </form>
        <p style={{ fontSize: "12px", color: "#a08c78", marginTop: "16px", textAlign: "center" }}>
          Default password: <code>neev@admin123</code>
        </p>
      </div>
    </div>
  );

  // ── Admin Dashboard ──
  return (
    <div style={{ minHeight: "100vh", background: "#f5f0eb" }}>
      {/* Admin Navbar */}
      <div style={{
        background: "#fff", borderBottom: "1px solid #e8ddd3",
        padding: "0 32px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <div>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "18px", color: "#2c1a0e" }}>Neev</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "18px", color: ACCENT }}> Estate</span>
          <span style={{ fontSize: "13px", color: "#7a6655", marginLeft: "10px" }}>/ Admin</span>
        </div>
        <button
          onClick={() => { sessionStorage.removeItem(PASSWORD_KEY); setAuthed(false); }}
          style={{ background: "none", border: "none", color: "#7a6655", fontSize: "14px", cursor: "pointer" }}
        >
          Sign out
        </button>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "36px 24px" }}>
        {/* Tabs */}
        <div style={{ display: "flex", gap: "4px", marginBottom: "32px", borderBottom: "1px solid #e8ddd3", paddingBottom: "0" }}>
          {[{ id: "hero", label: "🖼 Hero Section" }, { id: "plots", label: "🗺 Plots Manager" }].map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                padding: "10px 22px", border: "none", cursor: "pointer",
                fontWeight: 600, fontSize: "14px", borderRadius: "8px 8px 0 0",
                background: tab === t.id ? "#fff" : "transparent",
                color: tab === t.id ? ACCENT : "#7a6655",
                borderBottom: tab === t.id ? `2px solid ${ACCENT}` : "2px solid transparent",
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* ── HERO TAB ── */}
        {tab === "hero" && hero && (
          <div style={{ background: "#fff", borderRadius: "14px", padding: "32px", border: "1px solid #e8ddd3" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", marginBottom: "28px" }}>Hero Section</h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Badge Text</label>
                <input style={inputStyle} value={hero.badge} onChange={(e) => setHero({ ...hero, badge: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Headline (use \n for line breaks)</label>
                <textarea
                  rows={3} style={{ ...inputStyle, resize: "vertical" }}
                  value={hero.headline}
                  onChange={(e) => setHero({ ...hero, headline: e.target.value })}
                />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Subtext</label>
                <textarea
                  rows={3} style={{ ...inputStyle, resize: "vertical" }}
                  value={hero.subtext}
                  onChange={(e) => setHero({ ...hero, subtext: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Primary CTA Label</label>
                <input style={inputStyle} value={hero.cta1} onChange={(e) => setHero({ ...hero, cta1: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Secondary CTA Label</label>
                <input style={inputStyle} value={hero.cta2} onChange={(e) => setHero({ ...hero, cta2: e.target.value })} />
              </div>
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={labelStyle}>Background Image URL</label>
                <input style={inputStyle} value={hero.imageUrl} onChange={(e) => setHero({ ...hero, imageUrl: e.target.value })} />
                {hero.imageUrl && (
                  <img src={hero.imageUrl} alt="preview" style={{
                    marginTop: "10px", width: "100%", height: "160px",
                    objectFit: "cover", borderRadius: "8px",
                  }} />
                )}
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "28px" }}>
              <button onClick={saveHero} style={btnPrimary} disabled={heroSaving}>
                {heroSaving ? "Saving..." : "Save Changes"}
              </button>
              {heroMsg && <span style={{ fontSize: "14px", color: "#15803d", fontWeight: 500 }}>✓ {heroMsg}</span>}
            </div>
          </div>
        )}

        {/* ── PLOTS TAB ── */}
        {tab === "plots" && (
          <div>
            {/* Plot form (add/edit) */}
            {editingPlot ? (
              <div style={{ background: "#fff", borderRadius: "14px", padding: "32px", border: "1px solid #e8ddd3", marginBottom: "24px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px", marginBottom: "24px" }}>
                  {isNew ? "Add New Plot" : "Edit Plot"}
                </h2>
                <PlotForm plot={editingPlot} onChange={setEditingPlot} />
                <div style={{ display: "flex", gap: "12px", marginTop: "24px", alignItems: "center" }}>
                  <button onClick={savePlot} style={btnPrimary}>
                    {isNew ? "Add Plot" : "Save Changes"}
                  </button>
                  <button
                    onClick={() => setEditingPlot(null)}
                    style={{ ...btnPrimary, background: "#f1f5f9", color: "#4a3728" }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "20px" }}>
                  All Plots ({plots.length})
                </h2>
                <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                  {plotMsg && <span style={{ fontSize: "14px", color: "#15803d", fontWeight: 500 }}>✓ {plotMsg}</span>}
                  <button
                    onClick={() => { setIsNew(true); setEditingPlot({ ...BLANK_PLOT }); }}
                    style={btnPrimary}
                  >
                    + Add Plot
                  </button>
                </div>
              </div>
            )}

            {/* Plots list */}
            {!editingPlot && (
              <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
                {plots.map((p) => (
                  <div key={p.id} style={{
                    background: "#fff", borderRadius: "12px", padding: "18px 20px",
                    border: "1px solid #e8ddd3", display: "flex", alignItems: "center", gap: "16px",
                  }}>
                    <img src={p.image} alt={p.title} style={{
                      width: "80px", height: "60px", objectFit: "cover",
                      borderRadius: "8px", flexShrink: 0,
                    }} />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 600, fontSize: "15px", color: "#2c1a0e" }}>{p.title}</p>
                      <p style={{ fontSize: "13px", color: "#7a6655", marginTop: "2px" }}>{p.location}</p>
                      <div style={{ display: "flex", gap: "10px", marginTop: "6px" }}>
                        <span style={{
                          background: ACCENT_LIGHT, color: ACCENT,
                          padding: "2px 10px", borderRadius: "12px", fontSize: "11px", fontWeight: 600,
                        }}>{p.badge}</span>
                        <span style={{ fontSize: "13px", color: ACCENT, fontWeight: 700 }}>
                          ₹{Number(p.price).toLocaleString("en-IN")} / {p.priceUnit}
                        </span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
                      <button
                        onClick={() => { setIsNew(false); setEditingPlot({ ...p, features: Array.isArray(p.features) ? p.features.join(", ") : p.features }); }}
                        style={{ ...btnPrimary, padding: "7px 16px" }}
                      >
                        Edit
                      </button>
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

function PlotForm({ plot, onChange }) {
  const set = (k) => (e) => onChange((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
      <div>
        <label style={labelStyle}>Title</label>
        <input style={inputStyle} value={plot.title} onChange={set("title")} placeholder="Neev Greens Phase I" />
      </div>
      <div>
        <label style={labelStyle}>Price (₹ per sq.yd)</label>
        <input style={inputStyle} type="number" value={plot.price} onChange={set("price")} placeholder="24999" />
      </div>
      <div>
        <label style={labelStyle}>Badge</label>
        <select style={inputStyle} value={plot.badge} onChange={set("badge")}>
          {["DTCP Approved", "RERA Registered", "Gated Community", "Farm Land"].map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Category</label>
        <select style={inputStyle} value={plot.category} onChange={set("category")}>
          {["Open Plot", "Gated Community", "Farm Land"].map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
      </div>
      <div>
        <label style={labelStyle}>Size Range</label>
        <input style={inputStyle} value={plot.sizeRange} onChange={set("sizeRange")} placeholder="200 – 500 sq.yd" />
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
        <label style={labelStyle}>Image URL</label>
        <input style={inputStyle} value={plot.image} onChange={set("image")} placeholder="https://..." />
        {plot.image && (
          <img src={plot.image} alt="preview" style={{
            marginTop: "8px", width: "100%", height: "140px",
            objectFit: "cover", borderRadius: "8px",
          }} />
        )}
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
