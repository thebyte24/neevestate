import { Link } from "react-router-dom";

const ACCENT = "#7a5c2e";

const services = [
  { icon: "🗺️", title: "Open Plot Sales", desc: "DTCP-approved open plots in prime locations across Nellore, Vijayawada, Guntur, Visakhapatnam, and Tirupati. Every plot comes with clear title." },
  { icon: "🏘️", title: "Gated Community Layouts", desc: "Fully developed gated layouts with BT roads, drainage, electricity, and compound walls. Ideal for residential investment." },
  { icon: "🌾", title: "Farm Land", desc: "Fertile agricultural land and eco-farm plots across Andhra Pradesh. Perfect for weekend getaways, organic farming, or land banking." },
  { icon: "📋", title: "DTCP & RERA Approvals", desc: "We handle all government approvals so you get legally clean land with zero paperwork headaches." },
  { icon: "📝", title: "Registration & Documentation", desc: "End-to-end support for property registration, sale deed preparation, and encumbrance certificate verification." },
  { icon: "🔍", title: "Site Visits", desc: "Free guided site visits at any of our active layouts. Our team shows you the land and answers every question on the spot." },
  { icon: "💼", title: "Investment Consulting", desc: "Not sure which location suits your budget? Our team provides honest, unbiased advice on where Andhra's growth is heading." },
  { icon: "🤝", title: "Post-Sale Support", desc: "From mutation and Patta transfer to layout development updates, we stay in touch well after registration." },
];

const steps = [
  { step: "01", title: "Enquire", desc: "Call, WhatsApp, or fill the form. We respond within hours." },
  { step: "02", title: "Site Visit", desc: "We arrange a free guided tour of your chosen layout." },
  { step: "03", title: "Booking", desc: "Reserve your plot with a token amount. Paperwork starts." },
  { step: "04", title: "Registration", desc: "We complete the sale deed and hand over your documents." },
];

export default function Services() {
  return (
    <div style={{ background: "#fff" }}>
      {/* Hero */}
      <section style={{ background: "linear-gradient(135deg, #1a1208 0%, #3d2810 100%)", padding: "80px 32px 72px", textAlign: "center" }}>
        <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>WHAT WE OFFER</p>
        <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,56px)", fontWeight: 800, color: "#fff", lineHeight: 1.15, marginBottom: "20px" }}>
          Our Services
        </h1>
        <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "17px", maxWidth: "500px", margin: "0 auto", lineHeight: 1.75 }}>
          From sourcing land to final registration — we handle every step so your investment journey is smooth.
        </p>
      </section>

      {/* Services grid */}
      <section style={{ padding: "80px 32px", maxWidth: "1280px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: "24px" }}>
          {services.map(s => (
            <div key={s.title} style={{ background: "#faf7f3", borderRadius: "16px", padding: "32px 28px", border: "1px solid #ede5db", transition: "transform 0.2s, box-shadow 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 32px rgba(122,92,46,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ width: "52px", height: "52px", borderRadius: "14px", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "24px", marginBottom: "18px" }}>
                {s.icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, marginBottom: "10px", color: "#1a1208" }}>{s.title}</h3>
              <p style={{ fontSize: "14px", color: "#7a6655", lineHeight: 1.75 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ background: "#f7f3ee", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: ACCENT, marginBottom: "12px" }}>HOW IT WORKS</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 700, color: "#1a1208" }}>4 simple steps to own land</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "20px" }}>
            {steps.map((s, i) => (
              <div key={s.step} style={{ background: "#fff", borderRadius: "16px", padding: "32px 24px", border: "1px solid #ede5db", textAlign: "center", position: "relative" }}>
                {i < steps.length - 1 && (
                  <div style={{ position: "absolute", top: "40px", right: "-12px", width: "24px", height: "2px", background: "#ddd", zIndex: 1 }} className="step-arrow" />
                )}
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "36px", fontWeight: 700, color: ACCENT, marginBottom: "10px" }}>{s.step}</p>
                <p style={{ fontWeight: 700, fontSize: "15px", color: "#1a1208", marginBottom: "8px" }}>{s.title}</p>
                <p style={{ fontSize: "13px", color: "#7a6655", lineHeight: 1.65 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ background: "linear-gradient(135deg, #1a1208 0%, #3d2810 100%)", borderRadius: "20px", padding: "60px 40px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,3vw,38px)", fontWeight: 700, color: "#fff", marginBottom: "14px" }}>
              Ready to get started?
            </h2>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "16px", marginBottom: "32px" }}>Talk to N. Sreedhar directly — no bots, no wait queues.</p>
            <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
              <Link to="/plots" style={{ background: "#fff", color: "#1a1208", padding: "13px 28px", borderRadius: "10px", fontWeight: 700, fontSize: "15px" }}>
                Browse Plots →
              </Link>
              <a href="https://wa.me/919347102038" target="_blank" rel="noreferrer"
                style={{ background: "#25d366", color: "#fff", padding: "13px 28px", borderRadius: "10px", fontWeight: 600, fontSize: "15px" }}>
                💬 WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
