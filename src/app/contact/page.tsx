import React from 'react';
import Link from 'next/link';
import SnowNavbar from '../components/navbar/snow-navbar';
import FooterTop from '../components/footer-top';
import Footer from '../components/footer';
import ScrollToTop from '../components/scroll-to-top';
import ContactSnow from '../components/contact-snow';
import { getPageBySlug } from '../lib/api';

export async function generateMetadata() {
  const pageData = await getPageBySlug('contact');
  return {
    title: pageData?.metaTitle || 'Contact Us | Snow Real Estate',
    description: pageData?.metaDescription || "Get in touch with Snow Real Estate. We're here to help you invest, buy, or manage your luxury property in Dubai.",
  };
}

export default function ContactPage() {
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
                <span style={{ color: '#1a1a2e' }}>Contact</span>
              </div>
              <h2 className="ipt-title" style={{ color: '#1a1a2e', fontSize: '48px', fontWeight: 800, marginBottom: '15px', letterSpacing: '-1px' }}>
                Get In <span style={{ color: '#caab4d' }}>Touch</span>
              </h2>
              <p style={{ color: '#666', fontSize: '18px', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                Have questions about Dubai real estate? Our expert team is ready to guide you.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Section reused from homepage */}
      <ContactSnow />

      <FooterTop bg="theme-bg" />
      <Footer />
      <ScrollToTop />
    </>
  );
}
