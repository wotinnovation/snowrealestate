import Link from "next/link";
import { getPageBySlug } from "./lib/api";

export async function generateMetadata() {
  const pageData = await getPageBySlug('home');
  return {
    title: pageData?.metaTitle || 'Snow Real Estate | Luxury Properties in Dubai',
    description: pageData?.metaDescription || "Exclusive real estate market with Luxury Properties & Prime Locations in Dubai.",
  };
}

import SnowNavbar from "./components/navbar/snow-navbar";
import HeroForm from "./components/form/hero-form";
import HowItsWork from "./components/how-its-work";
import GridPropertyOne from "./components/property/grid-property-one";
import BestLoctionOne from "./components/best-loction-one";
import ClientOne from "./components/client-one";
import PricingOne from "./components/pricing-one";
import Footer from "./components/footer";
import FooterTop from "./components/footer-top";
import ScrollToTop from "./components/scroll-to-top";
import AboutSnow from "./components/about-snow";
import SnowFaqNewsletter from "./components/snow-faq-newsletter";

export default function Home() {
  return (
    <>
      <SnowNavbar />

      {/* ── Hero Banner ── */}
      <div
        className="image-cover hero-banner"
        style={{
          position: 'relative',
          backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('/image/banner/hero.jpg')`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          paddingTop: '40px',
        }}
      >
        {/* Centered hero text */}
        <div className="container text-center" style={{ zIndex: 1, marginBottom: '0' }}>
          <h1 className="text-white mb-2" style={{ fontSize: 'clamp(32px, 6vw, 56px)', fontWeight: '800', lineHeight: 1.1, letterSpacing: '-1px' }}>
            Discover Your <span style={{ color: '#ffcd52' }}>Dream Home</span> In Dubai
          </h1>
          <p className="text-white mb-3" style={{ fontSize: 'clamp(14px, 2.5vw, 18px)', fontWeight: '400', opacity: 0.9, maxWidth: '600px', margin: '0 auto 20px' }}>
            Exclusive real estate market with Luxury Properties & Prime Locations.
          </p>
          <div className="d-none d-md-flex justify-content-center flex-nowrap gap-2">
            <Link href="/properties" className="btn btn-primary px-2 px-md-5 py-md-3 rounded-pill" style={{ fontWeight: 700, fontSize: '15px', padding: '2px 10px', letterSpacing: '0.3px', background: '#caab4d', border: 'none', whiteSpace: 'nowrap' }}>
              Explore Properties
            </Link>
            <Link href="/about-us" className="btn btn-outline-light px-2 px-md-5 py-md-3 rounded-pill" style={{ fontWeight: 700, fontSize: '15px', padding: '2px 10px', letterSpacing: '0.3px', backdropFilter: 'blur(10px)', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', whiteSpace: 'nowrap' }}>
              About Snow
            </Link>
          </div>
        </div>

        {/* Search form with Glassmorphism Container */}
        <div
          className="container hero-form-container"
          style={{
            width: '1200px',
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(12px) saturate(180%)',
            WebkitBackdropFilter: 'blur(12px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            padding: '65px 20px 20px 20px',
          }}
        >
          <HeroForm />
        </div>
      </div>




      <section className="bg-light properties-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10 text-center">
              <div className="sec-heading center">
                <h2>Explore Recent Properties</h2>
                <p>Discover the latest premium properties added to our portfolio across Dubai's most exclusive neighborhoods.</p>
              </div>
            </div>
          </div>

          <GridPropertyOne border={false} />

          <div className="row align-items-center justify-content-center">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
              <Link href="/properties" className="btn btn-primary px-md-5 rounded ">Browse More Properties</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10 text-center">
              <div className="sec-heading center">
                <h2>Explore Prime Locations in the UAE</h2>
                <p>From iconic Dubai Marina to the heart of Abu Dhabi — discover the most sought-after neighbourhoods for living and investing.</p>
              </div>
            </div>
          </div>
          <BestLoctionOne />
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 text-center mt-5">
              <Link href="/properties" className="btn btn-primary px-md-5 rounded">Browse All Locations</Link>
            </div>
          </div>
        </div>
      </section>

      <section>
        <HowItsWork />
      </section>

      <section className="gray">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-7 col-md-10 text-center">
              <div className="sec-heading center">
                <h2>What Our Clients Say</h2>
                <p>Hear from buyers, sellers, and investors who found their perfect property with Snow Real Estate — Dubai's trusted luxury brokerage.</p>
              </div>
            </div>
          </div>
          <ClientOne />
        </div>
      </section>



      {/* ── About Us ── */}
      <AboutSnow />

      {/* ── FAQ & Newsletter ── */}
      <SnowFaqNewsletter />

      <FooterTop bg="theme-bg" />
      <Footer />
      <ScrollToTop />
    </>
  );
}