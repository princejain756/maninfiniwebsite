import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SearchIcon, Clock, User, Calendar, ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blogPosts";

interface SearchResult {
  id: string;
  title: string;
  excerpt: string;
  url: string;
  type: 'blog' | 'service' | 'company';
  category?: string;
  tags?: string[];
  date?: string;
  author?: string;
}

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);

    // Search in blog posts
    const blogResults: SearchResult[] = blogPosts
      .filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      )
      .map(post => ({
        id: post.id.toString(),
        title: post.title,
        excerpt: post.excerpt,
        url: `/blog/${post.slug}`,
        type: 'blog' as const,
        category: post.category,
        tags: post.tags,
        date: post.publishedDate,
        author: post.author
      }));

    // Search in services (static for now)
    const serviceResults: SearchResult[] = [
      {
        id: 'web-development',
        title: 'Web Development Services',
        excerpt: 'Custom website development, e-commerce solutions, and responsive web applications.',
        url: '/services/web-development',
        type: 'service',
        tags: ['web development', 'e-commerce', 'responsive design']
      },
      {
        id: 'graphic-design',
        title: 'Graphic Design Services',
        excerpt: 'Brand identity, logo design, marketing materials, and creative design solutions.',
        url: '/services/graphic-design',
        type: 'service',
        tags: ['graphic design', 'branding', 'logo design']
      },
      {
        id: 'automation',
        title: 'Process Automation & RPA',
        excerpt: 'Robotic Process Automation, workflow optimization, and AI-powered business solutions.',
        url: '/services/process-automation',
        type: 'service',
        tags: ['automation', 'RPA', 'AI', 'workflow']
      },
      {
        id: 'virtual-office',
        title: 'Virtual Office Solutions',
        excerpt: 'Professional business addresses, mail handling, and virtual office services.',
        url: '/virtual-office',
        type: 'service',
        tags: ['virtual office', 'business address', 'mail handling']
      }
    ].filter(service =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    // Company information search
    const companyResults: SearchResult[] = [
      {
        id: 'about',
        title: 'About Maninfini Automation',
        excerpt: 'Leading automation and technology company specializing in digital transformation solutions.',
        url: '/about',
        type: 'company',
        tags: ['about', 'company', 'automation', 'technology']
      },
      {
        id: 'contact',
        title: 'Contact Us',
        excerpt: 'Get in touch with our team for automation, web development, and digital transformation services.',
        url: '/contact',
        type: 'company',
        tags: ['contact', 'support', 'help']
      },
      {
        id: 'our-team',
        title: 'Our Team',
        excerpt: 'Meet the talented professionals behind Maninfini Automation.',
        url: '/our-team',
        type: 'company',
        tags: ['team', 'leadership', 'experts']
      }
    ].filter(company =>
      company.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const allResults = [...blogResults, ...serviceResults, ...companyResults];
    setSearchResults(allResults);
    setIsSearching(false);
  };

  useEffect(() => {
    if (query) {
      performSearch(query);
    } else {
      setSearchResults([]);
    }
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setSearchParams({ q: query });
      performSearch(query);
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'blog': return 'bg-blue-100 text-blue-800';
      case 'service': return 'bg-green-100 text-green-800';
      case 'company': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Search Results - {query || 'Maninfini Automation'}</title>
        <meta name="description" content={`Search results for "${query}" on Maninfini Automation website.`} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Header />

      {/* Search Header */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 font-poppins">
              Search Results
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              {query ? `Found ${searchResults.length} results for "${query}"` : 'Enter your search terms to find what you\'re looking for'}
            </p>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search for services, blog posts, or information..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="pl-12 pr-4 py-4 text-lg bg-white/10 border-white/20 text-white placeholder-white/70 focus:bg-white focus:text-gray-900"
                />
                <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/70" />
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Search Results */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {isSearching ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">Searching...</p>
              </div>
            ) : query && searchResults.length === 0 ? (
              <div className="text-center py-12">
                <SearchIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-2">No results found</h3>
                <p className="text-gray-600 mb-6">
                  We couldn't find any results for "{query}". Try different keywords or browse our services.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <a href="/services" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    View All Services
                  </a>
                  <a href="/blog" className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors">
                    Browse Blog
                  </a>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {searchResults.map((result) => (
                  <Card key={result.id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <CardTitle className="text-xl mb-2">
                            <a
                              href={result.url}
                              className="text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              {result.title}
                            </a>
                          </CardTitle>
                          <div className="flex items-center gap-2 mb-3">
                            <Badge className={getTypeColor(result.type)}>
                              {result.type.charAt(0).toUpperCase() + result.type.slice(1)}
                            </Badge>
                            {result.category && (
                              <Badge variant="outline">
                                {result.category}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 mb-4">{result.excerpt}</p>

                      {result.tags && result.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {result.tags.slice(0, 4).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {result.tags.length > 4 && (
                            <Badge variant="secondary" className="text-xs">
                              +{result.tags.length - 4} more
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        {result.author && (
                          <div className="flex items-center gap-1">
                            <User className="w-4 h-4" />
                            <span>{result.author}</span>
                          </div>
                        )}
                        {result.date && (
                          <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(result.date).toLocaleDateString()}</span>
                          </div>
                        )}
                        <a
                          href={result.url}
                          className="text-blue-600 hover:text-blue-800 font-medium ml-auto"
                        >
                          View Details →
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default SearchPage;
