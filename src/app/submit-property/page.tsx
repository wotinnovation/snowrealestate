'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import SnowNavbar from '../components/navbar/snow-navbar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

const Select = dynamic(()=>import('react-select'),{ssr:false})

export default function Page() {

    const [file, setFile] = useState('');

    function handleChange(e:any) {
      if (e.target.files && e.target.files[0]) {
        setFile(URL.createObjectURL(e.target.files[0]));
      }
    }

    const statusOptions = [
        { value: 'rent', label: 'For Rent' },
        { value: 'sale', label: 'For Sale' },
    ];
    const typeOptions = [
        { value: 'apartment', label: 'Apartment' },
        { value: 'villa', label: 'Villa' },
        { value: 'penthouse', label: 'Penthouse' },
        { value: 'townhouse', label: 'Townhouse' },
        { value: 'commercial', label: 'Commercial' },
    ];
    const countOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6+', label: '6+' },
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
                            List Your Property
                        </div>
                        <h2 className="ipt-title" style={{ color: '#1a1a2e', fontSize: '48px', fontWeight: 800, marginBottom: '15px', letterSpacing: '-1px' }}>
                            Join Our <span style={{ color: '#caab4d' }}>Portfolio</span>
                        </h2>
                        <p style={{ color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                            Submit your property to be featured in our exclusive collection of high-end real estate in Dubai.
                        </p>
                    </div>
                </div>
            </div>
        </div> 

        <section className="bg-light">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10 col-md-12">
                        
                        <div className="submit-page shadow-sm rounded-4 overflow-hidden" style={{ background: '#fff' }}>
                            
                            <div style={{ background: '#fafafa', padding: '30px 40px', borderBottom: '1px solid #eee' }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '0' }}>Basic Information</h3>
                            </div>
                            
                            <div className="p-4 p-md-5">
                                <div className="submit-section">
                                    <div className="row g-4">
                                        <div className="form-group col-md-12">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Property Title</label>
                                            <input type="text" className="form-control bg-light border-0 py-3" placeholder="e.g. Luxury Penthouse in Dubai Marina"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Status</label>
                                            <Select options={statusOptions} className="border-0" placeholder="Select Status"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Property Type</label>
                                            <Select options={typeOptions} className="border-0" placeholder="Show All"/>
                                        </div>
                                        
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Price (AED)</label>
                                            <input type="text" className="form-control bg-light border-0 py-3" placeholder="AED"/>
                                        </div>
                                        
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Area (sq ft)</label>
                                            <input type="text" className="form-control bg-light border-0 py-3" placeholder="Sq Ft"/>
                                        </div>
                                        
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Bedrooms</label>
                                            <Select options={countOptions} className="border-0" placeholder="Bedrooms"/>
                                        </div>
                                        
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Bathrooms</label>
                                            <Select options={countOptions} className="border-0" placeholder="Bathrooms"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ background: '#fafafa', padding: '30px 40px', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '0' }}>Gallery</h3>
                            </div>
                            
                            <div className="p-4 p-md-5">
                                <div className="submit-section">
                                    <div className="row">
                                        <div className="form-group col-md-12">
                                            <div className="dropzone dz-clickable primary-dropzone border-dashed rounded-4 p-5 text-center" style={{ border: '2px dashed #ddd', background: '#fcfcfc', position: 'relative' }}>
                                                <div className='position-absolute w-100 h-100 top-0 bottom-0 start-0'>
                                                    <input type="file" onChange={handleChange} style={{width:'100%', height:'100%', opacity:'0', cursor: 'pointer'}}/>
                                                </div>
                                                {file ? (
                                                    <div className='dz-image d-flex justify-content-center'>
                                                        <img src={file} alt='' style={{width:'180px', height:'180px', borderRadius:'15px', objectFit: 'cover'}}/>
                                                    </div>
                                                ) : (
                                                    <div className="dz-default dz-message py-4">
                                                        <i className="fa-solid fa-cloud-arrow-up text-primary mb-3" style={{ fontSize: '40px', color: '#caab4d' }}></i>
                                                        <h4 className="fw-bold mb-1">Click to upload or drag and drop</h4>
                                                        <p className="text-muted small">Upload high-resolution images for better visibility</p>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ background: '#fafafa', padding: '30px 40px', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '0' }}>Location</h3>
                            </div>
                            
                            <div className="p-4 p-md-5">
                                <div className="submit-section">
                                    <div className="row g-4">
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Address</label>
                                            <input type="text" className="form-control bg-light border-0 py-3"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>City</label>
                                            <input type="text" className="form-control bg-light border-0 py-3" placeholder="Dubai"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Area / District</label>
                                            <input type="text" className="form-control bg-light border-0 py-3" placeholder="e.g. Dubai Marina"/>
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Building / Floor</label>
                                            <input type="text" className="form-control bg-light border-0 py-3"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ background: '#fafafa', padding: '30px 40px', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '0' }}>Detailed Information</h3>
                            </div>
                            
                            <div className="p-4 p-md-5">
                                <div className="submit-section">
                                    <div className="row g-4">
                                        <div className="form-group col-md-12">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Description</label>
                                            <textarea className="form-control bg-light border-0" rows={6} placeholder="Describe the key features and luxury amenities..."></textarea>
                                        </div>
                                        
                                        <div className="form-group col-md-12">
                                            <label className='mb-4 fw-bold text-dark small text-uppercase'>Amenities & Features</label>
                                            <div className="o-features">
                                                <ul className="no-ul-list third-row" style={{ listStyle: 'none', padding: 0, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
                                                    {[
                                                        "Air Conditioning", "Private Pool", "Gym Access", "Sea View", 
                                                        "High-speed Internet", "Concierge Service", "Balcony", "Parking", 
                                                        "Smart Home", "Security", "Garden", "Kitchen Appliances"
                                                    ].map((feat, index) => (
                                                        <li key={index}>
                                                            <input id={`feat-${index}`} className="form-check-input me-2" type="checkbox"/>
                                                            <label htmlFor={`feat-${index}`} className="form-check-label text-muted small">{feat}</label>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div style={{ background: '#fafafa', padding: '30px 40px', borderBottom: '1px solid #eee', borderTop: '1px solid #eee' }}>
                                <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '0' }}>Contact Information</h3>
                            </div>
                            
                            <div className="p-4 p-md-5">
                                <div className="submit-section mb-5">
                                    <div className="row g-4">
                                        <div className="form-group col-md-4">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Full Name</label>
                                            <input type="text" className="form-control bg-light border-0 py-3"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Email Address</label>
                                            <input type="email" className="form-control bg-light border-0 py-3"/>
                                        </div>
                                        <div className="form-group col-md-4">
                                            <label className='mb-2 fw-bold text-dark small text-uppercase'>Phone Number</label>
                                            <input type="text" className="form-control bg-light border-0 py-3"/>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <div className="d-flex align-items-center gap-3 p-4 rounded-4" style={{ background: 'rgba(202,171,77,0.05)', border: '1px solid rgba(202,171,77,0.2)' }}>
                                        <input id="gdpr" className="form-check-input" type="checkbox" style={{ width: '20px', height: '20px' }}/>
                                        <label htmlFor="gdpr" className="form-check-label small text-muted">
                                            I consent to having Snow Real Estate store my information so they can respond to my property submission request.
                                        </label>
                                    </div>
                                </div>
                                
                                <div className="mt-5 text-center">
                                    <button 
                                        className="btn btn-primary fw-bold px-5 py-3" 
                                        type="button" 
                                        style={{ 
                                            borderRadius: '12px', 
                                            fontSize: '16px', 
                                            letterSpacing: '0.5px',
                                            background: 'linear-gradient(135deg, #caab4d, #b29640)',
                                            border: 'none',
                                            boxShadow: '0 10px 30px rgba(202,171,77,0.3)'
                                        }}
                                    >
                                        Submit Property For Review
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <FooterTop bg="theme-bg"/>
        <Footer/>
        <ScrollToTop/>
    </>
  )
}
