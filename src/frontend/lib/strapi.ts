export interface StrapiImage {
  id: number;
  url: string;
  alternativeText?: string;
}

export interface BlogPost {
  id: string | number;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // Markdown or rich text content
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  coverImage?: StrapiImage;
}

function flattenAttributes(data: any): any {
  if (!data) return null;

  if (Array.isArray(data)) {
    return data.map(flattenAttributes);
  }

  let flattened = {} as any;

  if (data.attributes) {
    flattened = { id: data.id, ...data.attributes };
  } else {
    flattened = { ...data };
  }

  for (const key of Object.keys(flattened)) {
    if (typeof flattened[key] === 'object' && flattened[key] !== null) {
      if (key === 'data' && !Array.isArray(flattened[key]) && flattened[key].attributes) {
        return flattenAttributes(flattened[key]);
      }
      flattened[key] = flattenAttributes(flattened[key]);
    }
  }

  return flattened;
}

export async function fetchStrapi<T>(
  path: string,
  params: Record<string, string> = {}
): Promise<T | null> {
  const strapiUrl = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
  const token = process.env.STRAPI_API_TOKEN;

  const query = new URLSearchParams(params).toString();
  const url = `${strapiUrl}/api/${path}${query ? `?${query}` : ''}`;

  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
      headers,
      next: { revalidate: 60 }, // Cache and revalidate every 60 seconds
    });

    if (!response.ok) {
      console.error(`Failed to fetch from Strapi: ${response.statusText}`);
      return null;
    }

    const json = await response.json();
    return flattenAttributes(json.data) as T;
  } catch (error) {
    console.error('Error fetching from Strapi:', error);
    return null;
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await fetchStrapi<BlogPost[]>('articles', {
    populate: 'coverImage',
    sort: 'publishedAt:desc',
  });
  return posts || [];
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await fetchStrapi<BlogPost[]>('articles', {
    'filters[slug][$eq]': slug,
    populate: 'coverImage',
  });
  return posts && posts.length > 0 ? posts[0] : null;
}

export function getStrapiMediaUrl(url: string | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  const strapiUrl = process.env.STRAPI_URL || 'http://127.0.0.1:1337';
  return `${strapiUrl}${url}`;
}
