"use client";
import React, { useState } from 'react';

const faqItems = [
  {
    question: "What areas in Dubai do you specialize in?",
    answer: "We specialize in the most sought-after neighborhoods, including Dubai Marina, Palm Jumeirah, Downtown Dubai, and Dubai South. Our expertise covers both ready properties and exclusive off-plan launches."
  },
  {
    question: "Can international investors buy property in Dubai?",
    answer: "Yes, Dubai offers 'Freehold' areas where international investors can own 100% of the property. We guide our global clients through the entire legal and administrative process."
  },
  {
    question: "How can I qualify for the UAE Golden Visa?",
    answer: "Investors who purchase property valued at AED 2 million or more are generally eligible for the 10-year Golden Visa. Our consultants can assist with the application."
  },
  {
    question: "What are the costs associated with buying?",
    answer: "Standard costs include a 4% DLD fee, a registration fee, and brokerage commissions. We provide a full transparency breakdown of all costs."
  }
];

export default function SnowFaqNewsletter() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section style={{ background: '#fff', padding: '96px 0' }}>
      <div className="container">
        <div className="row g-5">
          
          {/* FAQ Column */}
          <div className="col-lg-6">
            <div className="mb-4">
              <span style={{ color: '#caab4d', fontWeight: 700, fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px' }}>Support</span>
              <h2 style={{ fontSize: '32px', fontWeight: 800, color: '#1a1a2e', marginTop: '10px' }}>Frequently Asked Questions</h2>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {faqItems.map((item, i) => (
                <div 
                  key={i} 
                  style={{ 
                    border: '1px solid #eee', 
                    borderRadius: '12px', 
                    overflow: 'hidden',
                    background: openIndex === i ? '#fafafa' : '#fff',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    style={{
                      width: '100%',
                      padding: '20px',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      outline: 'none'
                    }}
                  >
                    <span style={{ fontSize: '15px', fontWeight: 700, color: openIndex === i ? '#caab4d' : '#1a1a2e' }}>
                      {item.question}
                    </span>
                    <i className={`fa-solid fa-chevron-${openIndex === i ? 'up' : 'down'}`} style={{ color: '#caab4d', fontSize: '12px' }}></i>
                  </button>
                  
                  <div style={{ 
                    maxHeight: openIndex === i ? '150px' : '0', 
                    overflow: 'hidden', 
                    transition: 'max-height 0.3s ease-out' 
                  }}>
                    <div style={{ padding: '0 20px 20px', color: '#666', lineHeight: 1.6, fontSize: '14px' }}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter Column */}
          <div className="col-lg-6">
            <div 
              style={{ 
                background: '#fafafa', 
                border: '1px solid #eee', 
                borderRadius: '24px', 
                padding: '50px 40px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center'
              }}
            >
              <div style={{ marginBottom: '30px' }}>
                <div style={{ width: '60px', height: '60px', background: 'rgba(202,171,77,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <i className="fa-solid fa-paper-plane" style={{ color: '#caab4d', fontSize: '24px' }}></i>
                </div>
                <h2 style={{ color: '#1a1a2e', fontSize: '32px', fontWeight: 800, marginBottom: '15px' }}>
                  Join the <span style={{ color: '#caab4d' }}>Elite</span> List
                </h2>
                <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.6 }}>
                  Subscribe to receive priority access to exclusive off-plan launches, market insights, and premium properties in Dubai.
                </p>
              </div>
              
              <form 
                onSubmit={(e) => e.preventDefault()}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: '12px', 
                  maxWidth: '400px', 
                  margin: '0 auto',
                  width: '100%'
                }}
              >
                <div style={{ position: 'relative' }}>
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    style={{ 
                      width: '100%',
                      background: '#fff', 
                      border: '1px solid #ddd', 
                      color: '#1a1a2e', 
                      padding: '14px 20px', 
                      borderRadius: '12px',
                      outline: 'none',
                      fontSize: '15px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.03)'
                    }} 
                  />
                </div>
                <button 
                  className="btn btn-primary" 
                  style={{ 
                    borderRadius: '12px', 
                    fontWeight: 700, 
                    fontSize: '15px',
                    padding: '14px',
                    width: '100%'
                  }}
                >
                  Subscribe Now
                </button>
              </form>
              
              <div style={{ marginTop: '25px', color: '#aaa', fontSize: '12px' }}>
                <i className="fa-solid fa-shield-halved" style={{ marginRight: '6px' }}></i>
                We value your privacy. Unsubscribe at any time.
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
