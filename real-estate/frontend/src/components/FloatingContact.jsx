export default function FloatingContact() {
  return (
    <div style={{
      position: "fixed", bottom: "28px", right: "24px",
      display: "flex", flexDirection: "column", gap: "12px",
      zIndex: 999,
    }}>
      {/* Call */}
      <a
        href="tel:+919347102038"
        aria-label="Call us"
        title="Call +91 93471 02038"
        style={{
          width: "52px", height: "52px", borderRadius: "50%",
          background: "#2c1a0e", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
          transition: "transform 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.6 3.42 2 2 0 0 1 3.58 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.8a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919347102038"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp us"
        title="WhatsApp +91 93471 02038"
        style={{
          width: "56px", height: "56px", borderRadius: "50%",
          background: "#25d366", color: "#fff",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 20px rgba(37,211,102,0.45)",
          transition: "transform 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
        onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
      >
        {/* WhatsApp SVG */}
        <svg width="28" height="28" viewBox="0 0 32 32" fill="currentColor">
          <path d="M16 3C9.373 3 4 8.373 4 15c0 2.385.668 4.61 1.832 6.505L4 29l7.697-1.812A12.94 12.94 0 0 0 16 28c6.627 0 12-5.373 12-12S22.627 3 16 3zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10a9.96 9.96 0 0 1-5.02-1.352l-.36-.214-4.57 1.075 1.1-4.453-.234-.373A9.953 9.953 0 0 1 6 15c0-5.514 4.486-10 10-10zm-3.293 5.5c-.2 0-.524.075-.8.375-.276.3-1.05 1.025-1.05 2.5s1.075 2.9 1.225 3.1c.15.2 2.1 3.225 5.125 4.4.715.275 1.275.44 1.71.565.718.2 1.373.173 1.89.105.576-.075 1.775-.726 2.025-1.426.25-.7.25-1.3.175-1.425-.075-.125-.275-.2-.575-.35-.3-.15-1.775-.876-2.05-.975-.275-.1-.475-.15-.675.15-.2.3-.776.975-.95 1.175-.175.2-.35.225-.65.075-.3-.15-1.266-.467-2.41-1.487-.89-.794-1.492-1.774-1.667-2.074-.175-.3-.019-.463.131-.612.135-.135.3-.35.45-.525.15-.175.2-.3.3-.5.1-.2.05-.375-.025-.525-.075-.15-.675-1.626-.925-2.225-.243-.583-.49-.504-.675-.513l-.575-.01z" />
        </svg>
      </a>
    </div>
  );
}
