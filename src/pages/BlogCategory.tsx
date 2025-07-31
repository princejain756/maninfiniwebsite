import { useParams, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import BlogSchema from '@/components/BlogSchema';
import Breadcrumb from '@/components/Breadcrumb';
import { getBlogPostsByCategory, getAllCategories } from '@/data/blogPosts';

const BlogCategory = () => {
  const { category } = useParams<{ category: string }>();

  // Get the category name from the URL slug
  const categoryName = category ? category.replace(/-/g, ' ') : '';
  
  // Get all available categories to check if the requested category exists
  const allCategories = getAllCategories();
  const categoryExists = allCategories.some(cat => 
    cat.toLowerCase().replace(/\s+/g, '-') === category?.toLowerCase()
  );

  // If category doesn't exist, redirect to 404
  if (!categoryExists) {
    return <Navigate to="/404" replace />;
  }

  // Get blog posts for this category
  const categoryPosts = category ? getBlogPostsByCategory(category) : [];
  
  // Find the actual category name (with proper casing)
  const actualCategoryName = allCategories.find(cat => 
    cat.toLowerCase().replace(/\s+/g, '-') === category?.toLowerCase()
  ) || categoryName;

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Blog', url: '/blog' },
    { name: actualCategoryName, url: `/blog/category/${category}` }
  ];

  // Prepare blog posts for schema
  const blogPostsForSchema = categoryPosts.map(post => ({
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
        title={`${actualCategoryName} - Blog | Maninfini Automation`}
        description={`Explore our latest insights and articles on ${actualCategoryName.toLowerCase()}. Expert content from Maninfini Automation.`}
        keywords={`${actualCategoryName.toLowerCase()}, automation blog, digital transformation, business automation, ${actualCategoryName.toLowerCase()} articles`}
        url={`https://maninfini.com/blog/category/${category}`}
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
              {actualCategoryName}
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Expert insights and articles on {actualCategoryName.toLowerCase()}
            </p>
          </section>

          {/* Blog Posts Grid */}
          {categoryPosts.length > 0 ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {categoryPosts.map((post) => (
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
          ) : (
            <section className="text-center py-12">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">No Articles Found</h2>
                <p className="text-gray-600 mb-6">
                  We don't have any articles in this category yet. Check back soon for new content!
                </p>
                <a 
                  href="/blog"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                >
                  Browse All Articles
                </a>
              </div>
            </section>
          )}

          {/* Back to All Categories */}
          <section className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse All Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {allCategories.map((cat) => (
                <a 
                  key={cat}
                  href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className={`px-4 py-3 rounded-lg text-center font-medium transition-colors ${
                    cat === actualCategoryName 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 hover:bg-blue-100 text-gray-800 hover:text-blue-800'
                  }`}
                >
                  {cat}
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

export default BlogCategory; 