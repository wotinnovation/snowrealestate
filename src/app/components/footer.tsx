"use client";
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="dark-footer skin-dark-footer" style={{ background: '#0a0e1e', paddingTop: '60px' }}>
        <div className="container" style={{ maxWidth: '85%', margin: '0 auto' }}>
            <div className="row">
                
                {/* Brand & About */}
                <div className="col-lg-4 col-md-6 mb-4">
                    <div className="footer-widget">
                        <Link className="nav-footer-logo" href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: '20px' }}>
                            <img 
                              src="/image/logo/logo.png" 
                              alt="Snow Logo" 
                              style={{ height: "38px", width: "auto", objectFit: "contain", borderRadius: "8px" }} 
                            />
                            <div style={{ lineHeight: 1 }}>
                              <div style={{ color: "#fff", fontWeight: 800, fontSize: "18px", letterSpacing: "0.5px", fontFamily: "var(--font-playfair), serif" }}>
                                SNOW
                              </div>
                              <div style={{ color: "#caab4d", fontWeight: 500, fontSize: "9px", letterSpacing: "2.5px", textTransform: "uppercase" }}>
                                Real Estate
                              </div>
                            </div>
                        </Link>
                        <div className="footer-add" style={{ color: '#c8c8d4', lineHeight: '1.8' }}>
                            <p style={{ fontSize: '14px', marginBottom: '20px', opacity: 0.8 }}>
                              Snow Real Estate is a premier luxury brokerage in Dubai, dedicated to providing exceptional service and expertise in the UAE's most exclusive property markets. With over 12 years of experience, we help you find your dream home or next big investment.
                            </p>
                            <ul className="footer-bottom-social" style={{ listStyle: 'none', padding: 0, display: 'flex', gap: '15px' }}>
                                <li><Link href="https://www.instagram.com/snow.real.estate/" target='_blank' style={{ color: '#c8c8d4', fontSize: '18px', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}><i className="fa-brands fa-instagram"></i></Link></li>
                                <li><Link href="#" target='_blank' style={{ color: '#c8c8d4', fontSize: '18px', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}><i className="fa-brands fa-facebook"></i></Link></li>
                                <li><Link href="#" target='_blank' style={{ color: '#c8c8d4', fontSize: '18px', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}><i className="fa-brands fa-linkedin"></i></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>		

                {/* Quick Links */}
                <div className="col-lg-2 col-md-6 mb-4">
                    <div className="footer-widget">
                        <h4 className="widget-title" style={{ color: '#fff', marginBottom: '20px' }}>Quick Links</h4>
                        <ul className="footer-menu" style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}><Link href="/" style={{ color: '#c8c8d4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}>Home</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link href="/properties" style={{ color: '#c8c8d4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}>Properties</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link href="/about-us" style={{ color: '#c8c8d4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}>About Us</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link href="/contact" style={{ color: '#c8c8d4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}>Contact Us</Link></li>
                        </ul>
                    </div>
                </div>
                        
                {/* Property Types */}
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="footer-widget">
                        <h4 className="widget-title" style={{ color: '#fff', marginBottom: '20px' }}>Property Types</h4>
                        <ul className="footer-menu" style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}><Link href="/properties?type=Apartment" style={{ color: '#c8c8d4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}>Apartments</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link href="/properties?type=Villa" style={{ color: '#c8c8d4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}>Villas</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link href="/properties?type=Penthouse" style={{ color: '#c8c8d4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}>Penthouses</Link></li>
                            <li style={{ marginBottom: '10px' }}><Link href="/properties?type=Townhouse" style={{ color: '#c8c8d4', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#caab4d")} onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#c8c8d4")}>Townhouses</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Connect & Contact */}
                <div className="col-lg-3 col-md-6 mb-4">
                    <div className="footer-widget">
                        <h4 className="widget-title" style={{ color: '#fff', marginBottom: '20px' }}>Connect</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                          <div>
                            <Link
                              href="/submit-property"
                              style={{
                                display: "inline-block",
                                background: "linear-gradient(135deg, #caab4d, #caab4d)",
                                color: "#fff",
                                fontSize: "14px",
                                fontWeight: 700,
                                padding: "10px 24px",
                                borderRadius: "8px",
                                textDecoration: "none",
                                marginBottom: "15px"
                              }}
                            >
                              List Your Property
                            </Link>
                          </div>

                          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '20px' }}>
                            <div className="footer-add" style={{ color: '#c8c8d4', lineHeight: '1.8' }}>
                                <p className="mb-2" style={{ fontSize: '13px' }}><i className="fa-solid fa-location-dot" style={{ color: '#caab4d', marginRight: '8px', width: '15px' }}></i> Downtown Dubai, Dubai, UAE</p>
                                <p className="mb-2" style={{ fontSize: '13px' }}><i className="fa-solid fa-phone" style={{ color: '#caab4d', marginRight: '8px', width: '15px' }}></i> +971 4 557 2500</p>
                                <p className="mb-2" style={{ fontSize: '13px' }}><i className="fa-solid fa-envelope" style={{ color: '#caab4d', marginRight: '8px', width: '15px' }}></i> info@snowrealestate.com</p>
                            </div>
                          </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    
        <div className="footer-bottom" style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '20px 0', marginTop: '20px' }}>
            <div className="container" style={{ maxWidth: '85%', margin: '0 auto' }}>
                <div className="row align-items-center">
                    <div className="col-12 d-flex flex-column flex-md-row justify-content-between align-items-center">
                        <p className="mb-0" style={{ color: '#888', fontSize: '14px' }}>© {new Date().getFullYear()} Snow Real Estate. All Rights Reserved.</p>
                        <p className="mb-0 mt-2 mt-md-0" style={{ color: '#888', fontSize: '14px' }}>
                            Developed by <Link href="https://wot.ae" target="_blank" style={{ color: '#caab4d', textDecoration: 'none' }}>WOT</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </footer>
  )
}
