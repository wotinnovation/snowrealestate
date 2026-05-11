import React, { Suspense } from 'react'
import SnowNavbar from '../components/navbar/snow-navbar'
import FooterTop from '../components/footer-top'
import Footer from '../components/footer'
import ScrollToTop from '../components/scroll-to-top'
import PropertiesClient from '../components/properties/properties-client'

import { getPageBySlug } from '../lib/api';

export async function generateMetadata() {
  const pageData = await getPageBySlug('properties');
  return {
    title: pageData?.metaTitle || 'Luxury Properties for Sale & Rent in Dubai | Snow Real Estate',
    description: pageData?.metaDescription || 'Explore our exclusive collection of luxury apartments, villas, and penthouses in Dubai. Find your next premium investment with Snow Real Estate.',
  };
}

export default function PropertiesPage() {
  return (
    <>
      <SnowNavbar />

      {/* Spacer for fixed glass navbar */}
      <div style={{ height: '80px', background: '#fff' }} />

      {/* Page Title */}
      <div className="image-cover page-title" style={{ background: '#fff', padding: '80px 0 40px', borderBottom: '1px solid #eee' }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 text-center">
              <h2 className="ipt-title" style={{ color: '#1a1a2e', fontSize: '42px', fontWeight: 800, marginBottom: '10px' }}>
                Browse <span style={{ color: '#caab4d' }}>Properties</span>
              </h2>
              <span className="ipn-subtitle" style={{ color: '#666', fontSize: '16px', fontWeight: 500 }}>
                Find your perfect luxury home in the UAE
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Filter Section */}
      <section className="bg-light position-relative pt-0" style={{ paddingTop: '0 !important' }}>
        <Suspense fallback={<div className="container py-5 text-center">Loading properties...</div>}>
          <PropertiesClient />
        </Suspense>
      </section>

      <FooterTop bg="theme-bg"/>
      <Footer/>
      <ScrollToTop/>
    </>
  )
}
