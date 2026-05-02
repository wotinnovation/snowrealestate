"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "Home", href: "/" },
  {
    label: "Properties",
    href: "/properties",
    children: [
      { label: "All Properties", href: "/properties" },
      { label: "For Sale", href: "/properties?status=For Sale" },
      { label: "For Rent", href: "/properties?status=For Rent" },
      { label: "Apartments", href: "/properties?type=Apartment" },
      { label: "Villas", href: "/properties?type=Villa" },
    ],
  },
  {
    label: "Company",
    href: "#",
    children: [
      { label: "About Snow", href: "/about-us" },
      { label: "Contact Us", href: "/contact" },
      { label: "Browse Locations", href: "/properties" },
    ],
  },
];

export default function SnowNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const dropdownTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pathname = usePathname();

  const [isOverAbout, setIsOverAbout] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPos = window.scrollY;
      setScrolled(scrollPos > 60);

      // On homepage, check if we are over the dark "About Us" section
      if (pathname === "/") {
        const aboutSection = document.getElementById("about-us");
        if (aboutSection) {
          const rect = aboutSection.getBoundingClientRect();
          const navbarHeight = scrollPos > 60 ? 68 : 80;
          // If the navbar is within the about-us section bounds
          if (rect.top <= navbarHeight && rect.bottom >= navbarHeight) {
            setIsOverAbout(true);
          } else {
            setIsOverAbout(false);
          }
        }
      } else {
        setIsOverAbout(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    onScroll(); // initial check
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const textColor = isOverAbout ? "#fff" : "#000";

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenMobileMenu(null);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }, [pathname]);

  const toggleMobile = () => {
    const nextState = !mobileOpen;
    setMobileOpen(nextState);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = nextState ? 'hidden' : 'auto';
    }
  };

  const handleMouseEnter = (label: string) => {
    if (window.innerWidth >= 992) {
      if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
      setOpenDropdown(label);
    }
  };

  const handleMouseLeave = () => {
    if (window.innerWidth >= 992) {
      dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 120);
    }
  };

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
          background: scrolled && !mobileOpen ? "rgba(255, 255, 255, 0.75)" : (mobileOpen ? "rgba(10,14,30,0.98)" : "rgba(255, 255, 255, 0.07)"),
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          boxShadow: scrolled ? "0 4px 30px rgba(0, 0, 0, 0.2)" : "0 2px 24px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          className="navbar-container"
          style={{
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: scrolled ? "68px" : "80px",
            transition: "height 0.3s ease",
          }}
        >
          {/* ── Logo ── */}
          <Link
            href="/"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              textDecoration: "none",
              zIndex: 1002,
            }}
          >
            <img
              src="/image/logo/logo.png"
              alt="Snow Logo"
              style={{ height: "38px", width: "auto", objectFit: "contain", borderRadius: "8px" }}
            />
            <div style={{ lineHeight: 1 }}>
              <div style={{ color: (mobileOpen || isOverAbout) ? "#fff" : (scrolled ? "#000" : textColor), fontWeight: 800, fontSize: "18px", letterSpacing: "0.5px" }}>
                SNOW
              </div>
              <div style={{ color: "#caab4d", fontWeight: 500, fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                Real Estate
              </div>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav style={{ display: "flex", alignItems: "center", gap: "4px" }} className="d-none d-lg-flex">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  style={{ position: "relative" }}
                  onMouseEnter={() => handleMouseEnter(link.label)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      color: openDropdown === link.label ? "#caab4d" : textColor,
                      fontSize: "14px",
                      fontWeight: 800,
                      padding: "8px 16px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "5px",
                      borderRadius: "6px",
                      transition: "color 0.2s",
                      letterSpacing: "0.3px",
                    }}
                  >
                    {link.label}
                    <svg
                      width="10"
                      height="6"
                      viewBox="0 0 10 6"
                      fill="none"
                      style={{
                        transform: openDropdown === link.label ? "rotate(180deg)" : "rotate(0deg)",
                        transition: "transform 0.25s",
                      }}
                    >
                      <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Dropdown */}
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 8px)",
                      left: "50%",
                      background: "rgba(10,14,30,0.98)",
                      backdropFilter: "blur(20px)",
                      border: "1px solid rgba(202,171,77,0.2)",
                      borderRadius: "12px",
                      minWidth: "200px",
                      padding: "8px",
                      boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                      opacity: openDropdown === link.label ? 1 : 0,
                      pointerEvents: openDropdown === link.label ? "auto" : "none",
                      transform: openDropdown === link.label
                        ? "translateX(-50%) translateY(0)"
                        : "translateX(-50%) translateY(-8px)",
                      transition: "opacity 0.2s ease, transform 0.2s ease",
                    }}
                  >
                    {link.children.map((child, i) => (
                      <Link
                        key={child.label}
                        href={child.href}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "10px",
                          padding: "10px 14px",
                          color: pathname === child.href ? "#caab4d" : "#c8c8d4",
                          fontSize: "14px",
                          fontWeight: pathname === child.href ? 600 : 400,
                          textDecoration: "none",
                          borderRadius: "8px",
                          transition: "background 0.15s, color 0.15s",
                          borderTop: i > 0 ? "1px solid rgba(255,255,255,0.05)" : "none",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(202,171,77,0.1)";
                          (e.currentTarget as HTMLElement).style.color = "#caab4d";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "transparent";
                          (e.currentTarget as HTMLElement).style.color = pathname === child.href ? "#caab4d" : "#c8c8d4";
                        }}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    color: pathname === link.href ? "#caab4d" : textColor,
                    fontSize: "14px",
                    fontWeight: 800,
                    padding: "8px 16px",
                    textDecoration: "none",
                    borderRadius: "6px",
                    transition: "color 0.2s",
                    letterSpacing: "0.3px",
                    position: "relative",
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#caab4d")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = pathname === link.href ? "#caab4d" : textColor)}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* ── Desktop CTAs ── */}
          <div className="d-none d-lg-flex" style={{ alignItems: "center", gap: "12px" }}>
            <Link
              href="https://www.instagram.com/snow.real.estate/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                width: "34px",
                height: "34px",
                borderRadius: "8px",
                border: "1px solid rgba(255,255,255,0.12)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: (mobileOpen || isOverAbout) ? "#fff" : textColor,
                textDecoration: "none",
                transition: "all 0.2s",
              }}
            >
              <i className="fa-brands fa-instagram" style={{ fontSize: "15px" }}></i>
            </Link>

            <Link
              href="/submit-property"
              style={{
                background: "#caab4d",
                color: "#fff",
                fontSize: "13px",
                fontWeight: 700,
                padding: "9px 20px",
                borderRadius: "8px",
                textDecoration: "none",
                letterSpacing: "0.3px",
                transition: "opacity 0.2s, transform 0.2s",
                whiteSpace: "nowrap",
              }}
            >
              List Property
            </Link>
          </div>

          {/* ── Mobile Burger ── */}
          <button
            className="d-lg-none"
            onClick={toggleMobile}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              zIndex: 1002,
              padding: "10px",
              marginRight: "-10px",
            }}
          >
            <div style={{ width: "26px", position: "relative", height: "18px" }}>
              <span
                style={{
                  position: "absolute",
                  top: mobileOpen ? "8px" : "0",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background: (mobileOpen || isOverAbout) ? "#fff" : textColor,
                  transition: "all 0.3s",
                  transform: mobileOpen ? "rotate(45deg)" : "none",
                }}
              />
              <span
                style={{
                  position: "absolute",
                  top: "8px",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background: (mobileOpen || isOverAbout) ? "#fff" : textColor,
                  transition: "opacity 0.2s",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  position: "absolute",
                  bottom: mobileOpen ? "8px" : "0",
                  left: 0,
                  width: "100%",
                  height: "2px",
                  background: (mobileOpen || isOverAbout) ? "#fff" : textColor,
                  transition: "all 0.3s",
                  transform: mobileOpen ? "rotate(-45deg)" : "none",
                }}
              />
            </div>
          </button>
        </div>

        {/* ── Mobile Full-Screen Menu ── */}
        <div
          className="mobile-menu-content"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            background: "rgba(10,14,30,0.98)",
            backdropFilter: "blur(20px)",
            zIndex: 1001,
            transition: "all 0.4s cubic-bezier(0.4,0,0.2,1)",
            transform: mobileOpen ? "translateX(0)" : "translateX(100%)",
            visibility: mobileOpen ? "visible" : "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div style={{ flex: 1, overflowY: "auto" }}>
            {navLinks.map((link) => (
              <div key={link.label} style={{ marginBottom: "15px" }}>
                {link.children ? (
                  <>
                    <button
                      onClick={() => setOpenMobileMenu(openMobileMenu === link.label ? null : link.label)}
                      style={{
                        width: "100%",
                        background: "none",
                        border: "none",
                        color: "#fff",
                        fontSize: "24px",
                        fontWeight: 700,
                        textAlign: "left",
                        padding: "10px 0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      {link.label}
                      <i className={`fa-solid fa-chevron-${openMobileMenu === link.label ? 'up' : 'down'}`} style={{ fontSize: "16px", color: "#caab4d" }}></i>
                    </button>
                    <div
                      style={{
                        maxHeight: openMobileMenu === link.label ? "300px" : "0",
                        overflow: "hidden",
                        transition: "all 0.3s ease",
                        paddingLeft: "15px",
                        borderLeft: "2px solid rgba(202,171,77,0.3)",
                      }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.label}
                          href={child.href}
                          style={{
                            display: "block",
                            padding: "10px 0",
                            color: pathname === child.href ? "#caab4d" : "rgba(255,255,255,0.7)",
                            fontSize: "18px",
                            textDecoration: "none",
                          }}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={link.href}
                    style={{
                      display: "block",
                      padding: "10px 0",
                      color: pathname === link.href ? "#caab4d" : "#fff",
                      fontSize: "24px",
                      fontWeight: 700,
                      textDecoration: "none",
                    }}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: "15px" }}>
            <Link
              href="/submit-property"
              style={{
                background: "#caab4d",
                color: "#fff",
                padding: "16px",
                borderRadius: "12px",
                textAlign: "center",
                fontWeight: 700,
                fontSize: "18px",
                textDecoration: "none",
              }}
            >
              List Your Property
            </Link>
            <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginTop: "10px" }}>
              <Link href="tel:+97145572500" style={{ color: "#fff", fontSize: "20px" }}>
                <i className="fa-solid fa-phone"></i>
              </Link>
              <Link href="https://www.instagram.com/snow.real.estate/" target="_blank" style={{ color: "#fff", fontSize: "20px" }}>
                <i className="fa-brands fa-instagram"></i>
              </Link>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
