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

export interface HygraphHero {
  id: string;
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  isActive: boolean;
  backgroundImage?: {
    url: string;
  };
}

export interface HygraphPortfolioItem {
  id: string;
  title: string;
  slug: string;
  description?: string;
  projectUrl?: string;
  category: string;
  type?: string;
  coverImage?: {
    url: string;
  };
}

export interface HygraphServiceSubcategory {
  id: string;
  title: string;
  slug: string;
  parentCategory: string;
  description: {
    html: string;
  };
  customHeaderHtml?: {
    html: string;
  };
  customFooterHtml?: {
    html: string;
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
    if (json.errors) {
      console.error('GraphQL Errors:', JSON.stringify(json.errors, null, 2));
    }
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

export async function getHeroes(): Promise<HygraphHero[]> {
  const query = `{
    heroes(where: {isActive: true}) {
      id
      title
      subtitle
      ctaText
      ctaLink
      isActive
      backgroundImage {
        url
      }
    }
  }`;
  const data = await fetchHygraph<{ heroes: HygraphHero[] }>(query);
  return data?.heroes || [];
}

export async function getPortfolioItems(): Promise<HygraphPortfolioItem[]> {
  const query = `{
    portfolioItems(first: 100) {
      id
      title
      slug
      description
      projectUrl
      category
      type
      coverImage {
        url
      }
    }
  }`;
  const data = await fetchHygraph<{ portfolioItems: HygraphPortfolioItem[] }>(query);
  return data?.portfolioItems || [];
}

export async function getServiceSubcategories(): Promise<HygraphServiceSubcategory[]> {
  const query = `{
    serviceSubcategories(first: 100) {
      id
      title
      slug
      parentCategory
    }
  }`;
  const data = await fetchHygraph<{ serviceSubcategories: HygraphServiceSubcategory[] }>(query);
  return data?.serviceSubcategories || [];
}

export async function getServiceSubcategoryBySlug(slug: string): Promise<HygraphServiceSubcategory | null> {
  const query = `{
    serviceSubcategory(where: {slug: "${slug}"}) {
      id
      title
      slug
      parentCategory
      description {
        html
      }
      customHeaderHtml {
        html
      }
      customFooterHtml {
        html
      }
    }
  }`;
  const data = await fetchHygraph<{ serviceSubcategory: HygraphServiceSubcategory }>(query);
  return data?.serviceSubcategory || null;
}

export interface HygraphTeamMember {
  id: string;
  name: string;
  role: string;
  bio?: string;
  image?: {
    url: string;
  };
  order?: number;
  isActive?: boolean;
}

export async function getTeamMembers(): Promise<HygraphTeamMember[]> {
  const query = `{
    teamMembers(orderBy: order_ASC, where: {isActive: true}) {
      id
      name
      role
      bio
      image {
        url
      }
      order
      isActive
    }
  }`;
  
  try {
    const data = await fetchHygraph<{ teamMembers: HygraphTeamMember[] }>(query);
    if (data?.teamMembers && data.teamMembers.length > 0) {
      return data.teamMembers;
    }
  } catch (err) {
    console.warn('Standard teamMembers query failed, trying fallback query:', err);
  }

  // Fallback query in case order or isActive are missing/different in schema
  const fallbackQuery = `{
    teamMembers {
      id
      name
      role
      bio
      image {
        url
      }
    }
  }`;

  try {
    const data = await fetchHygraph<{ teamMembers: HygraphTeamMember[] }>(fallbackQuery);
    return data?.teamMembers || [];
  } catch (err) {
    console.error('Fallback teamMembers query also failed:', err);
    return [];
  }
}

