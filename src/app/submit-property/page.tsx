'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import SnowNavbar from '../components/navbar/snow-navbar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'

const Select = dynamic(() => import('react-select'), { ssr: false })

const SUBMIT_API = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3201/gql').replace('/gql', '/api/agent-listings/submit');

export default function Page() {
    const [images, setImages] = useState<{ file: File; preview: string }[]>([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ text: '', type: '' });

    const [form, setForm] = useState({
        name: '',
        propertyStatus: 'For Sale',
        propertyType: 'Apartment',
        price: '',
        size: '',
        bedrooms: '1',
        bathrooms: '1',
        address: '',
        city: 'Dubai',
        neighborhood: '',
        floorLevel: '',
        description: '',
        amenities: [] as string[],
        ownerName: '',
        ownerEmail: '',
        ownerPhone: '',
        consentGiven: false
    });

    const [submittedListingID, setSubmittedListingID] = useState('');

    function handleChange(e: any) {
        if (e.target.files) {
            const selectedFiles = Array.from(e.target.files) as File[];
            const newImages = selectedFiles.map(file => ({
                file,
                preview: URL.createObjectURL(file)
            }));
            setImages(prev => [...prev, ...newImages]);
        }
    }

    const removeImage = (index: number) => {
        setImages(prev => {
            const updated = [...prev];
            URL.revokeObjectURL(updated[index].preview);
            updated.splice(index, 1);
            return updated;
        });
    };

    const handleAmenityChange = (amenity: string) => {
        setForm(prev => ({
            ...prev,
            amenities: prev.amenities.includes(amenity)
                ? prev.amenities.filter(a => a !== amenity)
                : [...prev.amenities, amenity]
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.consentGiven) {
            setMessage({ text: 'Please accept the consent to proceed.', type: 'error' });
            return;
        }

        setLoading(true);
        setMessage({ text: '', type: '' });

        try {
            const formData = new FormData();
            
            // Append form fields
            Object.keys(form).forEach(key => {
                if (key === 'amenities') {
                    form.amenities.forEach(amenity => formData.append('amenities', amenity));
                } else {
                    formData.append(key, (form as any)[key]);
                }
            });

            // Append images
            images.forEach(img => {
                formData.append('gallery', img.file);
            });

            const res = await fetch(SUBMIT_API, {
                method: 'POST',
                body: formData
            });

            const data = await res.json();
            if (data.success) {
                setSubmittedListingID(data.listingID);
                window.scrollTo({ top: 0, behavior: 'smooth' });
            } else {
                setMessage({ text: data.error || 'Failed to submit property.', type: 'error' });
            }
        } catch (err) {
            setMessage({ text: 'A network error occurred. Please try again.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const statusOptions = [
        { value: 'For Sale', label: 'For Sale' },
        { value: 'For Rent', label: 'For Rent' },
    ];
    const typeOptions = [
        { value: 'Apartment', label: 'Apartment' },
        { value: 'Villa', label: 'Villa' },
        { value: 'Penthouse', label: 'Penthouse' },
        { value: 'Townhouse', label: 'Townhouse' },
        { value: 'Commercial', label: 'Commercial' },
    ];
    const countOptions = [
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' },
        { value: '6', label: '6+' },
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
                    {submittedListingID ? (
                        <div className="row justify-content-center">
                            <div className="col-lg-8 col-md-12">
                                <div className="text-center p-5 shadow-lg rounded-4" style={{ background: '#fff', borderTop: '5px solid #caab4d' }}>
                                    <div style={{
                                        width: '100px',
                                        height: '100px',
                                        background: 'rgba(202,171,77,0.1)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        margin: '0 auto 30px'
                                    }}>
                                        <i className="fa-solid fa-circle-check" style={{ fontSize: '50px', color: '#caab4d' }}></i>
                                    </div>

                                    <h2 style={{ fontSize: '36px', fontWeight: 800, color: '#1a1a2e', marginBottom: '15px' }}>Submission Successful!</h2>
                                    <p className="text-muted" style={{ fontSize: '18px', lineHeight: 1.6, marginBottom: '40px' }}>
                                        Thank you for listing your property with Snow Real Estate. <br />
                                        Your submission has been received and is currently under review.
                                    </p>

                                    <div className="p-4 rounded-4 mb-5" style={{ background: '#fafafa', border: '1px dashed #caab4d' }}>
                                        <span className="text-uppercase small fw-bold text-muted d-block mb-2" style={{ letterSpacing: '2px' }}>Reference ID</span>
                                        <h3 style={{ fontSize: '32px', fontWeight: 900, color: '#caab4d', margin: 0, letterSpacing: '1px' }}>{submittedListingID}</h3>
                                    </div>

                                    <div className="d-flex flex-column flex-sm-row gap-3 justify-content-center mt-4">
                                        <a href="/properties" className="btn btn-primary px-5 py-3 fw-bold rounded-3" style={{ background: '#caab4d', border: 'none' }}>
                                            Browse Listings
                                        </a>
                                        <button onClick={() => window.location.reload()} className="btn btn-outline-dark px-5 py-3 fw-bold rounded-3">
                                            Submit Another
                                        </button>
                                    </div>

                                    <p className="mt-5 text-muted small">
                                        An email confirmation has been sent to your registered address. <br />
                                        Our agents will contact you within 24 hours.
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="row justify-content-center">
                            <div className="col-lg-10 col-md-12">

                                {message.text && (
                                    <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'} mb-4`} role="alert">
                                        {message.text}
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="submit-page shadow-sm rounded-4 overflow-hidden" style={{ background: '#fff' }}>

                                    <div style={{ background: '#fafafa', padding: '30px 40px', borderBottom: '1px solid #eee' }}>
                                        <h3 style={{ fontSize: '22px', fontWeight: 800, color: '#1a1a2e', marginBottom: '0' }}>Basic Information</h3>
                                    </div>

                                    <div className="p-4 p-md-5">
                                        <div className="submit-section">
                                            <div className="row g-4">
                                                <div className="form-group col-md-12">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Property Title</label>
                                                    <input required type="text" className="form-control bg-light border-0 py-3" placeholder="e.g. Luxury Penthouse in Dubai Marina"
                                                        value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Status</label>
                                                    <Select options={statusOptions} className="border-0" placeholder="Select Status"
                                                        defaultValue={statusOptions[0]}
                                                        onChange={(opt: any) => setForm({ ...form, propertyStatus: opt.value })} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Property Type</label>
                                                    <Select options={typeOptions} className="border-0" placeholder="Show All"
                                                        defaultValue={typeOptions[0]}
                                                        onChange={(opt: any) => setForm({ ...form, propertyType: opt.value })} />
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Price (AED)</label>
                                                    <input required type="number" className="form-control bg-light border-0 py-3" placeholder="AED"
                                                        value={form.price} onChange={e => setForm({ ...form, price: e.target.value })} />
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Area (sq ft)</label>
                                                    <input required type="number" className="form-control bg-light border-0 py-3" placeholder="Sq Ft"
                                                        value={form.size} onChange={e => setForm({ ...form, size: e.target.value })} />
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Bedrooms</label>
                                                    <Select options={countOptions} className="border-0" placeholder="Bedrooms"
                                                        defaultValue={countOptions[0]}
                                                        onChange={(opt: any) => setForm({ ...form, bedrooms: opt.value })} />
                                                </div>

                                                <div className="form-group col-md-6">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Bathrooms</label>
                                                    <Select options={countOptions} className="border-0" placeholder="Bathrooms"
                                                        defaultValue={countOptions[0]}
                                                        onChange={(opt: any) => setForm({ ...form, bathrooms: opt.value })} />
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
                                                    <div className="d-flex flex-wrap gap-3 mb-3">
                                                        {images.map((img, index) => (
                                                            <div key={index} className="position-relative shadow-sm rounded-3 overflow-hidden" style={{ width: '120px', height: '120px' }}>
                                                                <img src={img.preview} alt={`Preview ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                                <button
                                                                    type="button"
                                                                    onClick={() => removeImage(index)}
                                                                    className="btn btn-danger btn-sm position-absolute top-0 end-0 m-1 p-0 d-flex align-items-center justify-content-center"
                                                                    style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255, 91, 91, 0.9)', border: 'none' }}
                                                                >
                                                                    <i className="fa-solid fa-xmark fs-10"></i>
                                                                </button>
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="dropzone dz-clickable primary-dropzone border-dashed rounded-4 p-5 text-center" style={{ border: '2px dashed #caab4d', background: '#fff9f0', position: 'relative' }}>
                                                        <div className='position-absolute w-100 h-100 top-0 bottom-0 start-0'>
                                                            <input type="file" multiple onChange={handleChange} accept="image/png, image/jpeg, image/jpg" style={{ width: '100%', height: '100%', opacity: '0', cursor: 'pointer' }} />
                                                        </div>
                                                        <div className="dz-default dz-message py-2">
                                                            <i className="fa-solid fa-images mb-3" style={{ fontSize: '32px', color: '#caab4d' }}></i>
                                                            <h4 className="fw-bold mb-1 fs-16">Add Property Images</h4>
                                                            <p className="text-muted small mb-0">JPEG, PNG supported. Multiple files allowed.</p>
                                                        </div>
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
                                                    <input required type="text" className="form-control bg-light border-0 py-3"
                                                        value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>City</label>
                                                    <input required type="text" className="form-control bg-light border-0 py-3" placeholder="Dubai"
                                                        value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Area / District</label>
                                                    <input required type="text" className="form-control bg-light border-0 py-3" placeholder="e.g. Dubai Marina"
                                                        value={form.neighborhood} onChange={e => setForm({ ...form, neighborhood: e.target.value })} />
                                                </div>
                                                <div className="form-group col-md-6">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Building / Floor</label>
                                                    <input type="text" className="form-control bg-light border-0 py-3"
                                                        value={form.floorLevel} onChange={e => setForm({ ...form, floorLevel: e.target.value })} />
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
                                                    <textarea required className="form-control bg-light border-0" rows={6} placeholder="Describe the key features and luxury amenities..."
                                                        value={form.description} onChange={e => setForm({ ...form, description: e.target.value })}></textarea>
                                                </div>

                                                <div className="form-group col-md-12">
                                                    <label className='mb-4 fw-bold text-dark small text-uppercase'>Amenities & Features</label>
                                                    <div className="o-features">
                                                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '12px' }}>
                                                            {[
                                                                "Air Conditioning", "Private Pool", "Gym Access", "Sea View",
                                                                "High-speed Internet", "Concierge Service", "Balcony", "Parking",
                                                                "Smart Home", "Security", "Garden", "Kitchen Appliances"
                                                            ].map((feat, index) => {
                                                                const isSelected = form.amenities.includes(feat);
                                                                return (
                                                                    <div
                                                                        key={index}
                                                                        onClick={() => handleAmenityChange(feat)}
                                                                        style={{
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            gap: '12px',
                                                                            padding: '14px 16px',
                                                                            background: isSelected ? '#fffaf2' : '#fff',
                                                                            borderRadius: '12px',
                                                                            border: isSelected ? '1px solid #caab4d' : '1px solid #f0f0f0',
                                                                            cursor: 'pointer',
                                                                            transition: 'all 0.2s ease',
                                                                            boxShadow: isSelected ? '0 4px 12px rgba(202,171,77,0.1)' : 'none'
                                                                        }}
                                                                    >
                                                                        <div style={{
                                                                            width: '20px',
                                                                            height: '20px',
                                                                            borderRadius: '6px',
                                                                            border: isSelected ? 'none' : '2px solid #ddd',
                                                                            background: isSelected ? '#caab4d' : 'transparent',
                                                                            display: 'flex',
                                                                            alignItems: 'center',
                                                                            justifyContent: 'center',
                                                                            transition: 'all 0.2s ease'
                                                                        }}>
                                                                            {isSelected && <i className="fa-solid fa-check" style={{ color: '#fff', fontSize: '10px' }}></i>}
                                                                        </div>
                                                                        <span style={{ 
                                                                            fontSize: '14px', 
                                                                            color: isSelected ? '#1a1a2e' : '#666', 
                                                                            fontWeight: isSelected ? 700 : 500,
                                                                            transition: 'all 0.2s ease'
                                                                        }}>
                                                                            {feat}
                                                                        </span>
                                                                    </div>
                                                                );
                                                            })}
                                                        </div>
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
                                                    <input required type="text" className="form-control bg-light border-0 py-3"
                                                        value={form.ownerName} onChange={e => setForm({ ...form, ownerName: e.target.value })} />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Email Address</label>
                                                    <input required type="email" className="form-control bg-light border-0 py-3"
                                                        value={form.ownerEmail} onChange={e => setForm({ ...form, ownerEmail: e.target.value })} />
                                                </div>
                                                <div className="form-group col-md-4">
                                                    <label className='mb-2 fw-bold text-dark small text-uppercase'>Phone Number</label>
                                                    <input required type="text" className="form-control bg-light border-0 py-3"
                                                        value={form.ownerPhone} onChange={e => setForm({ ...form, ownerPhone: e.target.value })} />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="d-flex align-items-center gap-3 p-4 rounded-4" style={{ background: 'rgba(202,171,77,0.05)', border: '1px solid rgba(202,171,77,0.2)' }}>
                                                <input id="gdpr" className="form-check-input" type="checkbox" style={{ width: '20px', height: '20px' }}
                                                    checked={form.consentGiven} onChange={e => setForm({ ...form, consentGiven: e.target.checked })} />
                                                <label htmlFor="gdpr" className="form-check-label small text-muted">
                                                    I consent to having Snow Real Estate store my information so they can respond to my property submission request.
                                                </label>
                                            </div>
                                        </div>

                                        <div className="mt-5 text-center">
                                            <button
                                                className="btn btn-primary fw-bold px-5 py-3"
                                                type="submit"
                                                disabled={loading}
                                                style={{
                                                    borderRadius: '12px',
                                                    fontSize: '16px',
                                                    letterSpacing: '0.5px',
                                                    background: 'linear-gradient(135deg, #caab4d, #b29640)',
                                                    border: 'none',
                                                    boxShadow: '0 10px 30px rgba(202,171,77,0.3)',
                                                    opacity: loading ? 0.7 : 1
                                                }}
                                            >
                                                {loading ? 'Submitting...' : 'Submit Property For Review'}
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <FooterTop bg="theme-bg" />
            <Footer />
            <ScrollToTop />
        </>
    )
}
