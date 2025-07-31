import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import BlogSchema from '@/components/BlogSchema';
import Breadcrumb from '@/components/Breadcrumb';
import { blogPosts, getAllCategories } from '@/data/blogPosts';

const Blog = () => {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' }
  ];

  // Prepare blog posts for schema
  const blogPostsForSchema = blogPosts.map(post => ({
    title: post.title,
    description: post.excerpt,
    url: `https://maninfini.com/blog/${post.slug}`,
    publishedDate: post.publishedDate,
    author: post.author,
    image: post.image
  }));

  return (
    <>
      <SEO 
        title="Blog - Business Automation & Digital Transformation"
        description="Stay updated with the latest insights on business automation, digital transformation, AI solutions, and custom software development."
        keywords="business automation blog, digital transformation articles, AI automation insights, custom software development blog, RPA automation, machine learning blog, industry 4.0, smart manufacturing, automation technology"
        url="https://maninfini.com/blog"
        image="https://maninfini.com/assets/blog-automation.jpg"
        type="website"
      />
      <BlogSchema posts={blogPostsForSchema} />
      <Breadcrumb items={breadcrumbItems} />
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8 pt-32">
          {/* Hero Section */}
          <section className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Automation & Digital Transformation Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights on business automation, AI solutions, and digital transformation strategies
            </p>
          </section>

          {/* Blog Posts Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <article key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                      {post.category}
                    </span>
                    <span className="text-gray-500 text-sm ml-auto">
                      {new Date(post.publishedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-3 line-clamp-2">
                    <a href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                      {post.title}
                    </a>
                  </h2>
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>{post.author}</span>
                      <span className="mx-2">•</span>
                      <span>{post.readTime} min read</span>
                    </div>
                    <a 
                      href={`/blog/${post.slug}`}
                      className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </section>

          {/* Categories Section */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {getAllCategories().map((category) => (
                <a 
                  key={category}
                  href={`/blog/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                  className="bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-800 px-4 py-3 rounded-lg text-center font-medium transition-colors"
                >
                  {category}
                </a>
              ))}
            </div>
          </section>

          {/* Newsletter Signup */}
          <section className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
            <p className="text-blue-100 mb-6">
              Get the latest insights on automation and digital transformation delivered to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
                <button className="bg-white text-blue-600 px-6 py-3 rounded-r-lg font-medium hover:bg-gray-100 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Blog; 