interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

interface BlogPost {
  slug: string;
  title: string;
  publishedAt: string;
  updatedAt?: string;
  category?: string;
}

export class SitemapGenerator {
  private baseUrl: string;
  private urls: SitemapUrl[] = [];

  constructor(baseUrl: string = 'https://maninfini.com') {
    this.baseUrl = baseUrl;
  }

  addUrl(loc: string, lastmod: string, changefreq: SitemapUrl['changefreq'] = 'weekly', priority: number = 0.5): void {
    this.urls.push({
      loc: `${this.baseUrl}${loc}`,
      lastmod,
      changefreq,
      priority
    });
  }

  addBlogPosts(posts: BlogPost[]): void {
    posts.forEach(post => {
      this.addUrl(
        `/blog/${post.slug}`,
        post.updatedAt || post.publishedAt,
        'monthly',
        0.8
      );
    });
  }

  generate(): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetHeader = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
    const urlsetFooter = '</urlset>';

    const urlElements = this.urls.map(url => {
      return `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority}</priority>
  </url>`;
    }).join('\n');

    return `${xmlHeader}
${urlsetHeader}
${urlElements}
${urlsetFooter}`;
  }

  // Generate static sitemap with common pages
  static generateStaticSitemap(): string {
    const generator = new SitemapGenerator();
    const today = new Date().toISOString().split('T')[0];

    // Core pages
    generator.addUrl('/', today, 'weekly', 1.0);
    generator.addUrl('/blog', today, 'daily', 0.9);
    generator.addUrl('/privacy-policy', today, 'yearly', 0.3);
    generator.addUrl('/terms-of-service', today, 'yearly', 0.3);

    // Service pages (if they exist)
    generator.addUrl('/services', today, 'monthly', 0.9);
    generator.addUrl('/about', today, 'monthly', 0.8);
    generator.addUrl('/contact', today, 'monthly', 0.8);

    // Blog categories
    generator.addUrl('/blog/category/business-automation', today, 'weekly', 0.7);
    generator.addUrl('/blog/category/manufacturing', today, 'weekly', 0.7);
    generator.addUrl('/blog/category/technology', today, 'weekly', 0.7);
    generator.addUrl('/blog/category/software-development', today, 'weekly', 0.7);

    return generator.generate();
  }
}

// Sample blog posts data
export const sampleBlogPosts: BlogPost[] = [
  {
    slug: 'future-business-automation-ai-solutions',
    title: 'Future of Business Automation: AI Solutions',
    publishedAt: '2024-01-15',
    category: 'business-automation'
  },
  {
    slug: 'digital-transformation-manufacturing-strategies',
    title: 'Digital Transformation in Manufacturing: Key Strategies',
    publishedAt: '2024-01-10',
    category: 'manufacturing'
  },
  {
    slug: 'rpa-vs-ai-differences-use-cases',
    title: 'RPA vs AI: Understanding the Differences and Use Cases',
    publishedAt: '2024-01-05',
    category: 'technology'
  },
  {
    slug: 'building-scalable-custom-software-solutions',
    title: 'Building Scalable Custom Software Solutions',
    publishedAt: '2024-01-01',
    category: 'software-development'
  }
]; 