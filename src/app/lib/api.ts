const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3201/gql';

// ── Types ────────────────────────────────────────────────
export interface ApiProperty {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  image: string;
  gallery: string[];
  price: number;
  regularPrice: number;
  salePrice: number;
  status: string;
  isFeatured: boolean;

  // Real Estate fields
  propertyId: string;
  propertyType: string;
  propertyStatus: string;
  size: number;
  furnishing: string;
  developer: string;
  completionStatus: string;
  view: string;
  neighborhood: string;
  floorPlan: string;
  videoTour: string;
  roi: string;
  parking: number;
  floorLevel: string;
  serviceCharge: string;
  paymentPlan: string;
  yearBuilt: number;
  dewa: string;
  location: string;
  whatsapp: string;
  latitude: string;
  longitude: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  tags: string[];
  attributes: { name: string, options: string[] }[];
  address: string;
  duration: string;

  metaTitle: string;
  metaDescription: string;
  createdAt: string;
}

export interface ApiSettings {
  siteName: string;
  siteEmail: string;
  sitePhone: string;
  siteAddress: string;
  currency: string;
  vatPercentage: number;
}

// ── Generic GraphQL Fetcher ──────────────────────────────
async function gqlFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  const json = await res.json();
  if (json.errors) {
    console.error('GraphQL errors:', json.errors);
    throw new Error(json.errors[0]?.message || 'GraphQL Error');
  }
  return json.data;
}

// ── Property Fields Fragment ─────────────────────────────
const PROPERTY_CARD_FIELDS = `
  id
  name
  slug
  image
  gallery
  price
  regularPrice
  salePrice
  status
  isFeatured
  propertyId
  propertyType
  propertyStatus
  size
  furnishing
  neighborhood
  location
  bedrooms
  bathrooms
  parking
  floorLevel
  amenities
  address
  duration
  roi
  serviceCharge
  paymentPlan
  completionStatus
  description
  shortDescription
  tags
  attributes {
    name
    options
  }
`;

const PROPERTY_DETAIL_FIELDS = `
  ${PROPERTY_CARD_FIELDS}
  developer
  view
  floorPlan
  videoTour
  yearBuilt
  dewa
  whatsapp
  latitude
  longitude
  ownerName
  ownerPhone
  ownerEmail
  metaTitle
  metaDescription
  createdAt
`;

// ── Queries ──────────────────────────────────────────────

export async function getFeaturedProperties(limit = 6): Promise<ApiProperty[]> {
  const data = await gqlFetch<{ featuredProducts: ApiProperty[] }>(`
    query FeaturedProperties($limit: Int) {
      featuredProducts(limit: $limit) {
        ${PROPERTY_CARD_FIELDS}
      }
    }
  `, { limit });
  return data.featuredProducts;
}

export interface PaginatedProperties {
  items: ApiProperty[];
  totalCount: number;
  totalPages: number;
}

export async function getProperties(params: {
  page?: number;
  limit?: number;
  propertyType?: string;
  propertyStatus?: string;
  location?: string;
  bedrooms?: number;
  maxPrice?: number;
  sort?: string;
}): Promise<PaginatedProperties> {
  const { page = 1, limit = 9, propertyType, propertyStatus, location, bedrooms, maxPrice, sort } = params;
  
  const data = await gqlFetch<{ products: { products: ApiProperty[]; total: number; pages: number } }>(`
    query GetProperties($page: Int, $limit: Int, $propertyType: String, $propertyStatus: String, $location: String, $bedrooms: Int, $maxPrice: Float, $sort: String) {
      products(page: $page, limit: $limit, propertyType: $propertyType, propertyStatus: $propertyStatus, location: $location, bedrooms: $bedrooms, maxPrice: $maxPrice, sort: $sort) {
        products {
          ${PROPERTY_CARD_FIELDS}
        }
        total
        pages
      }
    }
  `, {
    page,
    limit,
    propertyType,
    propertyStatus,
    location,
    bedrooms,
    maxPrice,
    sort
  });
  
  return {
    items: data.products.products,
    totalCount: data.products.total,
    totalPages: data.products.pages
  };
}

export async function getFilterOptions(): Promise<{ propertyTypes: string[]; communities: string[] }> {
  const data = await gqlFetch<{ filterOptions: { propertyTypes: string[]; communities: string[] } }>(`
    query {
      filterOptions {
        propertyTypes
        communities
      }
    }
  `);
  return data.filterOptions;
}

export async function getPropertyBySlug(slug: string): Promise<ApiProperty | null> {
  console.log('Searching for property slug:', slug);
  const data = await gqlFetch<{ product: ApiProperty | null }>(`
    query PropertyBySlug($slug: String) {
      product(slug: $slug) {
        ${PROPERTY_DETAIL_FIELDS}
      }
    }
  `, { slug });
  console.log('Property result for', slug, ':', data.product ? 'Found' : 'Not Found');
  return data.product;
}

export async function getPropertyById(id: string): Promise<ApiProperty | null> {
  const data = await gqlFetch<{ product: ApiProperty | null }>(`
    query PropertyById($id: ID) {
      product(id: $id) {
        ${PROPERTY_DETAIL_FIELDS}
      }
    }
  `, { id });
  return data.product;
}

export async function getSettings(): Promise<ApiSettings | null> {
  const data = await gqlFetch<{ settings: ApiSettings | null }>(`
    query { settings { siteName siteEmail sitePhone siteAddress currency vatPercentage } }
  `);
  return data.settings;
}

export interface ApiPage {
  id: string;
  title: string;
  slug: string;
  content: string;
  image: string;
  metaTitle: string;
  metaDescription: string;
  metaKeywords: string;
}

export async function getPageBySlug(slug: string): Promise<ApiPage | null> {
  const data = await gqlFetch<{ page: ApiPage | null }>(`
    query PageBySlug($slug: String) {
      page(slug: $slug) {
        id
        title
        slug
        content
        image
        metaTitle
        metaDescription
        metaKeywords
      }
    }
  `, { slug });
  return data.page;
}
