'use client'
import React, { useState } from 'react';
import SnowNavbar from '../components/navbar/snow-navbar';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import Link from 'next/link';

export default function AboutPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "What makes Snow Real Estate different from other brokerages?",
      a: "With 12+ years of experience, we provide more than just listing services. Our consultancy is built on deep market intelligence, exclusive off-plan access, and a commitment to transparency that ensures long-term wealth for our clients."
    },
    {
      q: "Which areas in Dubai do you specialize in?",
      a: "We specialize in the most sought-after prime locations, including Dubai Marina, Palm Jumeirah, Downtown Dubai, and the rapidly growing Dubai South district, home to major residential and commercial hubs."
    },
    {
      q: "Can international investors buy property through Snow Real Estate?",
      a: "Absolutely. We represent a global clientele, providing end-to-end support for international investors, including virtual tours, digital signatures, and comprehensive advice on the UAE's Golden Visa requirements."
    },
    {
      q: "What is your approach to off-plan property investment?",
      a: "We partner with top-tier developers to identify high-yield opportunities before they reach the general market. Our team analyzes payment plans, project location, and capital appreciation potential to ensure our clients get the best ROI."
    }
  ];

  return (
    <>
      <SnowNavbar />
      
      {/* Spacer for fixed glass navbar */}
      <div style={{ height: '80px', background: '#fff' }} />

      {/* Page Title */}
      <div className="image-cover page-title" style={{ background: '#fff', padding: '80px 0 60px', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 text-center">
              <div style={{ color: '#caab4d', fontSize: '13px', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '15px' }}>
                <Link href="/" style={{ color: '#999', textDecoration: 'none' }}>Home</Link>
                <span style={{ margin: '0 10px', opacity: 0.4 }}>/</span>
                <span style={{ color: '#1a1a2e' }}>About Us</span>
              </div>
              <h2 className="ipt-title" style={{ color: '#1a1a2e', fontSize: '48px', fontWeight: 800, marginBottom: '0', letterSpacing: '-1px' }}>
                Our <span style={{ color: '#caab4d' }}>Story</span>
              </h2>
            </div>
          </div>
        </div>
      </div>

      {/* Elaborated Content Section */}
      <section style={{ background: '#fff', padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '85%', margin: '0 auto' }}>
          <div className="row align-items-center g-5">
            <div className="col-lg-6">
                <div style={{ position: 'relative' }}>
                    <img 
                        src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=2070&auto=format&fit=crop" 
                        alt="Burj Khalifa Dubai" 
                        style={{ width: '100%', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                    />
                    <div style={{ 
                        position: 'absolute', 
                        bottom: '-30px', 
                        right: '-30px', 
                        background: '#caab4d', 
                        padding: '30px', 
                        borderRadius: '20px',
                        color: '#fff',
                        boxShadow: '0 15px 30px rgba(202,171,77,0.3)',
                    }} className="d-none d-md-block">
                        <div style={{ fontSize: '40px', fontWeight: 800 }}>12+</div>
                        <div style={{ fontSize: '14px', fontWeight: 600, textTransform: 'uppercase' }}>Years of Excellence</div>
                    </div>
                </div>
            </div>
            <div className="col-lg-6">
                <span style={{ color: '#caab4d', fontWeight: 700, textTransform: 'uppercase', fontSize: '14px', letterSpacing: '2px' }}>A Legacy of Trust</span>
                <h3 style={{ fontSize: '36px', fontWeight: 800, color: '#1a1a2e', margin: '20px 0', lineHeight: '1.2' }}>
                    Leading the Way in Dubai&apos;s <span style={{ color: '#caab4d' }}>Luxury Real Estate</span> Market
                </h3>
                <p style={{ color: '#555', fontSize: '17px', lineHeight: '1.8', marginBottom: '25px' }}>
                    Founded in the heart of the world&apos;s most dynamic city, Snow Real Estate Brokerage has spent over a decade redefining the property investment experience. We don&apos;t just facilitate transactions; we build long-term wealth for our clients through strategic insights and unparalleled market access.
                </p>
                <p style={{ color: '#555', fontSize: '17px', lineHeight: '1.8', marginBottom: '30px' }}>
                    Our team of expert consultants specializes in identifying the most promising off-plan projects and ready-to-move-in luxury homes across Dubai Marina, Palm Jumeirah, and the burgeoning Dubai South district.
                </p>
                
                <div className="row g-4">
                    <div className="col-sm-6">
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ minWidth: '40px', height: '40px', background: 'rgba(202,171,77,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa-solid fa-check" style={{ color: '#caab4d' }}></i>
                            </div>
                            <div>
                                <h6 style={{ fontWeight: 700, color: '#1a1a2e', marginBottom: '5px' }}>Transparency</h6>
                                <p style={{ fontSize: '14px', color: '#777', margin: 0 }}>Every deal is built on clear, honest communication.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div style={{ display: 'flex', gap: '15px' }}>
                            <div style={{ minWidth: '40px', height: '40px', background: 'rgba(202,171,77,0.1)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <i className="fa-solid fa-check" style={{ color: '#caab4d' }}></i>
                            </div>
                            <div>
                                <h6 style={{ fontWeight: 700, color: '#1a1a2e', marginBottom: '5px' }}>Exclusivity</h6>
                                <p style={{ fontSize: '14px', color: '#777', margin: 0 }}>Access to off-plan launches before the public.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{ background: '#f8f9fa', padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '85%', margin: '0 auto' }}>
            <div className="row text-center mb-5">
                <div className="col-lg-12">
                    <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e' }}>Our Core Values</h3>
                    <div style={{ width: '60px', height: '4px', background: '#caab4d', margin: '20px auto' }}></div>
                </div>
            </div>
            <div className="row g-4">
                {[
                    { title: "Integrity First", desc: "We operate with the highest ethical standards, ensuring your interests are always prioritized.", icon: "fa-solid fa-shield-halved" },
                    { title: "Market Intelligence", desc: "Data-driven advice that helps you make informed investment decisions in a fast-paced market.", icon: "fa-solid fa-chart-line" },
                    { title: "Global Reach", desc: "Serving international investors from our headquarters in Dubai to Riyadh and Kuwait City.", icon: "fa-solid fa-globe" }
                ].map((val, i) => (
                    <div key={i} className="col-lg-4 col-md-6">
                        <div style={{ 
                            background: '#fff', 
                            padding: '40px', 
                            borderRadius: '20px', 
                            height: '100%', 
                            boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                            transition: 'transform 0.3s'
                        }} onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-10px)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                            <div style={{ width: '60px', height: '60px', background: 'rgba(202,171,77,0.1)', borderRadius: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '25px' }}>
                                <i className={val.icon} style={{ color: '#caab4d', fontSize: '24px' }}></i>
                            </div>
                            <h5 style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '15px' }}>{val.title}</h5>
                            <p style={{ color: '#666', lineHeight: '1.7', margin: 0 }}>{val.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section style={{ background: '#fff', padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '85%', margin: '0 auto' }}>
          <div className="row g-5">
            <div className="col-lg-5">
              <span style={{ color: '#caab4d', fontWeight: 700, textTransform: 'uppercase', fontSize: '13px', letterSpacing: '2px' }}>Your Questions Answered</span>
              <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e', marginTop: '15px' }}>Frequently Asked <span style={{ color: '#caab4d' }}>Questions</span></h3>
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.7', marginTop: '20px' }}>
                We believe in complete transparency. If you have any other questions regarding property investment in Dubai, our experts are always here to help.
              </p>
              <Link href="/contact" style={{ 
                display: 'inline-block', 
                background: '#1a1a2e', 
                color: '#fff', 
                padding: '12px 30px', 
                borderRadius: '8px', 
                textDecoration: 'none', 
                fontWeight: 600, 
                marginTop: '30px' 
              }}>Contact Our Team</Link>
            </div>
            
            <div className="col-lg-7">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {faqs.map((faq, i) => (
                  <div key={i} style={{ 
                    border: '1px solid #eee', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    background: openFaq === i ? '#fcfcfc' : '#fff'
                  }}>
                    <button 
                      onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      style={{ 
                        width: '100%', 
                        padding: '20px 25px', 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        background: 'none', 
                        border: 'none', 
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontWeight: 700, color: '#1a1a2e', fontSize: '16px' }}>{faq.q}</span>
                      <i className={`fa-solid fa-chevron-${openFaq === i ? 'up' : 'down'}`} style={{ color: '#caab4d', fontSize: '14px' }}></i>
                    </button>
                    {openFaq === i && (
                      <div style={{ padding: '0 25px 25px', color: '#666', fontSize: '15px', lineHeight: '1.7' }}>
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Global Presence Section */}
      <section style={{ background: '#f8f9fa', padding: '100px 0' }}>
        <div className="container" style={{ maxWidth: '85%', margin: '0 auto' }}>
          <div className="row justify-content-center text-center mb-5">
            <div className="col-lg-8">
              <span style={{ color: '#caab4d', fontWeight: 700, textTransform: 'uppercase', fontSize: '13px', letterSpacing: '2px' }}>Across Borders</span>
              <h3 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e', marginTop: '15px' }}>Our Global <span style={{ color: '#caab4d' }}>Presence</span></h3>
              <p style={{ color: '#666', fontSize: '16px', lineHeight: '1.7', marginTop: '20px' }}>
                Snow Real Estate is proud to serve a diverse portfolio of international investors, providing expert consultancy across the GCC&apos;s most high-growth markets.
              </p>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {[
              { country: "United Arab Emirates", city: "Dubai (Headquarters)", icon: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop" },
              { country: "Saudi Arabia", city: "Riyadh & Jeddah", icon: "https://images.unsplash.com/photo-1586724230021-4540c1c4b45d?q=80&w=800&auto=format&fit=crop" },
              { country: "Kuwait", city: "Kuwait City", icon: "https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?q=80&w=800&auto=format&fit=crop" }
            ].map((loc, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div style={{ 
                  background: '#fff', 
                  borderRadius: '20px', 
                  overflow: 'hidden', 
                  boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                  height: '100%'
                }}>
                  <div style={{ height: '200px', overflow: 'hidden' }}>
                    <img src={loc.icon} alt={loc.country} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: '30px' }}>
                    <h5 style={{ fontWeight: 800, color: '#1a1a2e', marginBottom: '10px' }}>{loc.country}</h5>
                    <p style={{ color: '#caab4d', fontWeight: 600, fontSize: '14px', margin: 0 }}>{loc.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FooterTop bg="theme-bg" />
      <Footer />
      <ScrollToTop />
    </>
  );
}
