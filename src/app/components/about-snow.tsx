"use client";
import React from "react";
import Link from "next/link";

const stats = [
  { value: "12+", label: "Years of Experience" },
  { value: "1,500+", label: "Properties Sold" },
  { value: "3", label: "Countries Served" },
  { value: "98%", label: "Client Satisfaction" },
];

const reasons = [
  {
    icon: "fa-solid fa-map-location-dot",
    title: "Local Expertise",
    desc: "A deep understanding of Dubai's evolving property landscape — from off-plan hotspots to established communities.",
    color: "#caab4d",
  },
  {
    icon: "fa-solid fa-handshake",
    title: "Client-Centric Approach",
    desc: "Tailored consultancy designed to match your unique investment goals and lifestyle aspirations.",
    color: "#074da3",
  },
  {
    icon: "fa-solid fa-building-columns",
    title: "Diverse Portfolio",
    desc: "Access to the most sought-after off-plan and ready properties across the UAE, Saudi Arabia & Kuwait.",
    color: "#009868",
  },
];

export default function AboutSnow() {
  return (
    <section
      id="about-us"
      style={{ background: "linear-gradient(135deg, #0a0f24 0%, #0d1b3e 60%, #111827 100%)", padding: "96px 0" }}
    >
      <div className="container">
        {/* ── Top: Tag + Heading ── */}
        <div className="row justify-content-center mb-5">
          <div className="col-lg-8 text-center">
            <span
              style={{
                display: "inline-block",
                background: "rgba(202,171,77,0.15)",
                color: "#caab4d",
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "2px",
                textTransform: "uppercase",
                padding: "6px 20px",
                borderRadius: "30px",
                border: "1px solid rgba(202,171,77,0.3)",
                marginBottom: "20px",
              }}
            >
              About Snow Real Estate
            </span>
            <h2
              style={{
                fontSize: "clamp(28px,4vw,46px)",
                fontWeight: 800,
                color: "#ffffff",
                lineHeight: 1.2,
                marginBottom: "20px",
              }}
            >
              Shaping Success Stories{" "}
              <span style={{ color: "#caab4d" }}>for Over 12 Years</span>
            </h2>
            <p style={{ fontSize: "17px", color: "rgba(255,255,255,0.65)", lineHeight: 1.8, maxWidth: "680px", margin: "0 auto" }}>
              Snow Real Estate Brokerage is a premier real estate firm based in the heart of Dubai. With over 12 years of experience in the UAE market, we have established ourselves as a trusted partner for investors and homeowners alike.
            </p>
          </div>
        </div>

        {/* ── Stats Bar ── */}
        <div
          className="row g-3 mb-5"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "16px",
            padding: "32px 24px",
            margin: "0 0 48px",
          }}
        >
          {stats.map((s, i) => (
            <div key={i} className="col-6 col-md-3 text-center">
              <div style={{ fontSize: "clamp(32px,4vw,48px)", fontWeight: 800, color: "#caab4d", lineHeight: 1 }}>
                {s.value}
              </div>
              <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.55)", marginTop: "8px", fontWeight: 500 }}>
                {s.label}
              </div>
            </div>
          ))}
        </div>

        {/* ── Two Columns: Mission + Why Choose Us ── */}
        <div className="row g-5 align-items-start">
          {/* Left: Mission */}
          <div className="col-lg-6">
            <div
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "16px",
                padding: "40px",
                height: "100%",
              }}
            >
              <div
                style={{
                  width: "52px",
                  height: "52px",
                  background: "rgba(202,171,77,0.15)",
                  borderRadius: "12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: "24px",
                }}
              >
                <i className="fa-solid fa-bullseye" style={{ color: "#caab4d", fontSize: "22px" }}></i>
              </div>
              <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "22px", marginBottom: "16px" }}>
                Our Philosophy & Mission
              </h4>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "20px" }}>
                We don&apos;t just sell properties — we create opportunities. We specialize in identifying high-value residential and commercial projects, such as the luxurious{" "}
                <strong style={{ color: "#caab4d" }}>Azizi Venice in Dubai South</strong>, to help our clients build wealth and secure their dream homes.
              </p>
              <p style={{ color: "rgba(255,255,255,0.65)", lineHeight: 1.8, marginBottom: "28px" }}>
                Our mission is to deliver real estate excellence across borders — from the UAE to Saudi Arabia and Kuwait. We are driven by results and built on a foundation of deep-rooted trust.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
                {["UAE", "Saudi Arabia", "Kuwait"].map((country) => (
                  <span
                    key={country}
                    style={{
                      padding: "6px 18px",
                      border: "1px solid rgba(202,171,77,0.4)",
                      color: "#caab4d",
                      borderRadius: "20px",
                      fontSize: "13px",
                      fontWeight: 600,
                    }}
                  >
                    {country}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Why Choose Us */}
          <div className="col-lg-6">
            <h4 style={{ color: "#fff", fontWeight: 700, fontSize: "22px", marginBottom: "28px" }}>
              Why Choose Us?
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {reasons.map((r, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "flex-start",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    borderRadius: "12px",
                    padding: "24px",
                    transition: "border-color 0.2s",
                  }}
                >
                  <div
                    style={{
                      minWidth: "48px",
                      height: "48px",
                      background: `${r.color}18`,
                      borderRadius: "10px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i className={r.icon} style={{ color: r.color, fontSize: "20px" }}></i>
                  </div>
                  <div>
                    <h6 style={{ color: "#fff", fontWeight: 700, marginBottom: "6px", fontSize: "15px" }}>
                      {r.title}
                    </h6>
                    <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.7, margin: 0 }}>
                      {r.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── CTA ── */}
        <div className="text-center mt-5">
          <Link
            href="/about-us"
            className="btn"
            style={{
              background: "#caab4d",
              color: "#fff",
              padding: "14px 40px",
              borderRadius: "8px",
              fontWeight: 700,
              fontSize: "15px",
              border: "none",
              letterSpacing: "0.3px",
              textDecoration: "none",
            }}
          >
            Learn More About Us
          </Link>
        </div>
      </div>
    </section>
  );
}
