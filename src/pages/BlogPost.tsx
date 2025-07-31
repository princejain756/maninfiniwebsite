import { useParams, Navigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import ArticleSchema from '@/components/ArticleSchema';
import Breadcrumb from '@/components/Breadcrumb';
import { getBlogPostBySlug, blogPosts } from '@/data/blogPosts';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();

  // Get the blog post by slug
  const blogPost = slug ? getBlogPostBySlug(slug) : undefined;

  // If post doesn't exist, redirect to 404
  if (!blogPost) {
    return <Navigate to="/404" replace />;
  }

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: blogPost.category, url: `/blog/category/${blogPost.category.toLowerCase().replace(/\s+/g, '-')}` },
    { name: blogPost.title, url: `/blog/${blogPost.slug}` }
  ];

  return (
    <>
      <SEO 
        title={`${blogPost.title} | Maninfini Automation Blog`}
        description={blogPost.excerpt}
        keywords={blogPost.tags.join(', ')}
        url={`https://maninfini.com/blog/${blogPost.slug}`}
        image={blogPost.image}
        type="article"
        author={blogPost.author}
        publishedTime={blogPost.publishedDate}
        modifiedTime={blogPost.updatedDate}
        section={blogPost.category}
        tags={blogPost.tags}
      />
      <ArticleSchema 
        title={blogPost.title}
        description={blogPost.excerpt}
        content={blogPost.content}
        author={blogPost.author}
        publishedDate={blogPost.publishedDate}
        updatedDate={blogPost.updatedDate}
        image={blogPost.image}
        url={`https://maninfini.com/blog/${blogPost.slug}`}
        category={blogPost.category}
        tags={blogPost.tags}
        readTime={blogPost.readTime}
      />
      <Breadcrumb items={breadcrumbItems} />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-32">
          <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Hero Image */}
            <div className="relative h-64 md:h-96">
              <img 
                src={blogPost.image} 
                alt={blogPost.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-2">
                  <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-0.5 rounded">
                    {blogPost.category}
                  </span>
                  <span className="text-sm ml-auto">
                    {new Date(blogPost.publishedDate).toLocaleDateString()}
                  </span>
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  {blogPost.title}
                </h1>
                <p className="text-lg opacity-90">
                  {blogPost.excerpt}
                </p>
              </div>
            </div>

            {/* Article Content */}
            <div className="p-6 md:p-8">
              {/* Article Meta */}
              <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <span>By {blogPost.author}</span>
                    <span className="mx-2">•</span>
                    <span>{blogPost.readTime} min read</span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {blogPost.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Article Body */}
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: blogPost.content }}
              />

              {/* Share Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Share this article</h3>
                <div className="flex space-x-4">
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogPost.title)}&url=${encodeURIComponent(`https://maninfini.com/blog/${blogPost.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
                  >
                    Share on Twitter
                  </a>
                  <a 
                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://maninfini.com/blog/${blogPost.slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 transition-colors"
                  >
                    Share on LinkedIn
                  </a>
                </div>
              </div>
            </div>
          </article>

          {/* Related Articles */}
          <section className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {blogPosts
                .filter(post => post.id !== blogPost.id && post.category === blogPost.category)
                .slice(0, 3)
                .map((relatedPost) => (
                  <div key={relatedPost.id} className="bg-white rounded-lg shadow-md p-6">
                    <div className="aspect-w-16 aspect-h-9 mb-4">
                      <img 
                        src={relatedPost.image} 
                        alt={relatedPost.title}
                        className="w-full h-32 object-cover rounded"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      <a href={`/blog/${relatedPost.slug}`} className="hover:text-blue-600">
                        {relatedPost.title}
                      </a>
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">{relatedPost.readTime} min read</span>
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {relatedPost.category}
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default BlogPost; 