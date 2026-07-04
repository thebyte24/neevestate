import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const ACCENT = "#7a5c2e";
const BG = "#faf7f3";

export default function Navbar() {
  const { pathname } = useLocation();
  const [enquireOpen, setEnquireOpen] = useState(false);

  const navLink = (label, to) => (
    <Link
      to={to}
      style={{
        fontSize: "14px",
        fontWeight: 500,
        color: pathname === to ? ACCENT : "#4a3728",
        padding: "4px 2px",
        borderBottom: pathname === to ? `2px solid ${ACCENT}` : "2px solid transparent",
        transition: "color 0.2s",
      }}
    >
      {label}
    </Link>
  );

  return (
    <>
      <nav
        style={{
          background: BG,
          borderBottom: "1px solid #e8ddd3",
          padding: "0 32px",
          height: "60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ display: "flex", alignItems: "baseline", gap: "1px" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "20px", color: "#2c1a0e" }}>
            Neev
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "20px", color: ACCENT }}>
            {" "}Estate
          </span>
        </Link>

        {/* Links */}
        <div style={{ display: "flex", gap: "28px", alignItems: "center" }}>
          {navLink("Plots", "/plots")}
          {navLink("Services", "/services")}
          {navLink("About", "/about")}
          <a href="/#contact" style={{ fontSize: "14px", fontWeight: 500, color: "#4a3728" }}>Contact</a>
        </div>

        {/* CTA */}
        <button
          onClick={() => setEnquireOpen(true)}
          style={{
            background: ACCENT,
            color: "#fff",
            border: "none",
            padding: "9px 22px",
            borderRadius: "6px",
            fontWeight: 600,
            fontSize: "14px",
            letterSpacing: "0.2px",
          }}
        >
          Enquire now
        </button>
      </nav>

      {/* Enquiry Modal */}
      {enquireOpen && (
        <div
          onClick={() => setEnquireOpen(false)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
            zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "#fff", borderRadius: "16px", padding: "36px",
              width: "100%", maxWidth: "440px", boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
            }}
          >
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "22px", marginBottom: "6px" }}>
              Book a Site Visit
            </h2>
            <p style={{ color: "#7a6655", fontSize: "14px", marginBottom: "24px" }}>
              Our team will call you within 24 hours.
            </p>
            <EnquireForm onClose={() => setEnquireOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
}

function EnquireForm({ onClose }) {
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", city: "" });
  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  const inputStyle = {
    width: "100%", padding: "11px 14px", borderRadius: "8px",
    border: "1px solid #ddd6ce", fontSize: "14px", outline: "none",
    marginBottom: "12px", background: "#faf7f3",
  };

  if (done) return (
    <div style={{ textAlign: "center", padding: "20px 0" }}>
      <div style={{ fontSize: "44px", marginBottom: "12px" }}>✅</div>
      <p style={{ fontWeight: 600, marginBottom: "6px" }}>We'll be in touch!</p>
      <p style={{ color: "#7a6655", fontSize: "14px", marginBottom: "20px" }}>Expect a call within 24 hours.</p>
      <button onClick={onClose} style={{ color: ACCENT, background: "none", border: "none", fontWeight: 600 }}>Close</button>
    </div>
  );

  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
      <input placeholder="Your name" required value={form.name} onChange={set("name")} style={inputStyle} />
      <input placeholder="Phone number" required type="tel" value={form.phone} onChange={set("phone")} style={inputStyle} />
      <input placeholder="City / Interest area" value={form.city} onChange={set("city")} style={inputStyle} />
      <button
        type="submit"
        style={{
          width: "100%", background: ACCENT, color: "#fff", border: "none",
          padding: "12px", borderRadius: "8px", fontWeight: 600, fontSize: "15px", marginTop: "4px",
        }}
      >
        Submit
      </button>
    </form>
  );
}
