import { Link } from "react-router-dom";

const BADGE_COLORS = {
  "DTCP Approved": { bg: "#fff", text: "#2c1a0e" },
  "RERA Registered": { bg: "#fff", text: "#2c1a0e" },
  "Gated Community": { bg: "#fff", text: "#2c1a0e" },
  "Farm Land": { bg: "#fff", text: "#2c1a0e" },
};

export default function PlotCard({ property }) {
  const { id, title, price, priceUnit, badge, sizeRange, facing, location, image } = property;
  const badgeStyle = BADGE_COLORS[badge] || { bg: "#fff", text: "#2c1a0e" };

  return (
    <Link to={`/plot/${id}`}>
      <div
        style={{
          background: "#fff",
          borderRadius: "12px",
          overflow: "hidden",
          border: "1px solid #ede5db",
          transition: "box-shadow 0.2s, transform 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = "0 8px 30px rgba(122,92,46,0.15)";
          e.currentTarget.style.transform = "translateY(-3px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = "none";
          e.currentTarget.style.transform = "translateY(0)";
        }}
      >
        {/* Image */}
        <div style={{ position: "relative", height: "260px", overflow: "hidden" }}>
          <img src={image} alt={title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          {badge && (
            <span style={{
              position: "absolute", top: "12px", left: "12px",
              background: badgeStyle.bg, color: badgeStyle.text,
              padding: "4px 12px", borderRadius: "20px",
              fontSize: "12px", fontWeight: 500,
              boxShadow: "0 2px 6px rgba(0,0,0,0.12)",
            }}>
              {badge}
            </span>
          )}
        </div>

        {/* Info */}
        <div style={{ padding: "16px 18px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, color: "#2c1a0e", lineHeight: 1.3 }}>
              {title}
            </h3>
            <span style={{ fontSize: "15px", fontWeight: 700, color: "#7a5c2e", whiteSpace: "nowrap", marginLeft: "12px" }}>
              ₹{price.toLocaleString("en-IN")} / {priceUnit}
            </span>
          </div>

          <p style={{ fontSize: "13px", color: "#7a6655", marginBottom: "12px" }}>
            📍 {location}
          </p>

          <div style={{
            display: "flex", gap: "16px", fontSize: "12px", color: "#7a6655",
            paddingTop: "12px", borderTop: "1px solid #f0e8df",
          }}>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <SizeIcon /> {sizeRange}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <CompassIcon /> {facing}
            </span>
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              <PlotIcon /> Open plot
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

const SizeIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
const CompassIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);
const PlotIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
  </svg>
);
