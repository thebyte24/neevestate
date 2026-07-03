import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import PlotCard from "../components/PlotCard";

const ACCENT = "#7a5c2e";

export default function Listings() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [plots, setPlots] = useState([]);
  const [loading, setLoading] = useState(true);

  const city = searchParams.get("city") || "";
  const category = searchParams.get("category") || "";

  const fetchPlots = useCallback(() => {
    setLoading(true);
    const params = new URLSearchParams();
    if (city) params.set("city", city);
    if (category) params.set("category", category);

    fetch(`/api/properties?${params.toString()}`)
      .then((r) => r.json())
      .then((data) => { setPlots(data); setLoading(false); });
  }, [searchParams.toString()]);

  useEffect(() => { fetchPlots(); }, [fetchPlots]);

  const setFilter = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value) next.set(key, value); else next.delete(key);
    setSearchParams(next);
  };

  const chipStyle = (active) => ({
    padding: "7px 18px", borderRadius: "20px", fontSize: "13px", fontWeight: 500,
    border: `1px solid ${active ? ACCENT : "#c8bdb4"}`,
    background: active ? ACCENT : "#fff",
    color: active ? "#fff" : "#4a3728",
    cursor: "pointer",
  });

  return (
    <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "40px 32px" }}>
      <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", color: ACCENT, marginBottom: "6px" }}>
        ALL PLOTS
      </p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "32px", fontWeight: 700, marginBottom: "28px" }}>
        Available Plots & Lands
      </h1>

      {/* Filters */}
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px", alignItems: "center" }}>
        <button style={chipStyle(!category)} onClick={() => setFilter("category", "")}>All</button>
        {["Open Plot", "Gated Community", "Farm Land"].map((c) => (
          <button key={c} style={chipStyle(category === c)} onClick={() => setFilter("category", category === c ? "" : c)}>
            {c}
          </button>
        ))}

        <div style={{ marginLeft: "auto" }}>
          <select
            value={city}
            onChange={(e) => setFilter("city", e.target.value)}
            style={{
              padding: "8px 14px", border: "1px solid #c8bdb4", borderRadius: "6px",
              background: "#fff", fontSize: "13px", color: "#4a3728", outline: "none",
            }}
          >
            <option value="">All cities</option>
            {["Guntur", "Vijayawada", "Visakhapatnam", "Tirupati", "Eluru"].map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Count */}
      <p style={{ fontSize: "14px", color: "#7a6655", marginBottom: "24px" }}>
        {loading ? "Loading..." : `${plots.length} plot${plots.length !== 1 ? "s" : ""} found`}
      </p>

      {/* Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "80px", color: "#7a6655" }}>Loading plots...</div>
      ) : plots.length === 0 ? (
        <div style={{ textAlign: "center", padding: "80px", color: "#7a6655" }}>
          <p style={{ fontSize: "40px", marginBottom: "12px" }}>🌾</p>
          <p>No plots found for your selection. Try changing the filters.</p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(380px, 1fr))", gap: "28px" }}>
          {plots.map((p) => <PlotCard key={p.id} property={p} />)}
        </div>
      )}
    </div>
  );
}
