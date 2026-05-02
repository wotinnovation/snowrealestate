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
    question: "How can I qualify for the UAE Golden Visa through real estate?",
    answer: "Investors who purchase property valued at AED 2 million or more are generally eligible for the 10-year Golden Visa. Our consultants can provide the latest requirements and assist with the application."
  },
  {
    question: "What are the costs associated with buying property in Dubai?",
    answer: "Standard costs include a 4% DLD fee, a registration fee, and brokerage commissions. We provide a full transparency breakdown of all costs before you commit to any transaction."
  }
];

export default function SnowFaq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" style={{ background: '#fff', padding: '96px 0' }}>
      <div className="container">
        <div className="row justify-content-center mb-5">
          <div className="col-lg-7 text-center">
            <span style={{ color: '#caab4d', fontWeight: 700, fontSize: '13px', textTransform: 'uppercase', letterSpacing: '2px' }}>Common Questions</span>
            <h2 style={{ fontSize: '38px', fontWeight: 800, color: '#1a1a2e', marginTop: '10px' }}>Frequently Asked Questions</h2>
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
                      padding: '24px',
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
                    <span style={{ fontSize: '17px', fontWeight: 700, color: openIndex === i ? '#caab4d' : '#1a1a2e' }}>
                      {item.question}
                    </span>
                    <i className={`fa-solid fa-chevron-${openIndex === i ? 'up' : 'down'}`} style={{ color: '#caab4d', fontSize: '14px' }}></i>
                  </button>
                  
                  <div style={{ 
                    maxHeight: openIndex === i ? '200px' : '0', 
                    overflow: 'hidden', 
                    transition: 'max-height 0.3s ease-out' 
                  }}>
                    <div style={{ padding: '0 24px 24px', color: '#666', lineHeight: 1.7, fontSize: '15px' }}>
                      {item.answer}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
