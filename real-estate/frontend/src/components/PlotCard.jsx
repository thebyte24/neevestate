import { Link } from "react-router-dom";

const ACCENT = "#7a5c2e";

export default function PlotCard({ property }) {
  const { id, title, price, priceUnit, badge, sizeRange, facing, location, image, images, category } = property;
  const coverImage = (images && images.length > 0) ? images[0] : image;

  return (
    <Link to={`/plot/${id}`} style={{ display: "block" }}>
      <div
        style={{ background: "#fff", borderRadius: "16px", overflow: "hidden", border: "1px solid #ede5db", transition: "box-shadow 0.25s, transform 0.25s", cursor: "pointer" }}
        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 12px 40px rgba(122,92,46,0.18)"; e.currentTarget.style.transform = "translateY(-4px)"; }}
        onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "translateY(0)"; }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "220px", overflow: "hidden", background: "#f0e8df" }}>
          {coverImage && <img src={coverImage} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s" }}
            onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
            onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
          />}
          {badge && (
            <span style={{ position: "absolute", top: "14px", left: "14px", background: "rgba(255,255,255,0.95)", color: "#2c1a0e", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", backdropFilter: "blur(4px)" }}>
              {badge}
            </span>
          )}
          {images && images.length > 1 && (
            <span style={{ position: "absolute", bottom: "12px", right: "12px", background: "rgba(0,0,0,0.55)", color: "#fff", padding: "3px 10px", borderRadius: "20px", fontSize: "11px", backdropFilter: "blur(4px)" }}>
              📷 {images.length}
            </span>
          )}
          {category && (
            <span style={{ position: "absolute", top: "14px", right: "14px", background: ACCENT, color: "#fff", padding: "4px 12px", borderRadius: "20px", fontSize: "11px", fontWeight: 600 }}>
              {category}
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "18px 20px" }}>
          <p style={{ fontSize: "12px", color: "#9a8070", marginBottom: "4px" }}>📍 {location}</p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, color: "#1a1208", lineHeight: 1.3, marginBottom: "10px" }}>
            {title}
          </h3>

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
            <span style={{ fontSize: "18px", fontWeight: 700, color: ACCENT }}>
              ₹{Number(price).toLocaleString("en-IN")}
              <span style={{ fontSize: "12px", fontWeight: 400, color: "#9a8070" }}> / {priceUnit}</span>
            </span>
          </div>

          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {sizeRange && <Tag icon={<SizeIcon />} label={sizeRange} />}
            {facing && <Tag icon={<CompassIcon />} label={facing} />}
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "12px 20px", borderTop: "1px solid #f0e8df", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: "13px", color: ACCENT, fontWeight: 600 }}>View Details</span>
          <span style={{ color: ACCENT, fontSize: "16px" }}>→</span>
        </div>
      </div>
    </Link>
  );
}

function Tag({ icon, label }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: "#f7f3ee", color: "#5a4a3a", padding: "4px 10px", borderRadius: "6px", fontSize: "12px", fontWeight: 500 }}>
      {icon}{label}
    </span>
  );
}

const SizeIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9"/><polyline points="9 21 3 21 3 15"/>
    <line x1="21" y1="3" x2="14" y2="10"/><line x1="3" y1="21" x2="10" y2="14"/>
  </svg>
);
const CompassIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10"/>
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/>
  </svg>
);
