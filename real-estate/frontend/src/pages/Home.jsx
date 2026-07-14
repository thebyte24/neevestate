import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import PlotCard from "../components/PlotCard";

const ACCENT = "#7a5c2e";

const DEFAULT_HERO = {
  badge: "OPEN PLOTS • FARM LANDS • ANDHRA PRADESH",
  headline: "Own a piece of\nAndhra's growth\nstory.",
  subtext: "Neev Estate brings you DTCP-approved open plots and farm lands across Nellore, Vijayawada, Guntur, Visakhapatnam and Tirupati — with clear titles and transparent pricing.",
  cta1: "View available plots",
  cta2: "Book a site visit",
  imageUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1400&q=80",
};

const WHY = [
  { icon: "✓", title: "DTCP & RERA Approved", desc: "Every plot comes with government approval, verified title deeds, and legal clarity." },
  { icon: "📍", title: "Prime AP Locations", desc: "Carefully selected sites in high-growth corridors — Amaravati, Nellore, Vijayawada." },
  { icon: "🤝", title: "End-to-End Support", desc: "From site visit to registration, our team handles everything for you." },
  { icon: "💰", title: "Transparent Pricing", desc: "No hidden charges, no broker markup. What you see is exactly what you pay." },
];

export default function Home() {
  const [plots, setPlots] = useState([]);
  const [hero, setHero] = useState(DEFAULT_HERO);
  const [slide, setSlide] = useState(0);
  const videoRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    getDoc(doc(db, "config", "hero")).then(snap => { if (snap.exists()) setHero(snap.data()); }).catch(() => {});
    getDocs(collection(db, "properties")).then(snap => {
      setPlots(snap.docs.map(d => ({ id: d.id, ...d.data() })).slice(0, 6));
    });
  }, []);

  // Normalise: items can be { url, type } or plain strings
  const heroItems = (() => {
    const raw = (hero.images && hero.images.length > 0)
      ? hero.images
      : [hero.imageUrl || DEFAULT_HERO.imageUrl];
    return raw.map(v => typeof v === "string" ? { url: v, type: "image" } : v);
  })();

  const goNext = useCallback(() => setSlide(s => (s + 1) % heroItems.length), [heroItems.length]);
  const goPrev = () => setSlide(s => (s - 1 + heroItems.length) % heroItems.length);

  // Auto-advance: image slides stay 5s, video slides play until end (no timer, relies on onEnded)
  useEffect(() => {
    clearTimeout(timerRef.current);
    if (heroItems.length <= 1) return;
    const cur = heroItems[slide];
    if (cur?.type !== "video") {
      // Image slide: advance after 5 seconds
      timerRef.current = setTimeout(goNext, 5000);
    }
    // For video slides, we rely solely on the onEnded event (no timeout)
    return () => clearTimeout(timerRef.current);
  }, [slide, heroItems.length, goNext]);


  return (
    <div>
      <style>{`
        .hero-text { padding: 0 48px 100px; max-width: 700px; }
        .why-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 24px; }
        .plots-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
        .contact-grid { display: grid; grid-template-columns: repeat(4,1fr); gap: 16px; }
        .about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; align-items: center; }
        @media (max-width: 1100px) {
          .plots-grid { grid-template-columns: repeat(2,1fr) !important; }
          .why-grid { grid-template-columns: repeat(2,1fr) !important; }
          .contact-grid { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          .hero-text { padding: 0 20px 72px !important; }
          .plots-grid, .why-grid, .contact-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 36px !important; }
        }
      `}</style>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "flex-end", overflow: "hidden" }}>
        {/* Slides */}
        {heroItems.map((item, i) => (
          <div key={i} style={{ position: "absolute", inset: 0, opacity: i === slide ? 1 : 0, transition: "opacity 0.9s ease", zIndex: 0 }}>
            {item.type === "video"
              ? <video
                  ref={i === slide ? videoRef : null}
                  src={item.url}
                  autoPlay muted playsInline
                  onEnded={goNext}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              : <div style={{ position: "absolute", inset: 0, backgroundImage: `url(${item.url})`, backgroundSize: "cover", backgroundPosition: "center" }} />
            }
          </div>
        ))}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(10,6,2,0.9) 0%, rgba(10,6,2,0.45) 55%, rgba(10,6,2,0.1) 100%)", zIndex: 1 }} />

        {/* Prev / Next arrows */}
        {heroItems.length > 1 && (
          <>
            <button onClick={goPrev} aria-label="Previous slide" style={{ position: "absolute", left: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "50%", width: "48px", height: "48px", fontSize: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>‹</button>
            <button onClick={goNext} aria-label="Next slide" style={{ position: "absolute", right: "24px", top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.2)", color: "#fff", borderRadius: "50%", width: "48px", height: "48px", fontSize: "22px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}
              onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.25)"}
              onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}>›</button>
          </>
        )}

        {/* Dot indicators */}
        {heroItems.length > 1 && (
          <div style={{ position: "absolute", bottom: "32px", right: "40px", display: "flex", gap: "8px", zIndex: 2 }}>
            {heroItems.map((item, i) => (
              <button key={i} onClick={() => setSlide(i)} aria-label={`Slide ${i + 1}`} style={{ width: i === slide ? "24px" : "8px", height: "8px", borderRadius: "4px", border: "none", cursor: "pointer", padding: 0, background: i === slide ? "#fff" : "rgba(255,255,255,0.4)", transition: "all 0.3s", position: "relative" }}>
                {item.type === "video" && i === slide && <span style={{ position: "absolute", top: "-18px", left: "50%", transform: "translateX(-50%)", fontSize: "10px", color: "rgba(255,255,255,0.7)" }}>▶</span>}
              </button>
            ))}
          </div>
        )}

        <div className="hero-text" style={{ position: "relative", zIndex: 2 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(255,255,255,0.1)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: "20px", padding: "6px 16px", marginBottom: "24px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#4ade80", display: "inline-block", flexShrink: 0 }} />
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2px", color: "rgba(255,255,255,0.8)" }}>{hero.badge}</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 800, color: "#fff", lineHeight: 1.1, marginBottom: "22px", whiteSpace: "pre-line" }}>
            {hero.headline}
          </h1>
          <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.7)", lineHeight: 1.75, marginBottom: "40px", maxWidth: "480px" }}>
            {hero.subtext}
          </p>
          <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
            <Link to="/plots" style={{ background: ACCENT, color: "#fff", padding: "15px 32px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 24px rgba(122,92,46,0.5)" }}>
              {hero.cta1} →
            </Link>
            <a href="#contact" style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,0.22)", padding: "15px 32px", borderRadius: "10px", fontWeight: 500, fontSize: "15px" }}>
              {hero.cta2}
            </a>
          </div>
        </div>
      </section>

      {/* WHY NEEV */}
      <section style={{ background: "#fff", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p className="section-label">WHY NEEV ESTATE</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, color: "#1a1208" }}>Land investment, made simple</h2>
          </div>
          <div className="why-grid">
            {WHY.map((w, i) => (
              <div key={i} style={{ padding: "32px 28px", borderRadius: "16px", border: "1px solid #ede5db", background: "#faf7f3" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "12px", background: ACCENT, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", color: "#fff", marginBottom: "18px" }}>{w.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "17px", fontWeight: 700, color: "#1a1208", marginBottom: "10px" }}>{w.title}</h3>
                <p style={{ fontSize: "14px", color: "#7a6655", lineHeight: 1.7 }}>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED PLOTS */}
      <section style={{ background: "#f7f3ee", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
            <div>
              <p className="section-label">FEATURED PLOTS</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, color: "#1a1208" }}>Land worth investing in</h2>
            </div>
            <Link to="/plots" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontWeight: 600, color: ACCENT, border: "1.5px solid #c8bdb4", padding: "10px 22px", borderRadius: "8px", background: "#fff" }}>
              View all plots →
            </Link>
          </div>
          <div className="plots-grid">
            {plots.map(p => <PlotCard key={p.id} property={p} />)}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section style={{ background: "#fff", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className="about-grid">
            <div>
              <p className="section-label">ABOUT NEEV ESTATE</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,42px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "20px", color: "#1a1208" }}>
                Rooted in Andhra,<br />built on trust
              </h2>
              <p style={{ fontSize: "16px", color: "#5a4a3a", lineHeight: 1.85, marginBottom: "14px" }}>
                <strong>Neev Estate</strong> is an Andhra Pradesh based land developer focused on open plots, gated layouts, and farm lands across the state's fastest-growing corridors.
              </p>
              <p style={{ fontSize: "16px", color: "#5a4a3a", lineHeight: 1.85, marginBottom: "36px" }}>
                We handle land sourcing, DTCP approvals, and end-to-end registration so you invest with complete confidence.
              </p>
              <div style={{ display: "flex", gap: "40px", flexWrap: "wrap", paddingTop: "28px", borderTop: "1px solid #e8ddd3" }}>
                {[{ value: "10+", label: "Layouts in AP" }, { value: "1,200+", label: "Plots sold" }, { value: "100%", label: "Clear titles" }].map(s => (
                  <div key={s.label}>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, color: ACCENT }}>{s.value}</p>
                    <p style={{ fontSize: "13px", color: "#7a6655", marginTop: "2px" }}>{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: "20px", overflow: "hidden", height: "460px", boxShadow: "0 24px 64px rgba(0,0,0,0.12)" }}>
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80" alt="Andhra Pradesh land" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "#f7f3ee", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "52px" }}>
            <p className="section-label">CLIENT STORIES</p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(24px,3vw,40px)", fontWeight: 700, color: "#1a1208" }}>What our buyers say</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: "24px" }}>
            {[
              { quote: "Booked two plots in Neev Greens near Amaravati. Clear title, gated layout, and the registration was seamless.", name: "Ravi Teja", role: "Investor, Vijayawada" },
              { quote: "Neev Estate helped my family buy farm land near Tirupati. Honest pricing and great post-sale support.", name: "Lakshmi Prasanna", role: "Buyer, Tirupati" },
              { quote: "Very professional team. They handled all the DTCP documentation without any hassle. Highly recommend.", name: "Suresh Babu", role: "Investor, Nellore" },
            ].map(t => (
              <div key={t.name} style={{ background: "#fff", padding: "32px 28px", borderRadius: "16px", border: "1px solid #ede5db" }}>
                <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                  {[...Array(5)].map((_, i) => <span key={i} style={{ color: "#f59e0b", fontSize: "16px" }}>★</span>)}
                </div>
                <p style={{ fontSize: "15px", color: "#4a3728", lineHeight: 1.8, marginBottom: "24px", fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ borderTop: "1px solid #f0e8df", paddingTop: "16px" }}>
                  <p style={{ fontWeight: 700, fontSize: "14px", color: "#1a1208" }}>{t.name}</p>
                  <p style={{ fontSize: "13px", color: "#9a8070", marginTop: "2px" }}>{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" style={{ background: "#fff", padding: "80px 32px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div style={{ background: `linear-gradient(135deg, #1a1208 0%, #3d2810 60%, ${ACCENT} 100%)`, borderRadius: "24px", padding: "72px 48px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "320px", height: "320px", borderRadius: "50%", background: "rgba(255,255,255,0.04)" }} />
            <div style={{ textAlign: "center", marginBottom: "52px", position: "relative" }}>
              <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.4)", marginBottom: "16px" }}>GET IN TOUCH</p>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(26px,4vw,48px)", fontWeight: 800, color: "#fff", lineHeight: 1.2, marginBottom: "16px" }}>
                Ready to own land in<br />Andhra Pradesh?
              </h2>
              <p style={{ color: "rgba(255,255,255,0.65)", fontSize: "17px" }}>Talk to our team for current availability, pricing, and a free site visit.</p>
            </div>
            <div className="contact-grid" style={{ position: "relative" }}>
              {[
                { label: "Contact", value: "N. Sreedhar" },
                { label: "Mobile", value: "+91 93471 02038", sub: "0861-4057247", href: "tel:+919347102038" },
                { label: "Email", value: "sreedharn7@gmail.com", href: "mailto:sreedharn7@gmail.com" },
                { label: "Address", value: "Haranathpuram 1st Line,\nOpp Manasa Hotel, Nellore" },
              ].map(c => (
                <div key={c.label} style={{ background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "14px", padding: "22px 24px" }}>
                  <p style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "2px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", marginBottom: "8px" }}>{c.label}</p>
                  {c.href
                    ? <a href={c.href} style={{ color: "#fff", fontWeight: 600, fontSize: "15px", display: "block" }}>{c.value}</a>
                    : <p style={{ color: "#fff", fontWeight: 600, fontSize: "15px", whiteSpace: "pre-line" }}>{c.value}</p>}
                  {c.sub && <a href="tel:08614057247" style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", marginTop: "4px", display: "block" }}>{c.sub}</a>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
