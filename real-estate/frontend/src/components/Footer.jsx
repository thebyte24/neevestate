import { Link } from "react-router-dom";

const ACCENT = "#7a5c2e";

export default function Footer() {
  return (
    <footer style={{ background: "#faf7f3", borderTop: "1px solid #e8ddd3" }}>
      {/* Main footer */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "52px 20px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px" }}
          className="footer-grid">
          <style>{`
            .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 48px; }
            @media (max-width: 768px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 32px !important; } }
            @media (max-width: 480px) { .footer-grid { grid-template-columns: 1fr !important; } }
          `}</style>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1px", marginBottom: "14px" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "20px", color: "#2c1a0e" }}>Neev</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "20px", color: ACCENT }}> Estate</span>
            </div>
            <p style={{ fontSize: "14px", color: "#7a6655", lineHeight: 1.7, maxWidth: "280px" }}>
              Premium open plots and farm lands across Andhra Pradesh. Clear titles, gated layouts, and honest guidance.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p style={{ fontWeight: 600, fontSize: "13px", color: "#4a3728", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "16px" }}>
              Explore
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {[
                { label: "Plots", to: "/plots" },
                { label: "Services", to: "/services" },
                { label: "About", to: "/about" },
                { label: "Contact", to: "/#contact" },
              ].map(({ label, to }) => (
                <Link key={label} to={to} style={{ fontSize: "14px", color: "#7a6655" }}>
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontWeight: 600, fontSize: "13px", color: "#4a3728", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "16px" }}>
              Contact
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              <p style={{ fontSize: "14px", color: "#7a6655", fontWeight: 600 }}>N. Sreedhar</p>
              <a href="tel:+919347102038" style={{ fontSize: "14px", color: "#7a6655" }}>+91 93471 02038</a>
              <a href="tel:08614057247" style={{ fontSize: "14px", color: "#7a6655" }}>0861-4057247</a>
              <a href="mailto:sreedharn7@gmail.com" style={{ fontSize: "14px", color: "#7a6655" }}>sreedharn7@gmail.com</a>
              <p style={{ fontSize: "13px", color: "#a08c78", lineHeight: 1.6 }}>
                Haranathpuram 1st Line,<br />Opp Manasa Hotel,<br />Nellore – 524 003
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #e8ddd3", padding: "16px 32px", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: "#a08c78" }}>
          © 2026 Neev Estate. All rights reserved. Andhra Pradesh, India.
        </p>
      </div>
    </footer>
  );
}
