import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

const ACCENT = "#7a5c2e";
const ACCENT_LIGHT = "#f0e8df";

function ImageCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [touchStart, setTouchStart] = useState(null);

  if (!images || images.length === 0) return null;
  if (images.length === 1) {
    return (
      <div className="detail-img">
        <img src={images[0]} alt="plot" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  const btnBase = {
    position: "absolute", top: "50%", transform: "translateY(-50%)",
    background: "rgba(255,255,255,0.85)", border: "none", borderRadius: "50%",
    width: "38px", height: "38px", fontSize: "18px", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.18)", zIndex: 2, color: "#2c1a0e",
  };

  return (
    <div className="detail-img" style={{ position: "relative" }}
      onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img src={images[current]} alt={`plot-${current + 1}`}
        style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.25s" }} />
      <button style={{ ...btnBase, left: "12px" }} onClick={prev}>‹</button>
      <button style={{ ...btnBase, right: "12px" }} onClick={next}>›</button>
      {/* Dots */}
      <div style={{ position: "absolute", bottom: "12px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "6px" }}>
        {images.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{
            width: i === current ? "20px" : "8px", height: "8px",
            borderRadius: "4px", border: "none", cursor: "pointer",
            background: i === current ? ACCENT : "rgba(255,255,255,0.7)",
            transition: "all 0.2s", padding: 0,
          }} />
        ))}
      </div>
      <span style={{ position: "absolute", top: "12px", right: "12px", background: "rgba(0,0,0,0.5)", color: "#fff", fontSize: "12px", padding: "3px 10px", borderRadius: "12px" }}>
        {current + 1} / {images.length}
      </span>
    </div>
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

  if (loading) return <div style={{ textAlign: "center", padding: "80px", color: "#7a6655" }}>Loading...</div>;
  if (!plot) return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <p style={{ color: "#7a6655", marginBottom: "16px" }}>Plot not found.</p>
      <Link to="/plots" style={{ color: ACCENT }}>← Back to plots</Link>
    </div>
  );

  const { title, price, priceUnit, badge, sizeRange, facing, location, image, images, description, features, approvals, category } = plot;
  const allImages = (images && images.length > 0) ? images : (image ? [image] : []);

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "28px 16px" }}>
      <style>{`
        .detail-grid { display: grid; grid-template-columns: 1fr 340px; gap: 40px; align-items: start; }
        .detail-img { border-radius: 16px; overflow: hidden; height: 440px; margin-bottom: 36px; }
        @media (max-width: 900px) {
          .detail-grid { grid-template-columns: 1fr !important; }
          .detail-img { height: 240px !important; }
          .enquiry-card { position: static !important; }
        }
      `}</style>
      <Link to="/plots" style={{ color: ACCENT, fontWeight: 500, fontSize: "14px", display: "inline-block", marginBottom: "24px" }}>
        ← Back to plots
      </Link>

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

          <div style={{ display: "flex", gap: "32px", padding: "20px", background: "#faf7f3", borderRadius: "12px", marginBottom: "28px", border: "1px solid #e8ddd3", flexWrap: "wrap" }}>
            {[{ label: "Plot Size", value: sizeRange }, { label: "Facing", value: facing }, { label: "Approval", value: approvals }, { label: "Type", value: category }].map((d) => (
              <div key={d.label}>
                <p style={{ fontSize: "12px", color: "#7a6655", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{d.label}</p>
                <p style={{ fontWeight: 600, fontSize: "15px", color: "#2c1a0e" }}>{d.value}</p>
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
        <div className="enquiry-card" style={{ background: "#fff", borderRadius: "16px", padding: "28px", border: "1px solid #e8ddd3", boxShadow: "0 4px 20px rgba(122,92,46,0.08)", position: "sticky", top: "80px" }}>
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
  );
}
