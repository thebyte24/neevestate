import { Link } from "react-router-dom";

const ACCENT = "#7a5c2e";
const ACCENT_LIGHT = "#f0e8df";

const services = [
  {
    icon: "🗺️",
    title: "Open Plot Sales",
    desc: "DTCP-approved open plots in prime locations across Nellore, Vijayawada, Guntur, Visakhapatnam, and Tirupati. Every plot comes with clear title and verified documentation.",
  },
  {
    icon: "🏘️",
    title: "Gated Community Layouts",
    desc: "Fully developed gated layouts with BT roads, drainage, electricity, and compound walls. Ideal for residential investment with long-term appreciation.",
  },
  {
    icon: "🌾",
    title: "Farm Land",
    desc: "Fertile agricultural land and eco-farm plots across Andhra Pradesh. Perfect for weekend getaways, organic farming, or land banking.",
  },
  {
    icon: "📋",
    title: "DTCP & RERA Approvals",
    desc: "We handle all government approvals — DTCP, RERA, panchayat NOCs — so you get legally clean land with zero paperwork headaches.",
  },
  {
    icon: "📝",
    title: "Registration & Documentation",
    desc: "End-to-end support for property registration, sale deed preparation, and encumbrance certificate verification. We guide you through every step.",
  },
  {
    icon: "🔍",
    title: "Site Visits",
    desc: "Free guided site visits at any of our active layouts. Our team picks you up, shows you the land, and answers every question on the spot.",
  },
  {
    icon: "💼",
    title: "Investment Consulting",
    desc: "Not sure which location or plot size suits your budget? Our team provides honest, unbiased advice on where Andhra's growth is heading.",
  },
  {
    icon: "🤝",
    title: "Post-Sale Support",
    desc: "From mutation and Patta transfer to layout development updates, we stay in touch well after registration — because your investment matters to us.",
  },
];

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section style={{
        background: `linear-gradient(135deg, #2c1a0e 60%, #7a5c2e 100%)`,
        padding: "80px 32px 72px",
        textAlign: "center",
      }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: "rgba(255,255,255,0.6)", marginBottom: "14px" }}>
          WHAT WE OFFER
        </p>
        <h1 style={{
          fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px, 4vw, 52px)",
          fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "18px",
        }}>
          Our Services
        </h1>
        <p style={{ color: "rgba(255,255,255,0.75)", fontSize: "17px", maxWidth: "520px", margin: "0 auto", lineHeight: 1.7 }}>
          From sourcing land to final registration — we handle every step so your investment journey is smooth and stress-free.
        </p>
      </section>

      {/* Services Grid */}
      <section style={{ padding: "80px 32px", maxWidth: "1200px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "24px" }}>
          {services.map((s) => (
            <div key={s.title} style={{
              background: "#fff", borderRadius: "14px", padding: "32px 28px",
              border: "1px solid #e8ddd3",
              transition: "box-shadow 0.2s",
            }}>
              <div style={{
                width: "52px", height: "52px", borderRadius: "12px",
                background: ACCENT_LIGHT, display: "flex", alignItems: "center",
                justifyContent: "center", fontSize: "24px", marginBottom: "18px",
              }}>
                {s.icon}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "18px", fontWeight: 700, marginBottom: "10px", color: "#2c1a0e" }}>
                {s.title}
              </h3>
              <p style={{ fontSize: "14px", color: "#7a6655", lineHeight: 1.75 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section style={{ background: ACCENT_LIGHT, padding: "72px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: ACCENT, textAlign: "center", marginBottom: "10px" }}>HOW IT WORKS</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, textAlign: "center", marginBottom: "48px" }}>
            4 simple steps to own land
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "20px" }}>
            {[
              { step: "01", title: "Enquire", desc: "Call, WhatsApp, or fill the form. We respond within hours." },
              { step: "02", title: "Site Visit", desc: "We arrange a free guided tour of your chosen layout." },
              { step: "03", title: "Booking", desc: "Reserve your plot with a token amount. Paperwork starts." },
              { step: "04", title: "Registration", desc: "We complete the sale deed and hand over your documents." },
            ].map((s) => (
              <div key={s.step} style={{ background: "#fff", borderRadius: "14px", padding: "28px 22px", border: "1px solid #e8ddd3", textAlign: "center" }}>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: ACCENT, marginBottom: "10px" }}>{s.step}</p>
                <p style={{ fontWeight: 700, fontSize: "15px", color: "#2c1a0e", marginBottom: "8px" }}>{s.title}</p>
                <p style={{ fontSize: "13px", color: "#7a6655", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: ACCENT, margin: "64px 32px", borderRadius: "16px", padding: "56px 32px", textAlign: "center" }}>
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 700, color: "#fff", marginBottom: "12px" }}>
          Ready to get started?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", marginBottom: "32px" }}>
          Talk to N. Sreedhar directly — no bots, no wait queues.
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "14px", flexWrap: "wrap" }}>
          <Link to="/plots" style={{
            background: "#fff", color: ACCENT, padding: "13px 28px",
            borderRadius: "8px", fontWeight: 700, fontSize: "15px",
          }}>
            Browse Plots →
          </Link>
          <a href="https://wa.me/919347102038" target="_blank" rel="noreferrer" style={{
            background: "#25d366", color: "#fff",
            padding: "13px 28px", borderRadius: "8px", fontWeight: 600, fontSize: "15px",
          }}>
            💬 WhatsApp Us
          </a>
        </div>
      </section>
    </div>
  );
}
