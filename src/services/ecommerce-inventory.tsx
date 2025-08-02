import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import ReviewSchema from '@/components/ReviewSchema';
import HowToSchema from '@/components/HowToSchema';
import VideoSchema from '@/components/VideoSchema';
import { Button } from '@/components/ui/button';
import { ArrowRight, ShoppingCart, CheckCircle, Users, Zap, Shield, TrendingUp, BarChart3 } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';

const EcommerceInventory = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What e-commerce platforms does Maninfini work with?",
      answer: "We work with all major platforms including Shopify, WooCommerce, Magento, and custom solutions. We also build custom e-commerce platforms from scratch using modern technologies."
    },
    {
      question: "How does your inventory management system work?",
      answer: "Our inventory system provides real-time tracking across multiple channels, automated reorder points, barcode scanning, and integration with suppliers for seamless stock management."
    },
    {
      question: "Can you integrate with existing payment gateways?",
      answer: "Yes, we integrate with all major payment gateways including Stripe, PayPal, Razorpay, and regional payment methods. We ensure secure, PCI-compliant payment processing."
    },
    {
      question: "Do you provide analytics and reporting features?",
      answer: "Absolutely! Our e-commerce solutions include comprehensive analytics dashboards with sales reports, inventory insights, customer behavior analysis, and performance metrics."
    },
    {
      question: "How do you handle multi-channel selling?",
      answer: "We synchronize inventory and orders across all channels including your website, marketplaces like Amazon/Flipkart, social media shops, and physical stores in real-time."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "Priya Sharma",
      rating: 5,
      reviewBody: "Maninfini transformed our retail business with their e-commerce platform. Sales increased by 400% and inventory management became seamless.",
      datePublished: "2024-01-25",
      reviewTitle: "Outstanding E-commerce Solution"
    },
    {
      author: "Rajesh Kumar",
      rating: 5,
      reviewBody: "The inventory management system they built for us eliminated stockouts and improved our profit margins significantly. Highly recommend!",
      datePublished: "2024-01-18",
      reviewTitle: "Excellent Inventory Management"
    }
  ];

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Business Analysis",
      text: "We analyze your current business processes, inventory needs, and e-commerce requirements to design the perfect solution."
    },
    {
      name: "Platform Selection",
      text: "Choose between custom development or existing platforms based on your business size, budget, and specific requirements."
    },
    {
      name: "Development & Integration",
      text: "Build and integrate your e-commerce platform with inventory management, payment gateways, and third-party services."
    },
    {
      name: "Testing & Launch",
      text: "Thorough testing across all devices and payment methods before launching your online store to customers."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "E-commerce & Inventory Management Solutions",
    description: "Learn how our e-commerce and inventory management solutions can transform your retail business.",
    thumbnailUrl: "https://maninfini.com/manlogo.png",
    uploadDate: "2024-01-15",
    duration: "PT6M30S",
    contentUrl: "https://maninfini.com/videos/ecommerce-solutions.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manlogo.png"
    },
    author: {
      name: "Maninfini Team",
      url: "https://maninfini.com"
    },
    keywords: ["e-commerce", "inventory management", "online store", "retail automation", "multi-channel selling"],
    genre: "Educational"
  };

  const handleContact = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'m interested in your E-commerce & Inventory services. Please provide information about pricing, features, and implementation timeline.'
    );
  };

  return (
    <>
      <SEO 
        title="E-commerce & Inventory Management Services - Maninfini Automation"
        description="Complete e-commerce solutions with real-time inventory management. Multi-channel sync, payment gateways, analytics dashboard, and automated inventory tracking."
        keywords="e-commerce development, inventory management, online store, multi-channel selling, payment gateway integration, e-commerce platform, inventory tracking, retail automation, e-commerce solutions, online retail, inventory software, e-commerce India, Shopify development, WooCommerce, Magento, custom e-commerce, inventory management system, retail software, e-commerce analytics, order management, stock management"
        url="https://maninfini.com/services/ecommerce-inventory"
        image="https://maninfini.com/manlogo.png"
        language="en"
        twitterHandle="@maninfini"
        googleAnalyticsId="GA_MEASUREMENT_ID"
        googleTagManagerId="GTM_CONTAINER_ID"
      />
      <FAQSchema faqs={faqs} />
      <LocalBusinessSchema />
      <ReviewSchema 
        reviews={reviews}
        itemReviewed={{
          name: "E-commerce & Inventory Management Services",
          description: "Complete e-commerce solutions with real-time inventory management",
          url: "https://maninfini.com/services/ecommerce-inventory"
        }}
      />
      <HowToSchema
        name="How to Choose the Right E-commerce Platform"
        description="A comprehensive guide to selecting the perfect e-commerce solution for your business"
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/services/ecommerce-inventory"
        totalTime="PT12M"
        steps={howToSteps}
        tool={["Shopify", "WooCommerce", "Custom Platforms", "Inventory Systems"]}
      />
      <VideoSchema {...videoData} />
      
      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-orange-50 to-red-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 rounded-full px-6 py-3 mb-6">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">E-commerce & Inventory</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Complete E-commerce Solutions with Smart Inventory Management
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your retail business with our comprehensive e-commerce platforms and intelligent inventory management systems. 
                  Sell across multiple channels with real-time synchronization and automated operations.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Start Your Online Store
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Demo
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Overview */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                    Multi-Channel E-commerce Excellence
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We build powerful e-commerce platforms that integrate seamlessly with your existing business operations. 
                    From custom online stores to marketplace integrations, we ensure your products reach customers everywhere.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Custom E-commerce Platforms</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Real-time Inventory Tracking</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Multi-channel Order Sync</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Advanced Analytics Dashboard</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-poppins font-bold mb-6">Why Choose Our E-commerce Solutions?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      <span>24/7 Online Store Availability</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      <span>Secure Payment Processing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5" />
                      <span>Increased Sales & Revenue</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5" />
                      <span>Comprehensive Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Powerful E-commerce Features
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Everything you need to run a successful online business
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <ShoppingCart className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Online Store</h3>
                  <p className="text-gray-600">Beautiful, responsive online stores with advanced product catalogs, search functionality, and mobile optimization.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Inventory Management</h3>
                  <p className="text-gray-600">Real-time stock tracking, automated reorder points, barcode scanning, and multi-location inventory management.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Multi-channel Sync</h3>
                  <p className="text-gray-600">Synchronize inventory and orders across your website, marketplaces, social media, and physical stores.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Payment Gateways</h3>
                  <p className="text-gray-600">Secure payment processing with multiple gateways, regional payment methods, and PCI compliance.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Customer Management</h3>
                  <p className="text-gray-600">Customer profiles, order history, loyalty programs, and personalized shopping experiences.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Analytics & Reports</h3>
                  <p className="text-gray-600">Comprehensive sales reports, inventory insights, customer analytics, and performance metrics.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Platforms Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  E-commerce Platforms We Work With
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  From popular platforms to custom solutions, we have expertise in all major e-commerce technologies
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">S</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Shopify</h3>
                  <p className="text-gray-600">Custom themes, apps, and integrations for the world's leading e-commerce platform.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">W</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">WooCommerce</h3>
                  <p className="text-gray-600">WordPress-based e-commerce solutions with custom plugins and themes.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">M</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Magento</h3>
                  <p className="text-gray-600">Enterprise-level e-commerce solutions with advanced features and scalability.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">C</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Custom</h3>
                  <p className="text-gray-600">Bespoke e-commerce platforms built from scratch to meet your specific requirements.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-orange-600 to-red-700">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Launch Your Online Store?
              </h2>
              <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
                Let's build the perfect e-commerce solution that drives sales and streamlines your inventory management.
              </p>
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100" onClick={handleContact}>
                Start Your E-commerce Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default EcommerceInventory; 