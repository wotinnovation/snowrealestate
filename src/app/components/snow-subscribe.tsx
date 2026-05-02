"use client";
import React from 'react';

export default function SnowSubscribe() {
  return (
    <section 
      style={{ 
        background: '#fff', 
        padding: '96px 0', 
        position: 'relative'
      }}
    >
      <div className="container">
        <div 
          style={{ 
            background: '#fafafa', 
            border: '1px solid #eee', 
            borderRadius: '24px', 
            padding: '60px 40px',
            textAlign: 'center'
          }}
        >
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <h2 style={{ color: '#1a1a2e', fontSize: '38px', fontWeight: 800, marginBottom: '15px' }}>
                Join the <span style={{ color: '#caab4d' }}>Elite</span> List
              </h2>
              <p style={{ color: '#666', fontSize: '18px', marginBottom: '40px', lineHeight: 1.6 }}>
                Subscribe to receive priority access to exclusive off-plan launches, market insights, and premium properties in Dubai.
              </p>
              
              <form 
                onSubmit={(e) => e.preventDefault()}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'row', 
                  gap: '10px', 
                  maxWidth: '500px', 
                  margin: '0 auto',
                  background: '#fff',
                  padding: '8px',
                  borderRadius: '14px',
                  border: '1px solid #ddd',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}
              >
                <input 
                  type="email" 
                  placeholder="Enter your email address" 
                  style={{ 
                    flex: 1, 
                    background: 'transparent', 
                    border: 'none', 
                    color: '#1a1a2e', 
                    padding: '12px 15px', 
                    outline: 'none',
                    fontSize: '15px'
                  }} 
                />
                <button 
                  className="btn btn-primary px-4" 
                  style={{ 
                    borderRadius: '10px', 
                    fontWeight: 700, 
                    fontSize: '14px',
                    whiteSpace: 'nowrap'
                  }}
                >
                  Subscribe Now
                </button>
              </form>
              <div style={{ marginTop: '20px', color: '#aaa', fontSize: '12px' }}>
                <i className="fa-solid fa-lock" style={{ marginRight: '6px' }}></i>
                Your privacy is our priority. No spam, only premium insights.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
