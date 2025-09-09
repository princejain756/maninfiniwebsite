// Sitemap Generator Utility for ManInfini
// This utility helps generate and update sitemaps automatically

import { blogPosts } from '../data/blogPosts';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const BASE_URL = 'https://maninfini.com';

// Format date to W3C datetime format
const formatDate = (date: Date = new Date()): string => {
  return date.toISOString();
};

// Generate XML for a single URL entry
const generateUrlXml = (url: SitemapUrl): string => {
  let xml = '  <url>\n';
  xml += `    <loc>${url.loc}</loc>\n`;
  xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
  
  // Note: changefreq and priority are deprecated and ignored by Google
  // We're not including them in new sitemaps
  
  xml += '  </url>\n';
  return xml;
};

// Generate sitemap XML
const generateSitemapXml = (urls: SitemapUrl[]): string => {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  urls.forEach(url => {
    xml += generateUrlXml(url);
  });
  
  xml += '</urlset>';
  return xml;
};

// Generate sitemap index XML
export const generateSitemapIndex = (): string => {
  const sitemaps = [
    { loc: `${BASE_URL}/sitemap-pages.xml`, lastmod: formatDate() },
    { loc: `${BASE_URL}/sitemap-services.xml`, lastmod: formatDate() },
    { loc: `${BASE_URL}/sitemap-blog-posts.xml`, lastmod: formatDate() },
    { loc: `${BASE_URL}/sitemap-blog-categories.xml`, lastmod: formatDate() },
    { loc: `${BASE_URL}/sitemap-images.xml`, lastmod: formatDate() },
    { loc: `${BASE_URL}/sitemap-videos.xml`, lastmod: formatDate() },
    { loc: `${BASE_URL}/feed.xml`, lastmod: formatDate() }
  ];

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  sitemaps.forEach(sitemap => {
    xml += '  <sitemap>\n';
    xml += `    <loc>${sitemap.loc}</loc>\n`;
    xml += `    <lastmod>${sitemap.lastmod}</lastmod>\n`;
    xml += '  </sitemap>\n';
  });
  
  xml += '</sitemapindex>';
  return xml;
};

// Generate pages sitemap
export const generatePagesSitemap = (): string => {
  const pages: SitemapUrl[] = [
    { loc: `${BASE_URL}/`, lastmod: formatDate() },
    { loc: `${BASE_URL}/about`, lastmod: formatDate() },
    { loc: `${BASE_URL}/services`, lastmod: formatDate() },
    { loc: `${BASE_URL}/contact`, lastmod: formatDate() },
    { loc: `${BASE_URL}/blog`, lastmod: formatDate() },
    { loc: `${BASE_URL}/privacy-policy`, lastmod: formatDate() },
    { loc: `${BASE_URL}/terms-of-service`, lastmod: formatDate() },
    { loc: `${BASE_URL}/cookie-policy`, lastmod: formatDate() }
  ];
  
  return generateSitemapXml(pages);
};

// Generate services sitemap
export const generateServicesSitemap = (): string => {
  const services = [
    'web-development',
    'graphic-design',
    'ecommerce-inventory',
    'whatsapp-communications',
    'virtual-office',
    'offshore-talent',
    'quantiti',
    'cyber-cloud',
    'cloud-solutions'
  ];
  
  const serviceUrls: SitemapUrl[] = services.map(service => ({
    loc: `${BASE_URL}/services/${service}`,
    lastmod: formatDate()
  }));
  
  return generateSitemapXml(serviceUrls);
};

// Generate blog posts sitemap
export const generateBlogPostsSitemap = (): string => {
  const blogUrls: SitemapUrl[] = blogPosts.map(post => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: formatDate(new Date(post.publishedDate))
  }));
  
  // Add legacy blog posts
  const legacyPosts = [
    'future-business-automation-ai-solutions',
    'digital-transformation-manufacturing-strategies',
    'rpa-vs-ai-differences-use-cases',
    'building-scalable-custom-software-solutions'
  ];
  
  legacyPosts.forEach(slug => {
    blogUrls.push({
      loc: `${BASE_URL}/blog/${slug}`,
      lastmod: formatDate()
    });
  });
  
  return generateSitemapXml(blogUrls);
};

// Generate categories sitemap
export const generateCategoriesSitemap = (): string => {
  const categories = [
    'business-automation',
    'manufacturing',
    'technology',
    'software-development',
    'ai-machine-learning',
    'cybersecurity',
    'healthcare-technology',
    'voice-technology',
    'quantum-computing',
    'edge-computing'
  ];
  
  const categoryUrls: SitemapUrl[] = categories.map(category => ({
    loc: `${BASE_URL}/blog/category/${category}`,
    lastmod: formatDate()
  }));
  
  return generateSitemapXml(categoryUrls);
};

// Generate RSS feed
export const generateRssFeed = (): string => {
  const recentPosts = blogPosts.slice(0, 10); // Get 10 most recent posts
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:content="http://purl.org/rss/1.0/modules/content/" ';
  xml += 'xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:atom="http://www.w3.org/2005/Atom" ';
  xml += 'xmlns:media="http://search.yahoo.com/mrss/">\n';
  xml += '<channel>\n';
  xml += '<title>ManInfini Business Solutions Blog</title>\n';
  xml += `<link>${BASE_URL}/blog</link>\n`;
  xml += '<description>Latest insights on business automation, AI, cybersecurity, and technology trends from ManInfini experts</description>\n';
  xml += '<language>en-us</language>\n';
  xml += '<copyright>Copyright © 2025 ManInfini Business Solutions. All rights reserved.</copyright>\n';
  xml += `<lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
  xml += `<atom:link href="${BASE_URL}/feed.xml" rel="self" type="application/rss+xml" />\n`;
  
  recentPosts.forEach(post => {
    xml += '<item>\n';
    xml += `<title>${escapeXml(post.title)}</title>\n`;
    xml += `<link>${BASE_URL}/blog/${post.slug}</link>\n`;
    xml += `<guid isPermaLink="true">${BASE_URL}/blog/${post.slug}</guid>\n`;
    xml += `<description>${escapeXml(post.excerpt)}</description>\n`;
    xml += `<pubDate>${new Date(post.publishedDate).toUTCString()}</pubDate>\n`;
    xml += `<dc:creator>${escapeXml(post.author)}</dc:creator>\n`;
    xml += `<category>${escapeXml(post.category)}</category>\n`;
    
    if (post.image) {
      xml += `<media:content url="${BASE_URL}${post.image}" type="image/jpeg" medium="image">\n`;
      xml += `<media:title>${escapeXml(post.title)}</media:title>\n`;
      xml += '</media:content>\n';
    }
    
    xml += '</item>\n';
  });
  
  xml += '</channel>\n';
  xml += '</rss>';
  
  return xml;
};

// Helper function to escape XML special characters
const escapeXml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
};

// Main function to generate all sitemaps
export const generateAllSitemaps = () => {
  return {
    'sitemap-index.xml': generateSitemapIndex(),
    'sitemap-pages.xml': generatePagesSitemap(),
    'sitemap-services.xml': generateServicesSitemap(),
    'sitemap-blog-posts.xml': generateBlogPostsSitemap(),
    'sitemap-blog-categories.xml': generateCategoriesSitemap(),
    'feed.xml': generateRssFeed()
  };
};

// Export for use in build process
export default {
  generateAllSitemaps,
  generateSitemapIndex,
  generatePagesSitemap,
  generateServicesSitemap,
  generateBlogPostsSitemap,
  generateCategoriesSitemap,
  generateRssFeed
}; 