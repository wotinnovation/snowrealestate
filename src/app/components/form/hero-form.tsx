"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

/* ─── Shared styles ─────────────────────────────────────── */
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

/* ─── Dropdown Component ────────────────────────────────── */
const Dropdown = ({ label, value, options, onChange, placeholder }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div 
      style={{ flex: 1, position: "relative", paddingLeft: "24px", paddingRight: "24px" }}
      className="border-bottom border-lg-bottom-0 border-lg-end py-2 py-lg-4 hero-dropdown-container"
      onMouseLeave={() => setIsOpen(false)}
    >
      <label style={labelStyle}>{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        style={{ ...selectStyle, display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {value || placeholder}
        </span>
      </div>
      
      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          background: "#fff",
          borderRadius: "0 0 12px 12px",
          boxShadow: "0 15px 45px rgba(0,0,0,0.15)",
          zIndex: 1000,
          maxHeight: "300px",
          overflowY: "auto",
          marginTop: "-4px",
          border: "1px solid #f0f0f0",
          padding: "8px"
        }}>
          {options.map((opt: string) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
              style={{
                padding: "10px 16px",
                fontSize: "14px",
                color: value === opt ? "#caab4d" : "#1a1a2e",
                fontWeight: value === opt ? 700 : 500,
                cursor: "pointer",
                borderRadius: "6px",
                background: value === opt ? "rgba(202,171,77,0.05)" : "transparent",
                transition: "all 0.2s"
              }}
              className="hero-opt"
              onMouseEnter={(e) => {
                if (value !== opt) {
                  (e.target as HTMLElement).style.background = "#f9f9f9";
                  (e.target as HTMLElement).style.color = "#caab4d";
                }
              }}
              onMouseLeave={(e) => {
                if (value !== opt) {
                  (e.target as HTMLElement).style.background = "transparent";
                  (e.target as HTMLElement).style.color = "#1a1a2e";
                }
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Main Form Component ───────────────────────────────── */
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
    <div className="w-100 d-flex justify-content-center">
      <div
        style={{
          width: "100%",
          maxWidth: "1100px",
          background: "#fff",
          borderRadius: "12px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
          position: "relative",
          marginBottom: "0",
          border: "1px solid #f0f0f0"
        }}
      >
        {/* Status Tabs */}
        <div 
          style={{ 
            position: "absolute", 
            bottom: "100%", 
            left: "0", 
            display: "flex",
            background: "rgba(26,26,46,0.85)",
            backdropFilter: "blur(10px)",
            padding: "4px",
            borderRadius: "10px 10px 0 0",
            marginBottom: "-1px"
          }}
        >
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "8px 20px",
                fontSize: "13px",
                fontWeight: activeTab === tab ? 700 : 500,
                cursor: "pointer",
                border: "none",
                background: activeTab === tab ? "#caab4d" : "transparent",
                color: activeTab === tab ? "#fff" : "rgba(255,255,255,0.7)",
                borderRadius: "6px",
                transition: "all 0.3s",
                marginRight: "2px"
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form Row */}
        <div style={{ display: "flex", alignItems: "stretch" }} className="flex-column flex-lg-row">
          <Dropdown 
            label="LOOKING FOR"
            value={lookingFor}
            placeholder="Property Type"
            options={["Apartment", "Villa", "Penthouse", "Studio", "Office", "Townhouse"]}
            onChange={setLookingFor}
          />

          <Dropdown 
            label="LOCATION"
            value={location}
            placeholder="All Cities"
            options={["Downtown Dubai", "Dubai Marina", "Palm Jumeirah", "Business Bay", "Jumeirah Beach Residence", "Arabian Ranches", "DIFC", "Dubai Creek Harbour", "Emirates Hills", "JVC", "Dubai Hills Estate"]}
            onChange={setLocation}
          />

          <Dropdown 
            label="PROPERTY SIZE"
            value={bedrooms}
            placeholder="Bedrooms"
            options={["Studio", "1 Bedroom", "2 Bedrooms", "3 Bedrooms", "4+ Bedrooms"]}
            onChange={setBedrooms}
          />

          <Dropdown 
            label="YOUR BUDGET"
            value={budget}
            placeholder="Max. Price"
            options={["AED 500,000", "AED 1,000,000", "AED 2,000,000", "AED 5,000,000", "AED 10,000,000+"]}
            onChange={setBudget}
          />

          {/* Search Button */}
          <div style={{ display: "flex", padding: "15px" }}>
            <button
              onClick={handleSearch}
              style={{
                background: "#1a1a2e",
                color: "#fff",
                border: "none",
                paddingLeft: "40px",
                paddingRight: "40px",
                fontSize: "15px",
                fontWeight: 700,
                letterSpacing: "1px",
                cursor: "pointer",
                whiteSpace: "nowrap",
                borderRadius: "8px",
                transition: "all 0.3s",
                boxShadow: "0 10px 20px rgba(26,26,46,0.2)"
              }}
              className="py-3 py-lg-0"
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = "#caab4d";
                (e.target as HTMLElement).style.transform = "translateY(-2px)";
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = "#1a1a2e";
                (e.target as HTMLElement).style.transform = "translateY(0)";
              }}
            >
              Search Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}