import { getPageBySlug } from '../lib/api';

export async function generateMetadata() {
  const pageData = await getPageBySlug('submit-property');
  return {
    title: pageData?.metaTitle || 'List Your Property | Snow Real Estate',
    description: pageData?.metaDescription || "Submit your property to be featured in our exclusive collection of high-end real estate in Dubai.",
  };
}

export default function SubmitPropertyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
