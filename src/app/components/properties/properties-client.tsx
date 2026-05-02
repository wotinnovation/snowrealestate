"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { snowProperties, SnowProperty } from "../../data/snow-properties";
import GridProperty from "../property/grid-property";

// Normalise URL param → canonical tab label (case-insensitive)
function normalizeStatus(raw: string | null): string {
  if (!raw) return "All Status";
  const lower = raw.toLowerCase();
  if (lower === "for rent" || lower === "rent") return "For Rent";
  if (lower === "for sale" || lower === "sale") return "For Sale";
  return "All Status";
}

type SortKey = "default" | "price-desc" | "price-asc" | "newest" | "oldest";

export default function PropertiesClient() {
  const searchParams = useSearchParams();

  // ── Filter States — initialised from URL params ──
  const [activeTab, setActiveTab] = useState(normalizeStatus(searchParams.get("status")));
  const [lookingFor, setLookingFor] = useState(searchParams.get("type") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [bedrooms, setBedrooms] = useState(searchParams.get("bedrooms") || "");
  const [budget, setBudget] = useState(searchParams.get("budget") || "");
  const [sortKey, setSortKey] = useState<SortKey>("default");
  const [results, setResults] = useState<SnowProperty[]>(snowProperties);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Sync state with URL whenever searchParams change (hero form navigation)
  useEffect(() => {
    setActiveTab(normalizeStatus(searchParams.get("status")));
    setLookingFor(searchParams.get("type") || "");
    setLocation(searchParams.get("location") || "");
    setBedrooms(searchParams.get("bedrooms") || "");
    setBudget(searchParams.get("budget") || "");
  }, [searchParams]);

  // Prevent body scroll when mobile filter is open
  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);


  const tabs = ["All Status", "For Rent", "For Sale"];

  // ── Filtering logic ──
  useEffect(() => {
    let filtered = [...snowProperties];

    if (activeTab !== "All Status") {
      filtered = filtered.filter(
        (p) => p.status.trim().toLowerCase() === activeTab.trim().toLowerCase()
      );
    }
    if (lookingFor) {
      filtered = filtered.filter((p) => p.type === lookingFor);
    }
    if (location) {
      filtered = filtered.filter(
        (p) =>
          p.location.toLowerCase() === location.toLowerCase() ||
          p.city.toLowerCase() === location.toLowerCase()
      );
    }
    if (bedrooms) {
      filtered = filtered.filter(
        (p) => p.bedrooms.includes(bedrooms) || (bedrooms === "4+ Bedrooms" && p.beds >= 4)
      );
    }
    if (budget) {
      const max =
        budget === "AED 500,000" ? 500_000 :
          budget === "AED 1,000,000" ? 1_000_000 :
            budget === "AED 2,000,000" ? 2_000_000 :
              budget === "AED 5,000,000" ? 5_000_000 : Infinity;
      filtered = filtered.filter((p) => p.price <= max);
    }

    // ── Sort ──
    if (sortKey === "price-desc") filtered.sort((a, b) => b.price - a.price);
    else if (sortKey === "price-asc") filtered.sort((a, b) => a.price - b.price);
    else if (sortKey === "newest") filtered.sort((a, b) => Number(b.yearBuilt) - Number(a.yearBuilt));
    else if (sortKey === "oldest") filtered.sort((a, b) => Number(a.yearBuilt) - Number(b.yearBuilt));

    setResults(filtered);
  }, [activeTab, lookingFor, location, bedrooms, budget, sortKey]);

  // ── Compute active chip list for display ──
  const activeFilters: { label: string; clear: () => void }[] = [];
  if (activeTab !== "All Status") activeFilters.push({ label: activeTab, clear: () => setActiveTab("All Status") });
  if (lookingFor) activeFilters.push({ label: lookingFor, clear: () => setLookingFor("") });
  if (location) activeFilters.push({ label: location, clear: () => setLocation("") });
  if (bedrooms) activeFilters.push({ label: bedrooms, clear: () => setBedrooms("") });
  if (budget) activeFilters.push({ label: budget, clear: () => setBudget("") });

  const clearAll = () => {
    setActiveTab("All Status");
    setLookingFor("");
    setLocation("");
    setBedrooms("");
    setBudget("");
  };

  return (
    <div className="properties-container">
      {/* Mobile Filter Backdrop */}
      <div
        className={`filter-backdrop ${isFilterOpen ? 'show' : ''}`}
        onClick={() => setIsFilterOpen(false)}
      />

      <div className="row">

        {/* ── LEFT SIDEBAR (Filters) ── */}
        <div className={`col-lg-3 filter-sidebar-mobile ${isFilterOpen ? 'open' : ''}`}>
          <div className="simple-sidebar sm-sidebar d-block" style={{ position: "sticky", top: "100px", zIndex: 10 }}>
            <div
              className="sidebar-widgets p-4 rounded-4"
              style={{ background: "#fff", border: "1px solid #eee", boxShadow: "0 4px 20px rgba(0,0,0,0.05)", height: "100%" }}
            >
              {/* Mobile Header */}
              <div className="d-lg-none d-flex align-items-center justify-content-between mb-4 pb-3 border-bottom">
                <h5 className="m-0" style={{ fontWeight: 700, color: "#1a1a2e" }}>Filters</h5>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  style={{
                    background: '#f8f9fa',
                    border: 'none',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#1a1a2e',
                    transition: 'all 0.2s'
                  }}
                  aria-label="Close filters"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>

              {/* Header with active count badge */}
              <h4 className="mb-4 d-flex align-items-center justify-content-between" style={{ fontSize: "18px", fontWeight: 700, color: "#1a1a2e" }}>
                <span>
                  <i className="fa-solid fa-sliders" style={{ color: "#caab4d", marginRight: "8px" }} />
                  Filter Properties
                </span>
                {activeFilters.length > 0 && (
                  <span style={{
                    background: "#caab4d",
                    color: "#fff",
                    borderRadius: "20px",
                    padding: "2px 10px",
                    fontSize: "12px",
                    fontWeight: 700,
                    minWidth: "26px",
                    textAlign: "center",
                  }}>
                    {activeFilters.length}
                  </span>
                )}
              </h4>

              {/* ── STATUS tabs ── */}
              <div className="form-group mb-4">
                <label style={labelStyle}>STATUS</label>
                <div style={{ display: "flex", gap: "6px", background: "#f0f0f0", padding: "5px", borderRadius: "10px" }}>
                  {tabs.map((tab) => {
                    const isActive = activeTab === tab;
                    return (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        style={{
                          flex: 1,
                          padding: "9px 4px",
                          fontSize: "12px",
                          fontWeight: isActive ? 700 : 500,
                          border: "none",
                          borderRadius: "7px",
                          cursor: "pointer",
                          background: isActive ? "#caab4d" : "transparent",
                          color: isActive ? "#fff" : "#777",
                          boxShadow: isActive ? "0 3px 10px rgba(202,171,77,0.35)" : "none",
                          transition: "all 0.2s ease",
                          letterSpacing: "0.2px",
                        }}
                      >
                        {tab}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── PROPERTY TYPE ── */}
              <div className="form-group mb-4">
                <label style={labelStyle}>PROPERTY TYPE</label>
                <select
                  value={lookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
                  style={{ ...selectStyle, borderColor: lookingFor ? "#caab4d" : "#e5e5e5", boxShadow: lookingFor ? "0 0 0 3px rgba(202,171,77,0.12)" : "none" }}
                >
                  <option value="">All Types</option>
                  {["Apartment", "Villa", "Penthouse", "Studio", "Office", "Townhouse"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* ── LOCATION ── */}
              <div className="form-group mb-4">
                <label style={labelStyle}>LOCATION</label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  style={{ ...selectStyle, borderColor: location ? "#caab4d" : "#e5e5e5", boxShadow: location ? "0 0 0 3px rgba(202,171,77,0.12)" : "none" }}
                >
                  <option value="">All Cities</option>
                  {["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay", "Jumeirah Beach Residence", "Arabian Ranches", "DIFC", "Dubai Creek Harbour", "Emirates Hills", "JVC", "Dubai Hills Estate"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* ── BEDROOMS ── */}
              <div className="form-group mb-4">
                <label style={labelStyle}>BEDROOMS</label>
                <select
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e.target.value)}
                  style={{ ...selectStyle, borderColor: bedrooms ? "#caab4d" : "#e5e5e5", boxShadow: bedrooms ? "0 0 0 3px rgba(202,171,77,0.12)" : "none" }}
                >
                  <option value="">Any Size</option>
                  {["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* ── MAX BUDGET ── */}
              <div className="form-group mb-4">
                <label style={labelStyle}>MAX BUDGET</label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  style={{ ...selectStyle, borderColor: budget ? "#caab4d" : "#e5e5e5", boxShadow: budget ? "0 0 0 3px rgba(202,171,77,0.12)" : "none" }}
                >
                  <option value="">No Limit</option>
                  {["AED 500,000", "AED 1,000,000", "AED 2,000,000", "AED 5,000,000", "AED 10,000,000+"].map((o) => (
                    <option key={o} value={o}>{o}</option>
                  ))}
                </select>
              </div>

              {/* ── Clear Filters ── */}
              <button
                onClick={clearAll}
                disabled={activeFilters.length === 0}
                style={{
                  width: "100%",
                  padding: "12px",
                  background: activeFilters.length > 0 ? "#fff5e0" : "transparent",
                  color: activeFilters.length > 0 ? "#caab4d" : "#bbb",
                  border: activeFilters.length > 0 ? "1px solid #caab4d" : "1px dashed #ddd",
                  borderRadius: "8px",
                  fontWeight: 600,
                  fontSize: "14px",
                  cursor: activeFilters.length > 0 ? "pointer" : "default",
                  transition: "all 0.2s",
                }}
              >
                {activeFilters.length > 0 ? `✕  Clear ${activeFilters.length} Filter${activeFilters.length > 1 ? "s" : ""}` : "No Active Filters"}
              </button>
            </div>
          </div>
        </div>

        {/* ── RIGHT COLUMN (Results) ── */}
        <div className="col-lg-9 col-md-12 col-sm-12">

          {/* Results header + active chip row */}
          {/* ── Results bar: count (left) + sort (right) ── */}
          <div
            className="mb-2"
            style={{
              padding: "14px 20px",
              background: "#fff",
              borderRadius: "10px",
              border: "1px solid #eee",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "nowrap", // Force side-by-side
              gap: "8px",
            }}
          >
            <h4 className="m-0 d-none d-md-block" style={{ fontSize: "16px", fontWeight: 600, color: "#444" }}>
              Showing <span style={{ color: "#caab4d", fontWeight: 800 }}>{results.length}</span> Propert{results.length === 1 ? "y" : "ies"}
            </h4>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsFilterOpen(true)}
              className="d-lg-none"
              style={{
                padding: "8px 16px",
                background: "#caab4d",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 4px 12px rgba(202,171,77,0.3)"
              }}
            >
              <i className="fa-solid fa-sliders" /> Filter
              {activeFilters.length > 0 && (
                <span style={{
                  background: "#fff",
                  color: "#caab4d",
                  borderRadius: "50%",
                  width: "18px",
                  height: "18px",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 800
                }}>
                  {activeFilters.length}
                </span>
              )}
            </button>


            {/* Sort dropdown */}
            <div style={{ display: "flex", alignItems: "center", gap: "6px", flexShrink: 1, minWidth: 0 }}>
              <span className="d-none d-sm-block" style={{ fontSize: "12px", color: "#999", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", whiteSpace: "nowrap" }}>Sort:</span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                style={{
                  padding: "7px 32px 7px 12px",
                  border: "1px solid #e5e5e5",
                  borderRadius: "8px",
                  fontSize: "13px",
                  color: "#1a1a2e",
                  outline: "none",
                  background: "#fafafa",
                  cursor: "pointer",
                  appearance: "none",
                  WebkitAppearance: "none",
                  fontWeight: 500,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23aaa' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "right 10px center",
                  flexShrink: 1,
                  minWidth: "120px",
                }}
              >
                <option value="default">Default</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>

          {/* ── Active filter chips row ── */}
          {activeFilters.length > 0 && (
            <div className="mb-3" style={{ display: "flex", flexWrap: "wrap", gap: "6px", alignItems: "center", padding: "4px 4px" }}>
              {activeFilters.map((f) => (
                <span
                  key={f.label}
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "5px",
                    background: "#fff8e8",
                    border: "1px solid #e8c96a",
                    color: "#8a6e1a",
                    borderRadius: "20px",
                    padding: "4px 12px",
                    fontSize: "12px",
                    fontWeight: 600,
                  }}
                >
                  {f.label}
                  <button
                    onClick={f.clear}
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                      color: "#caab4d",
                      fontWeight: 800,
                      fontSize: "14px",
                      lineHeight: 1,
                      padding: "0",
                      marginLeft: "2px",
                    }}
                    title={`Remove ${f.label} filter`}
                  >
                    ×
                  </button>
                </span>
              ))}
              <button
                onClick={clearAll}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#999",
                  fontSize: "12px",
                  fontWeight: 500,
                  textDecoration: "underline",
                  padding: "4px 6px",
                }}
              >
                Clear all
              </button>
            </div>
          )}

          {results.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0", background: "#fff", borderRadius: "12px", border: "1px solid #eee" }}>
              <div style={{ fontSize: "48px", marginBottom: "16px" }}>🏚️</div>
              <h5 style={{ fontWeight: 700, color: "#1a1a2e" }}>No properties found</h5>
              <p style={{ color: "#888" }}>Try adjusting your filters to see more results.</p>
              <button onClick={clearAll} style={{ marginTop: "12px", padding: "10px 28px", background: "#caab4d", color: "#fff", border: "none", borderRadius: "8px", fontWeight: 600, cursor: "pointer" }}>
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="row justify-content-center g-4">
              {results.map((property) => (
                <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={property.id}>
                  <GridProperty item={property} border={false} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "0.8px",
  textTransform: "uppercase",
  color: "#888",
  marginBottom: "8px",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  border: "1px solid #e5e5e5",
  borderRadius: "8px",
  fontSize: "14px",
  color: "#1a1a2e",
  outline: "none",
  background: "#fafafa",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  transition: "border-color 0.2s, box-shadow 0.2s",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23aaa' stroke-width='1.5' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 14px center",
};
