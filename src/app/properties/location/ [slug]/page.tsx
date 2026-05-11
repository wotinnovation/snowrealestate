import React, { Suspense } from 'react'
import SnowNavbar from '../../../components/navbar/snow-navbar'
import FooterTop from '../../../components/footer-top'
import Footer from '../../../components/footer'
import ScrollToTop from '../../../components/scroll-to-top'
import PropertiesClient from '../../../components/properties/properties-client'
import { getCommunities } from '../../../lib/api'

// This component helps bridge the slug to the name filter
async function LocationPropertiesContent({ slug }: { slug: string }) {
  const communities = await getCommunities();
  const community = communities.find(c => c.slug === slug);
  const communityName = community ? community.name : "";

  return <PropertiesClient initialLocation={communityName} />;
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const communities = await getCommunities();
  const community = communities.find(c => c.slug === params.slug);
  
  return {
    title: community ? `Properties in ${community.name} | Snow Real Estate` : 'Properties by Location | Snow Real Estate',
    description: community?.description || `Explore luxury properties in ${community?.name || 'Dubai'}. Find your perfect home with Snow Real Estate.`,
  };
}

export default function LocationPropertiesPage({ params }: { params: { slug: string } }) {
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
                Properties in <span style={{ color: '#caab4d' }}>{params.slug.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}</span>
              </h2>
              <span className="ipn-subtitle" style={{ color: '#666', fontSize: '16px', fontWeight: 500 }}>
                Discover exclusive listings in your preferred neighborhood
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Filter Section */}
      <section className="bg-light position-relative pt-0" style={{ paddingTop: '0 !important' }}>
        <Suspense fallback={<div className="container py-5 text-center">Loading properties...</div>}>
          <LocationPropertiesContent slug={params.slug} />
        </Suspense>
      </section>

      <FooterTop bg="theme-bg"/>
      <Footer/>
      <ScrollToTop/>
    </>
  )
}
