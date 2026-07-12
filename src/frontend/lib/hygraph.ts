export interface HygraphPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  date?: string;
  createdAt: string;
  publishedAt: string;
  content: {
    html: string;
  };
  coverImage?: {
    url: string;
  };
}

export async function fetchHygraph<T>(query: string): Promise<T | null> {
  const apiUrl = process.env.HYGRAPH_API_URL;
  if (!apiUrl) {
    console.warn('HYGRAPH_API_URL is not configured in env.');
    return null;
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      next: { revalidate: 60 }, // Cache and revalidate every 60 seconds
    });

    if (!response.ok) {
      const errBody = await response.text().catch(() => '');
      console.error(`Failed to fetch from Hygraph. Status: ${response.status} (${response.statusText}). Body: ${errBody}`);
      return null;
    }

    const json = await response.json();
    return json.data as T;
  } catch (error) {
    console.error('Error fetching from Hygraph:', error);
    return null;
  }
}

export async function getBlogPosts(): Promise<HygraphPost[]> {
  const query = `{
    posts(orderBy: publishedAt_DESC) {
      id
      title
      slug
      excerpt
      createdAt
      publishedAt
      coverImage {
        url
      }
    }
  }`;
  const data = await fetchHygraph<{ posts: HygraphPost[] }>(query);
  return data?.posts || [];
}

export async function getBlogPostBySlug(slug: string): Promise<HygraphPost | null> {
  const query = `{
    post(where: {slug: "${slug}"}) {
      id
      title
      slug
      excerpt
      createdAt
      publishedAt
      content {
        html
      }
      coverImage {
        url
      }
    }
  }`;
  const data = await fetchHygraph<{ post: HygraphPost }>(query);
  return data?.post || null;
}
