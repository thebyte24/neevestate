import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

const ACCENT = "#7a5c2e";
const BG = "#faf7f3";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [enquireOpen, setEnquireOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (label, to) => (
    <Link
      to={to}
      onClick={() => setMenuOpen(false)}
      style={{
        fontSize: "14px", fontWeight: 500,
        color: pathname === to ? ACCENT : "#4a3728",
        padding: "4px 2px",
        borderBottom: pathname === to ? `2px solid ${ACCENT}` : "2px solid transparent",
      }}
    >
      {label}
    </Link>
  );

  return (
    <>
      <nav style={{
        background: BG, borderBottom: "1px solid #e8ddd3",
        padding: "0 20px", height: "60px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "20px", color: "#2c1a0e" }}>Neev</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "20px", color: ACCENT }}> Estate</span>
        </Link>

        {/* Desktop Links */}
        <div className="nav-links" style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {navLink("Plots", "/plots")}
          {navLink("Services", "/services")}
          {navLink("About", "/about")}
          <a href="/#contact" style={{ fontSize: "14px", fontWeight: 500, color: "#4a3728" }}>Contact</a>
        </div>

        {/* Right side: Enquire + Admin + Hamburger */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button
            onClick={() => setEnquireOpen(true)}
            style={{
              background: ACCENT, color: "#fff", border: "none",
              padding: "9px 18px", borderRadius: "6px",
              fontWeight: 600, fontSize: "14px", cursor: "pointer",
            }}
          >
            Enquire now
          </button>

          {/* Admin icon */}
          <button
            onClick={() => navigate("/admin")}
            title="Admin Panel"
            aria-label="Admin Panel"
            style={{
              background: "transparent", border: "1px solid #e8ddd3",
              borderRadius: "6px", padding: "7px 9px", cursor: "pointer",
              color: "#7a6655", display: "flex", alignItems: "center",
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </button>

          {/* Hamburger (mobile) */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
            style={{
              background: "transparent", border: "none", cursor: "pointer",
              padding: "6px", color: "#4a3728", display: "none",
            }}
          >
            {menuOpen ? (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            ) : (
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          background: BG, borderBottom: "1px solid #e8ddd3",
          padding: "16px 20px", display: "flex", flexDirection: "column", gap: "16px",
          position: "sticky", top: "60px", zIndex: 99,
        }}>
          {[["Plots", "/plots"], ["Services", "/services"], ["About", "/about"]].map(([label, to]) => (
            <Link key={to} to={to} onClick={() => setMenuOpen(false)}
              style={{ fontSize: "15px", fontWeight: 500, color: pathname === to ? ACCENT : "#4a3728" }}>
              {label}
            </Link>
          ))}
          <a href="/#contact" onClick={() => setMenuOpen(false)} style={{ fontSize: "15px", fontWeight: 500, color: "#4a3728" }}>Contact</a>
        </div>
      )}

      {/* Enquiry Modal */}
      {enquireOpen && (
        <div
          onClick={() => setEnquireOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
            zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
            padding: "16px",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: "16px", padding: "32px",
              width: "100%", maxWidth: "440px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px" }}>Book a Site Visit</h2>
              <button onClick={() => setEnquireOpen(false)} style={{ background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#7a6655" }}>✕</button>
            </div>
            <p style={{ color: "#7a6655", fontSize: "14px", marginBottom: "24px" }}>
              Fill in your details — we'll send you directly to WhatsApp.
            </p>
            <EnquireForm onClose={() => setEnquireOpen(false)} />
          </div>
        </div>
      )}

      {/* Mobile responsive styles */}
      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .hamburger { display: flex !important; }
        }
      `}</style>
    </>
  );
}

function EnquireForm({ onClose }) {
  const [form, setForm] = useState({ name: "", phone: "", city: "" });
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: "8px",
    border: "1px solid #ddd6ce", fontSize: "14px", outline: "none",
    marginBottom: "12px", background: "#faf7f3", boxSizing: "border-box",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hi, I'm ${form.name}. I'm interested in plots in ${form.city || "Andhra Pradesh"}. My phone: ${form.phone}`;
    const url = `https://wa.me/919347102038?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Your name" required value={form.name} onChange={set("name")} style={inputStyle} />
      <input placeholder="Phone number" required type="tel" value={form.phone} onChange={set("phone")} style={inputStyle} />
      <input placeholder="City / Interest area" value={form.city} onChange={set("city")} style={inputStyle} />
      <button
        type="submit"
        style={{
          width: "100%", background: ACCENT, color: "#fff", border: "none",
          padding: "12px", borderRadius: "8px", fontWeight: 600, fontSize: "15px",
          marginTop: "4px", cursor: "pointer", display: "flex", alignItems: "center",
          justifyContent: "center", gap: "8px",
        }}
      >
        <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.505L4 29l7.697-1.812A12.94 12.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm-3.293 5.5c-.2 0-.524.075-.8.375-.276.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.1 3.225 5.125 4.4.715.275 1.275.44 1.71.565.718.2 1.373.173 1.89.105.576-.075 1.775-.726 2.025-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35-.3-.15-1.775-.876-2.05-.975-.275-.1-.475-.15-.675.15-.2.3-.776.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.41-1.487-.89-.794-1.492-1.774-1.667-2.074-.175-.3-.019-.463.131-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.225-.243-.583-.49-.504-.675-.513l-.575-.01z" />
        </svg>
        Send via WhatsApp
      </button>
    </form>
  );
}
