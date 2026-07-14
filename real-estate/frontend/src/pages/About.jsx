import { Link } from "react-router-dom";

const ACCENT = "#7a5c2e";

export default function About() {
  return (
    <div style={{ background: "#fff" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1a1208 0%, #3d2810 100%)", padding: "80px 32px 72px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>ABOUT US</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,56px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "20px" }}>
          Rooted in Andhra,<br />Built on Trust
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "17px", maxWidth: "540px", margin: "0 auto", lineHeight: 1.75 }}>
          Neev Estate has been helping families and investors find the right land across Andhra Pradesh — with honesty, clear titles, and no surprises.
        </p>
      </section>

      {/* Story */}
      <section style={{ padding: "80px 32px", maxWidth: "1280px", margin: "0 auto" }}>
        <style>{`
          .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 72px; align-items: center; }
          @media (max-width: 900px) { .story-grid { grid-template-columns: 1fr !important; gap: 36px !important; } }
        `}</style>
        <div className="story-grid">
          <div>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: ACCENT, marginBottom: "14px" }}>OUR STORY</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 700, lineHeight: 1.25, marginBottom: "22px", color: "#1a1208" }}>
              From Nellore to every corner of Andhra Pradesh
            </h2>
            <p style={{ fontSize: "15px", color: "#5a4a3a", lineHeight: 1.85, marginBottom: "16px" }}>
              Founded and led by <strong>N. Sreedhar</strong>, Neev Estate began with a simple belief — land investment should be transparent, accessible, and stress-free for every buyer.
            </p>
            <p style={{ fontSize: "15px", color: "#5a4a3a", lineHeight: 1.85, marginBottom: "16px" }}>
              Operating from Nellore, we source and develop DTCP-approved open plots, gated layouts, and farm lands across the state's fastest-growing corridors.
            </p>
            <p style={{ fontSize: "15px", color: "#5a4a3a", lineHeight: 1.85 }}>
              Every property we list comes with verified documentation, clear title assurance, and end-to-end support — from site visit to registration.
            </p>
          </div>
          <div style={{ borderRadius: "20px", overflow: "hidden", height: "440px", boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}>
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" alt="Andhra Pradesh land" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{ background: "#f7f3ee", padding: "72px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "24px" }}>
            {[{ value: "10+", label: "Layouts across AP" }, { value: "1,200+", label: "Plots sold" }, { value: "100%", label: "Clear titles" }, { value: "15+", label: "Years of experience" }].map(s => (
              <div key={s.label} style={{ padding: "36px 24px", background: "#fff", borderRadius: "16px", border: "1px solid #ede5db", textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "40px", fontWeight: 700, color: ACCENT, marginBottom: "8px" }}>{s.value}</p>
                <p style={{ fontSize: "14px", color: "#7a6655" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "80px 32px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "52px" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: ACCENT, marginBottom: "12px" }}>LEADERSHIP</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 700, color: "#1a1208" }}>The person behind Neev Estate</h2>
        </div>
        <div style={{ maxWidth: "500px", margin: "0 auto", background: "#faf7f3", borderRadius: "20px", border: "1px solid #ede5db", padding: "44px 40px", textAlign: "center" }}>
          <div style={{ width: "88px", height: "88px", borderRadius: "50%", background: "#f0e8df", margin: "0 auto 22px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "36px", border: `3px solid ${ACCENT}` }}>
            👤
          </div>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "24px", fontWeight: 700, marginBottom: "6px", color: "#1a1208" }}>N. Sreedhar</h3>
          <p style={{ color: ACCENT, fontSize: "13px", fontWeight: 600, letterSpacing: "0.5px", marginBottom: "18px" }}>Founder & Managing Director</p>
          <p style={{ fontSize: "14px", color: "#7a6655", lineHeight: 1.8, marginBottom: "24px" }}>
            With over 15 years in Andhra Pradesh real estate, Sreedhar has helped hundreds of families secure DTCP-approved land with zero legal complications.
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
            <a href="tel:+919347102038" style={{ background: ACCENT, color: "#fff", padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600, display: "inline-flex", alignItems: "center", gap: "6px" }}>
              📞 +91 93471 02038
            </a>
            <a href="mailto:sreedharn7@gmail.com" style={{ background: "#f0e8df", color: ACCENT, padding: "10px 20px", borderRadius: "8px", fontSize: "13px", fontWeight: 600 }}>
              ✉️ Email
            </a>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "0 32px 80px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, #1a1208 0%, #3d2810 100%)", borderRadius: "20px", padding: "60px 40px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 700, color: "#fff", marginBottom: "14px" }}>
              Let's find your perfect plot
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "16px", marginBottom: "32px" }}>Browse our available listings or talk to us directly.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <Link to="/plots" style={{ background: "#fff", color: "#1a1208", padding: "13px 28px", borderRadius: "10px", fontWeight: 700, fontSize: "15px" }}>
                View Plots →
              </Link>
              <a href="tel:+919347102038" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1px solid rgba(255,255,255,0.2)", padding: "13px 28px", borderRadius: "10px", fontWeight: 500, fontSize: "15px" }}>
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
