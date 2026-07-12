export interface SanityImage {
  asset: {
    _ref: string;
    _type: 'reference';
  };
  _type: 'image';
  alt?: string;
}

export interface SanityBlogPost {
  _id: string;
  title: string;
  slug: string; // resolved to slug.current in query
  excerpt?: string;
  publishedAt: string;
  _createdAt: string;
  _updatedAt: string;
  mainImage?: SanityImage;
  body?: any[]; // Portable text blocks
}

export async function fetchSanity<T>(query: string): Promise<T | null> {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  const apiVersion = 'v2022-03-07';

  if (!projectId) {
    console.warn('Sanity Project ID is not configured in env.');
    return null;
  }

  const encodedQuery = encodeURIComponent(query);
  const url = `https://apicdn.sanity.io/${apiVersion}/data/query/${dataset}?query=${encodedQuery}`;

  try {
    const response = await fetch(url, {
      next: { revalidate: 60 }, // Cache and revalidate every 60 seconds
    });

    if (!response.ok) {
      console.error(`Failed to fetch from Sanity: ${response.statusText}`);
      return null;
    }

    const json = await response.json();
    return json.result as T;
  } catch (error) {
    console.error('Error fetching from Sanity:', error);
    return null;
  }
}

export async function getBlogPosts(): Promise<SanityBlogPost[]> {
  const query = `*[_type == "post" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _createdAt,
    _updatedAt,
    mainImage
  }`;
  
  const posts = await fetchSanity<SanityBlogPost[]>(query);
  return posts || [];
}

export async function getBlogPostBySlug(slug: string): Promise<SanityBlogPost | null> {
  const query = `*[_type == "post" && slug.current == "${slug}" && !(_id in path("drafts.**"))][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    publishedAt,
    _createdAt,
    _updatedAt,
    mainImage,
    body
  }`;

  return fetchSanity<SanityBlogPost>(query);
}

// Convert Sanity mainImage references to CDN URLs
export function urlFor(source: SanityImage | undefined): string {
  if (!source || !source.asset || !source.asset._ref) return '';
  
  const ref = source.asset._ref; // Format: "image-imageid-1200x800-jpg"
  const parts = ref.split('-');
  if (parts.length < 4) return '';
  
  const id = parts[1];
  const dimensions = parts[2];
  const extension = parts[3];
  
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
  
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${id}-${dimensions}.${extension}`;
}
