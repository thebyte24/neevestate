import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PlotCard from "../components/PlotCard";

const ACCENT = "#7a5c2e";

const DEFAULT_HERO = {
  badge: "OPEN PLOTS • FARM LANDS • ANDHRA PRADESH",
  headline: "Own a piece of\nAndhra's growth\nstory.",
  subtext:
    "Neev Estate brings you DTCP-approved open plots and farm lands across Nellore, Vijayawada, Guntur, Visakhapatnam and Tirupati — with clear titles and transparent pricing.",
  cta1: "View available plots",
  cta2: "Book a site visit",
  imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80",
};

export default function Home() {
  const [plots, setPlots] = useState([]);
  const [hero, setHero] = useState(DEFAULT_HERO);

  useEffect(() => {
    // Load hero
    getDoc(doc(db, "config", "hero"))
      .then((snap) => { if (snap.exists()) setHero(snap.data()); })
      .catch(() => {});

    // Load featured plots (first 4)
    getDocs(collection(db, "properties"))
      .then((snap) => {
        const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
        setPlots(data.slice(0, 4));
      });
  }, []);

  return (
    <div>
      {/* ── Hero ── */}
      <section style={{
        position: "relative", minHeight: "88vh",
        display: "flex", alignItems: "flex-end", overflow: "hidden",
      }}>
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: `url(${hero.imageUrl})`,
          backgroundSize: "cover", backgroundPosition: "center",
          filter: "brightness(0.55)",
        }} />
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(to right, rgba(44,26,14,0.75) 40%, rgba(0,0,0,0.1) 100%)",
        }} />
        <div style={{ position: "relative", padding: "0 48px 80px", maxWidth: "680px" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: "rgba(255,255,255,0.7)", marginBottom: "18px" }}>
            {hero.badge}
          </p>
          <h1 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(36px, 5vw, 62px)", fontWeight: 800,
            color: "#fff", lineHeight: 1.15, marginBottom: "20px", whiteSpace: "pre-line",
          }}>
            {hero.headline}
          </h1>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", lineHeight: 1.7, marginBottom: "36px", maxWidth: "460px" }}>
            {hero.subtext}
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/plots" style={{
              background: ACCENT, color: "#fff", padding: "13px 28px",
              borderRadius: "7px", fontWeight: 600, fontSize: "15px",
              display: "flex", alignItems: "center", gap: "8px",
            }}>
              {hero.cta1} →
            </Link>
            <a href="#contact" style={{
              background: "transparent", color: "#fff",
              border: "1.5px solid rgba(255,255,255,0.6)",
              padding: "13px 28px", borderRadius: "7px", fontWeight: 500, fontSize: "15px",
            }}>
              {hero.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* ── Featured Plots ── */}
      <section style={{ padding: "72px 32px", maxWidth: "1400px", margin: "0 auto" }}>
        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: ACCENT, marginBottom: "10px" }}>
          FEATURED PLOTS
        </p>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "36px" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700 }}>
            Land worth investing in
          </h2>
          <Link to="/plots" style={{
            fontSize: "14px", color: "#4a3728", fontWeight: 500,
            border: "1px solid #c8bdb4", padding: "8px 18px", borderRadius: "6px",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            View all plots →
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "28px" }}>
          {plots.map((p) => <PlotCard key={p.id} property={p} />)}
        </div>
      </section>

      {/* ── About ── */}
      <section id="about" style={{ padding: "80px 32px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: ACCENT, marginBottom: "12px" }}>ABOUT NEEV ESTATE</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, lineHeight: 1.25, marginBottom: "20px" }}>
              Rooted in Andhra,<br />built on trust
            </h2>
            <p style={{ fontSize: "15px", color: "#5a4a3a", lineHeight: 1.8, marginBottom: "14px" }}>
              <strong>Neev Estate</strong> is an Andhra Pradesh based land developer focused on open plots, gated layouts, and farm lands across the state's fastest-growing corridors — Amaravati, Vijayawada, Guntur, Visakhapatnam and Tirupati.
            </p>
            <p style={{ fontSize: "15px", color: "#5a4a3a", lineHeight: 1.8, marginBottom: "32px" }}>
              We handle land sourcing, layout development, DTCP approvals, and end-to-end registration so you can invest with complete confidence.
            </p>
            <div style={{ display: "flex", gap: "36px", paddingTop: "24px", borderTop: "1px solid #e8ddd3" }}>
              {[{ value: "10+", label: "Layouts in AP" }, { value: "1,200+", label: "Plots sold" }, { value: "100%", label: "Clear titles" }].map((s) => (
                <div key={s.label}>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "28px", fontWeight: 700, color: ACCENT }}>{s.value}</p>
                  <p style={{ fontSize: "13px", color: "#7a6655", marginTop: "2px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ borderRadius: "16px", overflow: "hidden", height: "380px" }}>
            <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" alt="Andhra Pradesh land" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section style={{ background: "#eee8e0", padding: "72px 32px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: ACCENT, textAlign: "center", marginBottom: "10px" }}>CLIENT STORIES</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 700, textAlign: "center", marginBottom: "40px" }}>
            What our buyers say
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
            {[
              { quote: '"Booked two plots in Neev Greens near Amaravati. Clear title, gated layout, and the registration was seamless."', name: "Ravi Teja", role: "Investor, Vijayawada" },
              { quote: '"Neev Estate helped my family buy farm land near Tirupati. Honest pricing and great post-sale support."', name: "Lakshmi Prasanna", role: "Buyer, Tirupati" },
            ].map((t) => (
              <div key={t.name} style={{ background: "#fff", padding: "28px 30px", borderRadius: "12px", border: "1px solid #e2d8ce" }}>
                <p style={{ fontSize: "15px", color: "#4a3728", lineHeight: 1.75, marginBottom: "20px" }}>{t.quote}</p>
                <div style={{ borderTop: "1px solid #f0e8df", paddingTop: "16px" }}>
                  <p style={{ fontWeight: 600, fontSize: "14px", color: "#2c1a0e" }}>{t.name}</p>
                  <p style={{ fontSize: "13px", color: "#7a6655" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / Contact ── */}
      <section id="contact" style={{ background: ACCENT, padding: "64px 32px", borderRadius: "12px", margin: "48px 32px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, color: "#fff", marginBottom: "12px", textAlign: "center" }}>
            Ready to own land in Andhra Pradesh?
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px", marginBottom: "44px", textAlign: "center" }}>
            Talk to our team for current availability, pricing, and a free site visit.
          </p>

          {/* Contact cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px", marginBottom: "32px" }}>
            {/* Name */}
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "20px 22px", border: "1px solid rgba(255,255,255,0.2)" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "6px", textTransform: "uppercase" }}>Contact Person</p>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "17px" }}>N. Sreedhar</p>
            </div>
            {/* Phone */}
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "20px 22px", border: "1px solid rgba(255,255,255,0.2)" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "6px", textTransform: "uppercase" }}>Mobile</p>
              <a href="tel:+919347102038" style={{ color: "#fff", fontWeight: 700, fontSize: "17px", display: "block" }}>+91 93471 02038</a>
              <a href="tel:08614057247" style={{ color: "rgba(255,255,255,0.8)", fontSize: "14px", marginTop: "4px", display: "block" }}>0861-4057247</a>
            </div>
            {/* Email */}
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "20px 22px", border: "1px solid rgba(255,255,255,0.2)" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "6px", textTransform: "uppercase" }}>Email</p>
              <a href="mailto:sreedharn7@gmail.com" style={{ color: "#fff", fontWeight: 600, fontSize: "15px", wordBreak: "break-all" }}>sreedharn7@gmail.com</a>
            </div>
            {/* Address */}
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: "12px", padding: "20px 22px", border: "1px solid rgba(255,255,255,0.2)" }}>
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "1px", color: "rgba(255,255,255,0.6)", marginBottom: "6px", textTransform: "uppercase" }}>Address</p>
              <p style={{ color: "#fff", fontSize: "14px", lineHeight: 1.6 }}>Haranathpuram 1st Line,<br />Opp Manasa Hotel,<br />Nellore – 524 003</p>
            </div>
          </div>

          <p style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: "14px" }}>
            🌐 <a href="http://www.neevestate.com" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,0.8)" }}>www.neevestate.com</a>
          </p>
        </div>
      </section>
    </div>
  );
}
