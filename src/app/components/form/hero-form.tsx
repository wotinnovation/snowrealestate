"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { snowProperties, SnowProperty } from "../../data/snow-properties";

export default function HeroForm() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("All Status");
  const [lookingFor, setLookingFor] = useState("");
  const [location, setLocation] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [budget, setBudget] = useState("");

  const tabs = ["All Status", "For Rent", "For Sale"];

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (activeTab && activeTab !== "All Status") params.append("status", activeTab);
    if (lookingFor) params.append("type", lookingFor);
    if (location) params.append("location", location);
    if (bedrooms) params.append("bedrooms", bedrooms);
    if (budget) params.append("budget", budget);

    router.push(`/properties?${params.toString()}`);
  };

  return (
    <>
      {/* ── Search Bar ── */}
      <div className="w-100 d-flex justify-content-center">
        <div
          style={{
            width: "100%",
            maxWidth: "100%",
            background: "#fff",
            borderRadius: "4px",
            boxShadow: "0 8px 48px rgba(0,0,0,0.18)",
            position: "relative",
            marginBottom: "0",
          }}
        >
          {/* Status Tabs */}
          <div 
            style={{ position: "absolute", right: "0", display: "flex" }}
            className="hero-tabs"
          >
            {tabs.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 28px",
                  fontSize: "14px",
                  fontWeight: activeTab === tab ? 600 : 500,
                  cursor: "pointer",
                  border: "none",
                  background: activeTab === tab ? "#fff" : "rgba(255,255,255,0.15)",
                  color: activeTab === tab ? "#1a1a2e" : "#fff",
                  backdropFilter: "blur(4px)",
                  letterSpacing: "0.3px",
                  borderRadius: i === 0 ? "4px 0 0 0" : i === tabs.length - 1 ? "0 4px 0 0" : "0",
                  transition: "background 0.2s, color 0.2s",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Row */}
          <div style={{ display: "flex", alignItems: "stretch" }} className="flex-column flex-lg-row">
            {/* Looking For */}
            <div 
              style={{ flex: 1, paddingLeft: "24px", paddingRight: "24px" }}
              className="border-bottom border-lg-bottom-0 border-lg-end rounded-top rounded-lg-top-0 rounded-lg-start py-2 py-lg-4"
            >
              <label style={labelStyle}>LOOKING FOR</label>
              <select value={lookingFor} onChange={(e) => setLookingFor(e.target.value)} style={selectStyle}>
                <option value="">Property Type</option>
                {["Apartment", "Villa", "Penthouse", "Studio", "Office", "Townhouse"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Location */}
            <div 
              style={{ flex: 1, paddingLeft: "24px", paddingRight: "24px" }}
              className="border-bottom border-lg-bottom-0 border-lg-end py-2 py-lg-4"
            >
              <label style={labelStyle}>LOCATION</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} style={selectStyle}>
                <option value="">All Cities</option>
                {["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay", "Jumeirah Beach Residence", "Arabian Ranches", "DIFC", "Dubai Creek Harbour", "Emirates Hills", "JVC", "Dubai Hills Estate"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Bedrooms */}
            <div 
              style={{ flex: 1, paddingLeft: "24px", paddingRight: "24px" }}
              className="border-bottom border-lg-bottom-0 border-lg-end py-2 py-lg-4"
            >
              <label style={labelStyle}>PROPERTY SIZE</label>
              <select value={bedrooms} onChange={(e) => setBedrooms(e.target.value)} style={selectStyle}>
                <option value="">Bedrooms</option>
                {["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Budget */}
            <div 
              style={{ flex: 1, paddingLeft: "24px", paddingRight: "24px" }}
              className="border-bottom border-lg-bottom-0 py-2 py-lg-4"
            >
              <label style={labelStyle}>YOUR BUDGET</label>
              <select value={budget} onChange={(e) => setBudget(e.target.value)} style={selectStyle}>
                <option value="">Max. Price</option>
                {["AED 500,000", "AED 1,000,000", "AED 2,000,000", "AED 5,000,000", "AED 10,000,000+"].map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <button
              onClick={handleSearch}
              style={{
                background: "#caab4d",
                color: "#fff",
                border: "none",
                paddingLeft: "36px",
                paddingRight: "36px",
                fontSize: "15px",
                fontWeight: 600,
                letterSpacing: "0.5px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                minWidth: "160px",
                transition: "background 0.2s",
              }}
              className="rounded-bottom rounded-lg-bottom-0 rounded-lg-end py-2 py-lg-0"
              onMouseEnter={(e) => ((e.target as HTMLElement).style.background = "#b39641")}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.background = "#caab4d")}
            >
              Search Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "11px",
  fontWeight: 600,
  letterSpacing: "1.2px",
  textTransform: "uppercase",
  color: "#888",
  marginBottom: "8px",
};

const selectStyle: React.CSSProperties = {
  width: "100%",
  border: "none",
  outline: "none",
  fontSize: "15px",
  color: "#1a1a2e",
  fontWeight: "500",
  background: "transparent",
  cursor: "pointer",
  appearance: "none",
  WebkitAppearance: "none",
  paddingRight: "24px",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='7' viewBox='0 0 12 7'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23caab4d' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 0 center",
};