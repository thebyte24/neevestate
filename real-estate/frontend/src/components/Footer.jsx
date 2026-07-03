const ACCENT = "#7a5c2e";

export default function Footer() {
  return (
    <footer style={{ background: "#faf7f3", borderTop: "1px solid #e8ddd3" }}>
      {/* Main footer */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "52px 32px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: "48px", flexWrap: "wrap" }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "baseline", gap: "1px", marginBottom: "14px" }}>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "20px", color: "#2c1a0e" }}>Neev</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "20px", color: ACCENT }}> Estate</span>
            </div>
            <p style={{ fontSize: "14px", color: "#7a6655", lineHeight: 1.7, maxWidth: "280px" }}>
              Premium open plots and farm lands across Andhra Pradesh. Clear titles, gated layouts, and honest guidance.
            </p>
          </div>

          {/* Explore */}
          <div>
            <p style={{ fontWeight: 600, fontSize: "13px", color: "#4a3728", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "16px" }}>
              Explore
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {["Plots", "Services", "About", "Contact"].map((label) => (
                <a key={label} href={label === "Plots" ? "/plots" : `#${label.toLowerCase()}`}
                  style={{ fontSize: "14px", color: "#7a6655" }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Connect */}
          <div>
            <p style={{ fontWeight: 600, fontSize: "13px", color: "#4a3728", letterSpacing: "0.8px", textTransform: "uppercase", marginBottom: "16px" }}>
              Connect
            </p>
            <div style={{ display: "flex", gap: "14px" }}>
              {/* Instagram */}
              <a href="#" aria-label="Instagram" style={{ color: "#7a6655" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                </svg>
              </a>
              {/* Twitter/X */}
              <a href="#" aria-label="Twitter" style={{ color: "#7a6655" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53A4.48 4.48 0 0 0 22.43.36a9 9 0 0 1-2.88 1.1A4.52 4.52 0 0 0 16.11 0c-2.5 0-4.52 2.02-4.52 4.52 0 .35.04.7.11 1.03C7.69 5.37 4.07 3.58 1.64.9a4.52 4.52 0 0 0-.61 2.27c0 1.57.8 2.95 2.01 3.76A4.49 4.49 0 0 1 .96 6.4v.06c0 2.19 1.56 4.02 3.63 4.43a4.54 4.54 0 0 1-2.04.08c.57 1.79 2.24 3.09 4.21 3.12A9.07 9.07 0 0 1 0 15.54a12.8 12.8 0 0 0 6.92 2.03c8.3 0 12.85-6.88 12.85-12.85 0-.2 0-.39-.01-.58A9.17 9.17 0 0 0 23 3z" />
                </svg>
              </a>
              {/* LinkedIn */}
              <a href="#" aria-label="LinkedIn" style={{ color: "#7a6655" }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: "1px solid #e8ddd3", padding: "16px 32px", textAlign: "center" }}>
        <p style={{ fontSize: "13px", color: "#a08c78" }}>
          © 2026 Neev Estate. All rights reserved. Andhra Pradesh, India.
        </p>
      </div>
    </footer>
  );
}
