import { getPageBySlug } from '../lib/api';

export async function generateMetadata() {
  const pageData = await getPageBySlug('about-us');
  return {
    title: pageData?.metaTitle || 'About Us | Snow Real Estate',
    description: pageData?.metaDescription || "Learn about Snow Real Estate Brokerage, our 12+ years of experience in Dubai's luxury property market, and our commitment to transparency and excellence.",
  };
}

export default function AboutUsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
