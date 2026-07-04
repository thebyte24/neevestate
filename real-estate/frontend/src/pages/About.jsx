import { Link } from "react-router-dom";

const ACCENT = "#7a5c2e";
const ACCENT_LIGHT = "#f0e8df";

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, #2c1a0e 60%, #7a5c2e 100%)`,
        padding: "80px 32px 72px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: "rgba(255,255,255,0.6)", marginBottom: "14px" }}>
          ABOUT US
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "18px",
        }}>
          Rooted in Andhra,<br />Built on Trust
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "560px", margin: "0 auto", lineHeight: 1.7 }}>
          Neev Estate has been helping families and investors find the right land across Andhra Pradesh — with honesty, clear titles, and no surprises.
        </p>
      </section>

      {/* Story */}
      <section style={{ padding: "80px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: ACCENT, marginBottom: "12px" }}>OUR STORY</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, lineHeight: 1.3, marginBottom: "20px" }}>
              From Nellore to every corner of Andhra Pradesh
            </h2>
            <p style={{ fontSize: "15px", color: "#5a4a3a", lineHeight: 1.85, marginBottom: "16px" }}>
              Founded and led by <strong>N. Sreedhar</strong>, Neev Estate began with a simple belief — land investment should be transparent, accessible, and stress-free for every buyer, whether they're purchasing their first plot or expanding a portfolio.
            </p>
            <p style={{ fontSize: "15px", color: "#5a4a3a", lineHeight: 1.85, marginBottom: "16px" }}>
              Operating from Nellore, we source and develop DTCP-approved open plots, gated layouts, and farm lands across the state's fastest-growing corridors including Amaravati, Vijayawada, Guntur, Visakhapatnam, and Tirupati.
            </p>
            <p style={{ fontSize: "15px", color: "#5a4a3a", lineHeight: 1.85 }}>
              Every property we list comes with verified documentation, clear title assurance, and end-to-end support — from site visit to registration.
            </p>
          </div>
          <div style={{ borderRadius: "16px", overflow: "hidden", height: "420px" }}>
            <img
              src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80"
              alt="Andhra Pradesh land"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: ACCENT_LIGHT, padding: "64px 32px" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "32px", textAlign: "center" }}>
            {[
              { value: "10+", label: "Layouts across AP" },
              { value: "1,200+", label: "Plots sold" },
              { value: "100%", label: "Clear titles" },
              { value: "15+", label: "Years of experience" },
            ].map((s) => (
              <div key={s.label} style={{ padding: "28px 20px", background: "#fff", borderRadius: "12px", border: "1px solid #e8ddd3" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, color: ACCENT, marginBottom: "6px" }}>{s.value}</p>
                <p style={{ fontSize: "14px", color: "#7a6655" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 32px", maxWidth: "1100px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: ACCENT, textAlign: "center", marginBottom: "10px" }}>LEADERSHIP</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, textAlign: "center", marginBottom: "48px" }}>
          The person behind Neev Estate
        </h2>
        <div style={{ maxWidth: "480px", margin: "0 auto", background: "#fff", borderRadius: "16px", border: "1px solid #e8ddd3", padding: "40px 36px", textAlign: "center" }}>
          <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: ACCENT_LIGHT, margin: "0 auto 20px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "32px" }}>👤</span>
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", fontWeight: 700, marginBottom: "6px" }}>N. Sreedhar</h3>
          <p style={{ color: ACCENT, fontSize: "13px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "16px" }}>Founder & Managing Director</p>
          <p style={{ fontSize: "14px", color: "#7a6655", lineHeight: 1.75, marginBottom: "20px" }}>
            With over 15 years in Andhra Pradesh real estate, Sreedhar has helped hundreds of families secure DTCP-approved land with zero legal complications.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
            <a href="tel:+919347102038" style={{ background: ACCENT_LIGHT, color: ACCENT, padding: "8px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
              📞 +91 93471 02038
            </a>
            <a href="mailto:sreedharn7@gmail.com" style={{ background: ACCENT_LIGHT, color: ACCENT, padding: "8px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: 600 }}>
              ✉️ sreedharn7@gmail.com
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: ACCENT, margin: "0 32px 64px", borderRadius: "16px", padding: "56px 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
          Let's find your perfect plot
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", marginBottom: "32px" }}>
          Browse our available listings or talk to us directly.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
          <Link to="/plots" style={{
            background: "#fff", color: ACCENT, padding: "13px 28px",
            borderRadius: "8px", fontWeight: 700, fontSize: "15px",
          }}>
            View Plots →
          </Link>
          <a href="tel:+919347102038" style={{
            background: "transparent", color: "#fff",
            border: "1.5px solid rgba(255,255,255,0.6)",
            padding: "13px 28px", borderRadius: "8px", fontWeight: 500, fontSize: "15px",
          }}>
            Call Us
          </a>
        </div>
      </section>
    </div>
  );
}
