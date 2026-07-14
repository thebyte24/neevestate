import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import PlotCard from "../components/PlotCard";

const ACCENT = "#7a5c2e";

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allPlots, setAllPlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const city = searchParams.get("city") || "";
  const category = searchParams.get("category") || "";

  useEffect(() => {
    getDocs(collection(db, "properties")).then(snap => {
      setAllPlots(snap.docs.map(d => ({ id: d.id, ...d.data() })));
      setLoading(false);
    });
  }, []);

  const plots = allPlots.filter(p => {
    const cityMatch = !city || p.city?.toLowerCase().includes(city.toLowerCase());
    const catMatch = !category || p.category?.toLowerCase() === category.toLowerCase();
    return cityMatch && catMatch;
  });

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next);
  };

  return (
    <div style={{ background: "#fff", minHeight: "100vh" }}>
      {/* Page header */}
      <div style={{ background: "linear-gradient(135deg, #1a1208 0%, #3d2810 100%)", padding: "56px 32px 48px" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "3px", color: "rgba(255,255,255,0.4)", marginBottom: "12px" }}>BROWSE</p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 800, color: "#fff", marginBottom: "8px" }}>
            Available Plots & Lands
          </h1>
          <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "16px" }}>
            {loading ? "Loading..." : `${plots.length} plot${plots.length !== 1 ? "s" : ""} available`}
          </p>
        </div>
      </div>

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "36px 32px" }}>
        <style>{`
          .listings-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 28px; }
          @media (max-width: 1100px) { .listings-grid { grid-template-columns: repeat(2,1fr) !important; } }
          @media (max-width: 640px) { .listings-grid { grid-template-columns: 1fr !important; } }
        `}</style>

        {/* Filters */}
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "36px", alignItems: "center", padding: "16px 20px", background: "#f7f3ee", borderRadius: "12px", border: "1px solid #ede5db" }}>
          <span style={{ fontSize: "12px", fontWeight: 600, color: "#7a6655", marginRight: "4px" }}>Filter:</span>
          {[["All", ""], ["Open Plot", "Open Plot"], ["Gated Community", "Gated Community"], ["Farm Land", "Farm Land"]].map(([label, val]) => {
            const active = category === val;
            return (
              <button key={val} onClick={() => setFilter("category", val)}
                style={{ padding: "7px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: 500, border: `1.5px solid ${active ? ACCENT : "#c8bdb4"}`, background: active ? ACCENT : "#fff", color: active ? "#fff" : "#4a3728", cursor: "pointer", transition: "all 0.2s" }}>
                {label}
              </button>
            );
          })}
          <div style={{ marginLeft: "auto" }}>
            <select value={city} onChange={e => setFilter("city", e.target.value)}
              style={{ padding: "8px 16px", border: "1.5px solid #c8bdb4", borderRadius: "8px", background: "#fff", fontSize: "13px", color: "#4a3728", outline: "none", cursor: "pointer" }}>
              <option value="">All cities</option>
              {["Guntur", "Vijayawada", "Visakhapatnam", "Tirupati", "Eluru", "Nellore"].map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: "100px", color: "#7a6655" }}>
            <div style={{ fontSize: "32px", marginBottom: "12px" }}>🌾</div>
            Loading plots...
          </div>
        ) : plots.length === 0 ? (
          <div style={{ textAlign: "center", padding: "100px", color: "#7a6655" }}>
            <p style={{ fontSize: "48px", marginBottom: "16px" }}>🌾</p>
            <p style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px", color: "#2c1a0e" }}>No plots found</p>
            <p>Try changing the filters above.</p>
          </div>
        ) : (
          <div className="listings-grid">
            {plots.map(p => <PlotCard key={p.id} property={p} />)}
          </div>
        )}
      </div>
    </div>
  );
}
