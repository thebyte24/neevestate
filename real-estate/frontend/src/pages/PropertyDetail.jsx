import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const ACCENT = "#7a5c2e";
const ACCENT_LIGHT = "#f0e8df";

export default function PropertyDetail() {
  const { id } = useParams();
  const [plot, setPlot] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", message: "" });

  useEffect(() => {
    fetch(`/api/properties/${id}`)
      .then((r) => r.json())
      .then((data) => { setPlot(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [id]);

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  if (loading) return <div style={{ textAlign: "center", padding: "80px", color: "#7a6655" }}>Loading...</div>;
  if (!plot) return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <p style={{ color: "#7a6655", marginBottom: "16px" }}>Plot not found.</p>
      <Link to="/plots" style={{ color: ACCENT }}>← Back to plots</Link>
    </div>
  );

  const { title, price, priceUnit, badge, sizeRange, facing, location, image, description, features, approvals, category } = plot;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "36px 32px" }}>
      <Link to="/plots" style={{ color: ACCENT, fontWeight: 500, fontSize: "14px", display: "inline-block", marginBottom: "24px" }}>
        ← Back to plots
      </Link>

      {/* Image */}
      <div style={{ borderRadius: "16px", overflow: "hidden", height: "440px", marginBottom: "36px" }}>
        <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "40px", alignItems: "start" }}>
        {/* Left */}
        <div>
          {/* Badges */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "14px" }}>
            <span style={{
              background: "#fff", border: "1px solid #c8bdb4", color: "#4a3728",
              padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 500,
            }}>{badge}</span>
            <span style={{
              background: ACCENT_LIGHT, color: ACCENT,
              padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: 500,
            }}>{category}</span>
          </div>

          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 800, marginBottom: "8px" }}>
            {title}
          </h1>
          <p style={{ color: "#7a6655", marginBottom: "16px" }}>📍 {location}</p>

          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: ACCENT, marginBottom: "28px" }}>
            ₹{price.toLocaleString("en-IN")} / {priceUnit}
          </p>

          {/* Plot details */}
          <div style={{
            display: "flex", gap: "32px", padding: "20px",
            background: "#faf7f3", borderRadius: "12px", marginBottom: "28px",
            border: "1px solid #e8ddd3", flexWrap: "wrap",
          }}>
            {[
              { label: "Plot Size", value: sizeRange },
              { label: "Facing", value: facing },
              { label: "Approval", value: approvals },
              { label: "Type", value: category },
            ].map((d) => (
              <div key={d.label}>
                <p style={{ fontSize: "12px", color: "#7a6655", marginBottom: "4px", textTransform: "uppercase", letterSpacing: "0.5px" }}>{d.label}</p>
                <p style={{ fontWeight: 600, fontSize: "15px", color: "#2c1a0e" }}>{d.value}</p>
              </div>
            ))}
          </div>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px", fontWeight: 700, marginBottom: "12px" }}>
            About this plot
          </h2>
          <p style={{ color: "#5a4a3a", lineHeight: 1.8, fontSize: "15px", marginBottom: "28px" }}>{description}</p>

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "19px", fontWeight: 700, marginBottom: "14px" }}>
            Features & Amenities
          </h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {features.map((f) => (
              <span key={f} style={{
                background: ACCENT_LIGHT, color: ACCENT,
                padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: 500,
              }}>
                ✓ {f}
              </span>
            ))}
          </div>
        </div>

        {/* Enquiry form */}
        <div style={{
          background: "#fff", borderRadius: "16px", padding: "28px",
          border: "1px solid #e8ddd3", boxShadow: "0 4px 20px rgba(122,92,46,0.08)",
          position: "sticky", top: "80px",
        }}>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, marginBottom: "6px" }}>
            Enquire about this plot
          </h3>
          <p style={{ fontSize: "13px", color: "#7a6655", marginBottom: "22px" }}>
            Our team will call you within 24 hours.
          </p>

          {submitted ? (
            <div style={{ textAlign: "center", padding: "24px 0" }}>
              <div style={{ fontSize: "44px", marginBottom: "12px" }}>✅</div>
              <p style={{ fontWeight: 600, marginBottom: "6px" }}>Enquiry Received!</p>
              <p style={{ color: "#7a6655", fontSize: "14px" }}>We'll contact you shortly about {title}.</p>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {[
                { key: "name", placeholder: "Your name", type: "text" },
                { key: "phone", placeholder: "Phone number", type: "tel" },
              ].map((f) => (
                <input
                  key={f.key}
                  type={f.type}
                  placeholder={f.placeholder}
                  required
                  value={form[f.key]}
                  onChange={set(f.key)}
                  style={{
                    padding: "11px 14px", border: "1px solid #ddd6ce", borderRadius: "8px",
                    fontSize: "14px", outline: "none", background: "#faf7f3", color: "#2c1a0e",
                  }}
                />
              ))}
              <textarea
                placeholder={`I'm interested in ${title}...`}
                rows={3}
                value={form.message}
                onChange={set("message")}
                style={{
                  padding: "11px 14px", border: "1px solid #ddd6ce", borderRadius: "8px",
                  fontSize: "14px", resize: "vertical", outline: "none",
                  background: "#faf7f3", color: "#2c1a0e", fontFamily: "inherit",
                }}
              />
              <button type="submit" style={{
                background: ACCENT, color: "#fff", padding: "13px",
                borderRadius: "8px", border: "none", fontWeight: 700, fontSize: "15px", marginTop: "4px",
              }}>
                Send Enquiry
              </button>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", paddingTop: "4px" }}>
                <a href="tel:+919000000000" style={{ fontSize: "13px", color: ACCENT, fontWeight: 500 }}>
                  📞 +91 90000 00000
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
