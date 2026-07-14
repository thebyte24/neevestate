import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ACCENT = "#7a5c2e";
const ACCENT_LIGHT = "#f0e8df";

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [lightbox, setLightbox] = useState(false);
  const [touchStart, setTouchStart] = useState(null);

  if (!images || images.length === 0) return null;

  // normalise to objects
  const items = images.map(v => typeof v === "string" ? { url: v, type: "image" } : v);

  const prev = (e) => { e?.stopPropagation(); setCurrent((c) => (c - 1 + items.length) % items.length); };
  const next = (e) => { e?.stopPropagation(); setCurrent((c) => (c + 1) % items.length); };

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  const handleKey = (e) => {
    if (e.key === "ArrowRight") next();
    else if (e.key === "ArrowLeft") prev();
    else if (e.key === "Escape") setLightbox(false);
  };

  const btnBase = {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%",
    width: "38px", height: "38px", fontSize: "18px", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)", zIndex: 2, color: "#2c1a0e",
  };

  const curItem = items[current];

  return (
    <>
      {/* Carousel */}
      <div className="detail-img" style={{ position: "relative", cursor: curItem.type === "image" ? "zoom-in" : "default", background: "#000" }}
        onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        {curItem.type === "video"
          ? <video src={curItem.url} controls style={{ width: "100%", height: "100%", objectFit: "contain" }} />
          : <img src={curItem.url} alt={`plot-${current + 1}`} onClick={() => setLightbox(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.25s" }} />
        }
        {items.length > 1 && <>
          <button style={{ ...btnBase, left: "12px" }} onClick={prev}>‹</button>
          <button style={{ ...btnBase, right: "12px" }} onClick={next}>›</button>
          <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px" }}>
            {items.map((item, i) => (
              <button key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }} style={{
                width: i === current ? "20px" : "8px", height: "8px",
                borderRadius: "4px", border: "none", cursor: "pointer",
                background: i === current ? ACCENT : "rgba(255,255,255,0.7)",
                transition: "all 0.2s", padding: 0,
              }}>
                {item.type === "video" && i === current && null}
              </button>
            ))}
          </div>
        </>}
        <span style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "12px", padding: "3px 10px", borderRadius: "12px" }}>
          {items.length > 1 ? `${current + 1} / ${items.length}` : curItem.type === "image" ? "Click to expand" : ""}
        </span>
        {curItem.type === "video" && <span style={{ position: "absolute", top: "12px", left: "12px", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "11px", padding: "3px 10px", borderRadius: "12px" }}>▶ Video</span>}
      </div>

      {/* Lightbox — only for images */}
      {lightbox && curItem.type === "image" && (
        <div
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center" }}
          onClick={() => setLightbox(false)}
          onKeyDown={handleKey}
          tabIndex={0}
          ref={(el) => el?.focus()}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          {/* Close */}
          <button onClick={() => setLightbox(false)} style={{ position: "absolute", top: "16px", right: "20px", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "24px", cursor: "pointer", borderRadius: "50%", width: "44px", height: "44px", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>✕</button>

          {/* Counter */}
          {images.length > 1 && (
            <span style={{ position: "absolute", top: "20px", left: "50%", transform: "translateX(-50%)", color: "#fff", fontSize: "14px", background: "rgba(255,255,255,0.15)", padding: "4px 14px", borderRadius: "20px" }}>
              {current + 1} / {items.length}
            </span>
          )}

          {/* Image in lightbox */}
          <img
            src={curItem.url} alt={`plot-${current + 1}`}
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "92vw", maxHeight: "88vh", objectFit: "contain", borderRadius: "8px", boxShadow: "0 8px 40px rgba(0,0,0,0.6)" }}
          />

          {/* Prev / Next */}
          {items.length > 1 && <>
            <button onClick={prev} style={{ position: "absolute", left: "16px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "32px", cursor: "pointer", borderRadius: "50%", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center" }}>‹</button>
            <button onClick={next} style={{ position: "absolute", right: "16px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", fontSize: "32px", cursor: "pointer", borderRadius: "50%", width: "52px", height: "52px", display: "flex", alignItems: "center", justifyContent: "center" }}>›</button>
          </>}

          {/* Thumbnail strip */}
          {items.length > 1 && (
            <div style={{ position: "absolute", bottom: "20px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", maxWidth: "90vw", overflowX: "auto", padding: "4px" }}>
              {items.map((item, i) => (
                <div key={i} onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                  style={{ width: "60px", height: "44px", borderRadius: "6px", cursor: "pointer", flexShrink: 0, border: i === current ? `2px solid ${ACCENT}` : "2px solid rgba(255,255,255,0.3)", opacity: i === current ? 1 : 0.6, overflow: "hidden", position: "relative", background: "#000" }}>
                  {item.type === "video"
                    ? <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "18px" }}>▶</div>
                    : <img src={item.url} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  }
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default function PropertyDetail() {
  const { id } = useParams();
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    getDoc(doc(db, "properties", id))
      .then((snap) => {
        if (snap.exists()) setPlot({ id: snap.id, ...snap.data() });
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const handleEnquiry = (e) => {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name}. I'm interested in "${title}". ${form.message || ""} My phone: ${form.phone}`;
    window.open(`https://wa.me/919347102038?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
  };

  if (loading) return <div style={{ textAlign: "center", padding: "120px", color: "#7a6655", fontSize: "16px" }}>Loading...</div>;
  if (!plot) return (
    <div style={{ textAlign: "center", padding: "120px" }}>
      <p style={{ color: "#7a6655", marginBottom: "16px", fontSize: "18px" }}>Plot not found.</p>
      <button onClick={() => window.history.back()} style={{ background: ACCENT, color: "#fff", border: "none", padding: "12px 24px", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>← Go Back</button>
    </div>
  );

  const { title, price, priceUnit, badge, sizeRange, facing, location, image, images, description, features, approvals, category } = plot;
  const allImages = (images && images.length > 0) ? images : (image ? [{ url: image, type: "image" }] : []);

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      <style>{`
        .detail-grid { display: grid; grid-template-columns: 1fr 360px; gap: 48px; align-items: start; }
        .detail-img { border-radius: 20px; overflow: hidden; height: 480px; margin-bottom: 40px; }
        @media (max-width: 960px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .detail-img { height: 260px !important; }
          .enquiry-card { position: static !important; }
        }
      `}</style>

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "32px 24px" }}>
        <button onClick={() => window.history.back()} style={{ background: "none", border: "1px solid #e8ddd3", color: "#5a4a3a", fontWeight: 500, fontSize: "14px", cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "6px", marginBottom: "28px", padding: "8px 16px", borderRadius: "8px" }}>
          ← Back
        </button>

        <ImageCarousel images={allImages} />

        <div className="detail-grid">
        {/* Left */}
        <div>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
            <span style={{ background: "#fff", border: "1px solid #c8bdb4", color: "#4a3728", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 500 }}>{badge}</span>
            <span style={{ background: ACCENT_LIGHT, color: ACCENT, padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 500 }}>{category}</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>{title}</h1>
          <p style={{ color: "#7a6655", marginBottom: "16px" }}>📍 {location}</p>
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: ACCENT, marginBottom: "28px" }}>
            ₹{Number(price).toLocaleString("en-IN")} / {priceUnit}
          </p>

          <div style={{ display: "flex", gap: "24px", padding: "24px", background: "#f7f3ee", borderRadius: "14px", marginBottom: "32px", border: "1px solid #ede5db", flexWrap: "wrap" }}>
            {[{ label: "Plot Size", value: sizeRange }, { label: "Facing", value: facing }, { label: "Approval", value: approvals }, { label: "Type", value: category }].map((d) => (
              <div key={d.label}>
                <p style={{ fontSize: "11px", color: "#9a8070", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600 }}>{d.label}</p>
                <p style={{ fontWeight: 700, fontSize: "15px", color: "#1a1208" }}>{d.value}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px", fontWeight: 700, marginBottom: "12px" }}>About this plot</h2>
          <p style={{ color: "#5a4a3a", lineHeight: 1.8, fontSize: "15px", marginBottom: "28px" }}>{description}</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px", fontWeight: 700, marginBottom: "14px" }}>Features & Amenities</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {(features || []).map((f) => (
              <span key={f} style={{ background: ACCENT_LIGHT, color: ACCENT, padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 500 }}>
                ✓ {f}
              </span>
            ))}
          </div>
        </div>

        {/* Enquiry */}
        <div className="enquiry-card" style={{ background: "#fff", borderRadius: "20px", padding: "32px", border: "1px solid #ede5db", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", position: "sticky", top: "88px" }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>Enquire about this plot</h3>
          <p style={{ fontSize: "13px", color: "#7a6655", marginBottom: "22px" }}>Fill your details to chat on WhatsApp.</p>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: "44px", marginBottom: "12px" }}>✅</div>
              <p style={{ fontWeight: 600, marginBottom: "6px" }}>Redirected to WhatsApp!</p>
              <p style={{ color: "#7a6655", fontSize: "14px" }}>Continue your chat about {title}.</p>
            </div>
          ) : (
            <form onSubmit={handleEnquiry} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[{ key: "name", placeholder: "Your name", type: "text" }, { key: "phone", placeholder: "Phone number", type: "tel" }].map((f) => (
                <input key={f.key} type={f.type} placeholder={f.placeholder} required value={form[f.key]} onChange={set(f.key)}
                  style={{ padding: "11px 14px", border: "1px solid #ddd6ce", borderRadius: "8px", fontSize: "14px", outline: "none", background: "#faf7f3", color: "#2c1a0e" }}
                />
              ))}
              <textarea placeholder={`I'm interested in ${title}...`} rows={3} value={form.message} onChange={set("message")}
                style={{ padding: "11px 14px", border: "1px solid #ddd6ce", borderRadius: "8px", fontSize: "14px", resize: "vertical", outline: "none", background: "#faf7f3", color: "#2c1a0e", fontFamily: "inherit" }}
              />
              <button type="submit" style={{ background: "#25d366", color: "#fff", padding: "13px", borderRadius: "8px", border: "none", fontWeight: 700, fontSize: "15px", marginTop: "4px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.505L4 29l7.697-1.812A12.94 12.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm-3.293 5.5c-.2 0-.524.075-.8.375-.276.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.1 3.225 5.125 4.4.715.275 1.275.44 1.71.565.718.2 1.373.173 1.89.105.576-.075 1.775-.726 2.025-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35-.3-.15-1.775-.876-2.05-.975-.275-.1-.475-.15-.675.15-.2.3-.776.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.41-1.487-.89-.794-1.492-1.774-1.667-2.074-.175-.3-.019-.463.131-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.225-.243-.583-.49-.504-.675-.513l-.575-.01z" /></svg>
                Send via WhatsApp
              </button>
              <a href="tel:+919347102038" style={{ fontSize: "13px", color: ACCENT, fontWeight: 500, textAlign: "center", paddingTop: "4px" }}>
                📞 +91 93471 02038
              </a>
            </form>
          )}
        </div>
        </div>
      </div>
    </div>
  );
}
