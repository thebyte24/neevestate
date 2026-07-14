import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const ACCENT = "#7a5c2e";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const transparent = isHome && !scrolled && !menuOpen;

  return (
    <>
      <style>{`
        .nav-link { font-size: 14px; font-weight: 500; padding: 4px 0; transition: color 0.2s; position: relative; }
        .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; right:0; height:2px; background:${ACCENT}; transform:scaleX(0); transition:transform 0.2s; border-radius:2px; }
        .nav-link:hover::after, .nav-link.active::after { transform:scaleX(1); }
        @media (max-width: 768px) { .nav-links-desktop { display: none !important; } .hamburger { display: flex !important; } }
      `}</style>

      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        height: "68px", display: "flex", alignItems: "center",
        justifyContent: "space-between", padding: "0 32px",
        background: transparent ? "transparent" : "#fff",
        borderBottom: transparent ? "none" : "1px solid #e8ddd3",
        boxShadow: transparent ? "none" : "0 2px 20px rgba(0,0,0,0.06)",
        transition: "background 0.3s, box-shadow 0.3s, border 0.3s",
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: "2px" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "22px", color: transparent ? "#fff" : "#1a1208" }}>Neev</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: "22px", color: transparent ? "rgba(255,255,255,0.75)" : ACCENT }}> Estate</span>
        </Link>

        {/* Desktop nav */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: "32px", alignItems: "center" }}>
          {[["Plots", "/plots"], ["Services", "/services"], ["About", "/about"]].map(([label, to]) => (
            <Link key={to} to={to} className={`nav-link${pathname === to ? " active" : ""}`}
              style={{ color: transparent ? "rgba(255,255,255,0.85)" : pathname === to ? ACCENT : "#4a3728" }}>
              {label}
            </Link>
          ))}
          <a href="/#contact" className="nav-link" style={{ color: transparent ? "rgba(255,255,255,0.85)" : "#4a3728" }}>Contact</a>
        </div>

        {/* Right */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => setEnquireOpen(true)} style={{
            background: ACCENT, color: "#fff", border: "none",
            padding: "10px 20px", borderRadius: "8px",
            fontWeight: 600, fontSize: "13px", letterSpacing: "0.3px",
            boxShadow: "0 2px 12px rgba(122,92,46,0.35)",
          }}>
            Enquire Now
          </button>
          <button onClick={() => navigate("/admin")} title="Admin" aria-label="Admin Panel"
            style={{ background: "transparent", border: `1px solid ${transparent ? "rgba(255,255,255,0.3)" : "#e8ddd3"}`, borderRadius: "8px", padding: "8px 10px", cursor: "pointer", color: transparent ? "rgba(255,255,255,0.7)" : "#7a6655", display: "flex", alignItems: "center" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>
          </button>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Toggle menu"
            style={{ background: "transparent", border: "none", padding: "6px", color: transparent ? "#fff" : "#4a3728", display: "none", alignItems: "center" }}>
            {menuOpen
              ? <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
            }
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      {menuOpen && (
        <div style={{ position: "fixed", top: "68px", left: 0, right: 0, background: "#fff", borderBottom: "1px solid #e8ddd3", padding: "20px 24px", display: "flex", flexDirection: "column", gap: "18px", zIndex: 199, boxShadow: "0 8px 24px rgba(0,0,0,0.1)" }}>
          {[["Plots", "/plots"], ["Services", "/services"], ["About", "/about"]].map(([label, to]) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              style={{ fontSize: "16px", fontWeight: 500, color: pathname === to ? ACCENT : "#4a3728" }}>
              {label}
            </Link>
          ))}
          <a href="/#contact" onClick={() => setMenuOpen(false)} style={{ fontSize: "16px", fontWeight: 500, color: "#4a3728" }}>Contact</a>
        </div>
      )}

      {/* Enquiry modal */}
      {enquireOpen && (
        <div onClick={() => setEnquireOpen(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "16px" }}>
          <div onClick={e => e.stopPropagation()}
            style={{ background: "#fff", borderRadius: "20px", padding: "36px", width: "100%", maxWidth: "420px", boxShadow: "0 24px 80px rgba(0,0,0,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", color: "#1a1208" }}>Book a Site Visit</h2>
              <button onClick={() => setEnquireOpen(false)} style={{ background: "#f5f5f5", border: "none", borderRadius: "50%", width: "32px", height: "32px", fontSize: "16px", cursor: "pointer", color: "#666" }}>✕</button>
            </div>
            <p style={{ color: "#7a6655", fontSize: "14px", marginBottom: "24px" }}>We'll reach out within minutes.</p>
            <EnquireForm onClose={() => setEnquireOpen(false)} />
          </div>
        </div>
      )}

      {/* Spacer so content doesn't hide under fixed nav */}
      {!isHome && <div style={{ height: "68px" }} />}
    </>
  );
}

function EnquireForm({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", city: "" });
  const set = (k) => (e) => setForm(p => ({ ...p, [k]: e.target.value }));

  const inp = {
    width: "100%", padding: "12px 14px", borderRadius: "10px",
    border: "1px solid #e8ddd3", fontSize: "14px", outline: "none",
    marginBottom: "12px", background: "#faf7f3", boxSizing: "border-box",
    transition: "border 0.2s",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name}. I'm interested in plots in ${form.city || "Andhra Pradesh"}. My phone: ${form.phone}`;
    window.open(`https://wa.me/919347102038?text=${encodeURIComponent(msg)}`, "_blank");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Your name" required value={form.name} onChange={set("name")} style={inp} />
      <input placeholder="Phone number" required type="tel" value={form.phone} onChange={set("phone")} style={inp} />
      <input placeholder="City / area of interest" value={form.city} onChange={set("city")} style={inp} />
      <button type="submit" style={{ width: "100%", background: "#25d366", color: "#fff", border: "none", padding: "13px", borderRadius: "10px", fontWeight: 700, fontSize: "15px", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
        <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor"><path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.505L4 29l7.697-1.812A12.94 12.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm-3.293 5.5c-.2 0-.524.075-.8.375-.276.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.1 3.225 5.125 4.4.715.275 1.275.44 1.71.565.718.2 1.373.173 1.89.105.576-.075 1.775-.726 2.025-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35-.3-.15-1.775-.876-2.05-.975-.275-.1-.475-.15-.675.15-.2.3-.776.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.41-1.487-.89-.794-1.492-1.774-1.667-2.074-.175-.3-.019-.463.131-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.225-.243-.583-.49-.504-.675-.513l-.575-.01z"/></svg>
        Send via WhatsApp
      </button>
    </form>
  );
}
