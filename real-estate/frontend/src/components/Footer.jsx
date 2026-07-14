import { Link } from "react-router-dom";

const ACCENT = "#7a5c2e";

export default function Footer() {
  return (
    <footer style={{ background: "#1a1208", color: "#fff" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "64px 32px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: "48px" }} className="footer-grid">
          <style>{`
            .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1.5fr; gap: 48px; }
            @media (max-width: 900px) { .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 36px !important; } }
            @media (max-width: 520px) { .footer-grid { grid-template-columns: 1fr !important; } }
            .footer-link { font-size: 14px; color: rgba(255,255,255,0.55); transition: color 0.2s; display: block; margin-bottom: 10px; }
            .footer-link:hover { color: #fff; }
          `}</style>

          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "2px", marginBottom: "16px" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "24px", color: "#fff" }}>Neev</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "24px", color: "rgba(255,255,255,0.45)" }}> Estate</span>
            </div>
            <p style={{ fontSize: "14px", color: "rgba(255,255,255,0.5)", lineHeight: 1.75, maxWidth: "260px", marginBottom: "28px" }}>
              Premium open plots and farm lands across Andhra Pradesh. Clear titles. Transparent pricing.
            </p>
            <a href="https://wa.me/919347102038" target="_blank" rel="noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "#25d366", color: "#fff", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
              <svg width="15" height="15" viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.505L4 29l7.697-1.812A12.94 12.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm-3.293 5.5c-.2 0-.524.075-.8.375-.276.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.1 3.225 5.125 4.4.715.275 1.275.44 1.71.565.718.2 1.373.173 1.89.105.576-.075 1.775-.726 2.025-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35-.3-.15-1.775-.876-2.05-.975-.275-.1-.475-.15-.675.15-.2.3-.776.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.41-1.487-.89-.794-1.492-1.774-1.667-2.074-.175-.3-.019-.463.131-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.225-.243-.583-.49-.504-.675-.513l-.575-.01z"/></svg>
              Chat on WhatsApp
            </a>
          </div>

          {/* Explore */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>Explore</p>
            {[["Plots", "/plots"], ["Services", "/services"], ["About", "/about"], ["Contact", "/#contact"]].map(([l, to]) => (
              <Link key={l} to={to} className="footer-link">{l}</Link>
            ))}
          </div>

          {/* Legal */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>Approvals</p>
            {["DTCP Approved", "RERA Registered", "NUDA Approved", "Clear Titles"].map(l => (
              <p key={l} className="footer-link" style={{ fontSize: "14px", color: "rgba(255,255,255,0.55)", marginBottom: "10px" }}>✓ {l}</p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>Contact</p>
            <p style={{ fontSize: "15px", fontWeight: 600, color: "#fff", marginBottom: "12px" }}>N. Sreedhar</p>
            <a href="tel:+919347102038" className="footer-link">📞 +91 93471 02038</a>
            <a href="tel:08614057247" className="footer-link">📞 0861-4057247</a>
            <a href="mailto:sreedharn7@gmail.com" className="footer-link">✉️ sreedharn7@gmail.com</a>
            <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", lineHeight: 1.7, marginTop: "12px" }}>
              Haranathpuram 1st Line,<br />Opp Manasa Hotel,<br />Nellore – 524 003
            </p>
          </div>
        </div>

        <div style={{ borderTop: "1px solid rgba(255,255,255,0.08)", marginTop: "48px", paddingTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <p style={{ fontSize: "13px", color: "rgba(255,255,255,0.3)" }}>© 2026 Neev Estate. All rights reserved. Andhra Pradesh, India.</p>
          <a href="http://www.neevestate.com" target="_blank" rel="noreferrer" style={{ fontSize: "13px", color: "rgba(255,255,255,0.35)" }}>www.neevestate.com</a>
        </div>
      </div>
    </footer>
  );
}
