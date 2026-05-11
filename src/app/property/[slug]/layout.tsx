import { Metadata } from "next";
import { getPropertyBySlug } from "../../lib/api";

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;

  try {
    const property = await getPropertyBySlug(slug);

    if (property) {
      const title = property.metaTitle || `${property.name} | Snow Real Estate`;
      const description =
        property.metaDescription ||
        property.shortDescription ||
        `Discover ${property.name} — a premium ${property.propertyType || "property"} in ${property.location || "Dubai"}. ${property.bedrooms ? property.bedrooms + " bedrooms, " : ""}${property.bathrooms ? property.bathrooms + " bathrooms, " : ""}${property.size ? property.size + " sqft" : ""}. Listed by Snow Real Estate.`;

      return {
        title,
        description,
        openGraph: {
          title,
          description,
          images: property.image ? [{ url: property.image, width: 1200, height: 630 }] : [],
          type: "website",
          siteName: "Snow Real Estate",
        },
        twitter: {
          card: "summary_large_image",
          title,
          description,
          images: property.image ? [property.image] : [],
        },
      };
    }
  } catch (err) {
    console.error("Error generating metadata for property:", err);
  }

  // Fallback
  return {
    title: `Property Details | Snow Real Estate`,
    description:
      "View premium property details, luxury apartments, villas and penthouses in Dubai. Snow Real Estate — your trusted partner in luxury real estate.",
  };
}

export default function PropertyLayout({ children }: Props) {
  return <>{children}</>;
}
