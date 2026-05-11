import { getPropertyBySlug } from '../../lib/api';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const property = await getPropertyBySlug(slug);
  
  if (!property) {
    return {
      title: 'Property Not Found | Snow Real Estate',
    };
  }

  return {
    title: property.metaTitle || `${property.name} | Snow Real Estate`,
    description: property.metaDescription || property.shortDescription || `View details for ${property.name} in ${property.location}. Luxury real estate in Dubai.`,
    openGraph: {
      title: property.name,
      description: property.shortDescription,
      images: property.image ? [{ url: property.image }] : [],
    },
  };
}

export default function PropertyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
