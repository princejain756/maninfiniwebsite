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
import { ArrowRight, Palette, CheckCircle, Eye, Award, Sparkles, Target, Heart } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';

const GraphicDesign = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What graphic design services do you offer?",
      answer: "We offer comprehensive graphic design services including brand identity design, logo creation, marketing materials, product packaging, digital assets, social media graphics, and complete visual identity systems for businesses of all sizes."
    },
    {
      question: "Do you provide packaging design services?",
      answer: "Yes, we specialize in product packaging design including boxes, labels, bags, and containers. We ensure your packaging is not only visually appealing but also functional, compliant with regulations, and optimized for retail display."
    },
    {
      question: "How long does it take to complete a design project?",
      answer: "Project timelines vary based on complexity. Logo design takes 1-2 weeks, brand identity packages 2-4 weeks, and packaging design 3-6 weeks. We provide detailed timelines during the initial consultation and keep you updated throughout the process."
    },
    {
      question: "Do you provide print-ready files and specifications?",
      answer: "Absolutely! We deliver all design files in print-ready formats with proper specifications, color profiles, and technical requirements. We also provide digital formats for web and social media use."
    },
    {
      question: "Can you work with existing brand guidelines?",
      answer: "Yes, we can work within your existing brand guidelines or help develop new ones. We ensure consistency across all design elements while maintaining your brand's unique identity and values."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "Sarah Johnson",
      rating: 5,
      reviewBody: "Maninfini's graphic design team created an amazing brand identity for our startup. The logo and packaging design exceeded our expectations and helped us stand out in the market.",
      datePublished: "2024-01-21",
      reviewTitle: "Outstanding Graphic Design"
    },
    {
      author: "Michael Brown",
      rating: 5,
      reviewBody: "The packaging design they created for our product line was not only beautiful but also practical and cost-effective. Sales increased significantly after the redesign.",
      datePublished: "2024-01-15",
      reviewTitle: "Excellent Packaging Design"
    }
  ];

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Discovery & Research",
      text: "We research your industry, competitors, target audience, and brand values to understand your unique positioning and design requirements."
    },
    {
      name: "Concept Development",
      text: "Create initial design concepts and mockups based on your requirements, brand guidelines, and market research findings."
    },
    {
      name: "Design Refinement",
      text: "Refine designs based on your feedback, ensuring all elements align with your brand identity and business objectives."
    },
    {
      name: "Final Delivery",
      text: "Deliver final design files in all required formats with specifications for print, web, and social media use."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "Graphic Design Portfolio Showcase",
    description: "Explore our creative graphic design portfolio featuring brand identities, packaging designs, and marketing materials.",
    thumbnailUrl: "https://maninfini.com/manlogo.png",
    uploadDate: "2024-01-15",
    duration: "PT6M30S",
    contentUrl: "https://maninfini.com/videos/graphic-design-portfolio.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manlogo.png"
    },
    author: {
      name: "Maninfini Team",
      url: "https://maninfini.com"
    },
    keywords: ["graphic design", "brand identity", "packaging design", "logo design", "marketing materials"],
    genre: "Portfolio"
  };

  const handleContact = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'m interested in your Graphic Design & Packaging services. Please provide information about pricing, portfolio, and design process.'
    );
  };

  return (
    <>
      <SEO 
        title="Graphic Design & Packaging Services - Creative Design Solutions - Maninfini Automation"
        description="Creative design solutions for branding, marketing, and product packaging. Brand identity, logo design, marketing materials, and packaging design services."
        keywords="graphic design, packaging design, brand identity, logo design, marketing materials, creative design, visual identity, product packaging, brand design, graphic design services, packaging design India, logo design services, brand identity design, marketing collateral, digital assets, social media graphics, print design, creative agency, visual design, brand guidelines, design portfolio"
        url="https://maninfini.com/services/graphic-design"
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
          name: "Graphic Design & Packaging Services",
          description: "Creative design solutions for branding, marketing, and product packaging",
          url: "https://maninfini.com/services/graphic-design"
        }}
      />
      <HowToSchema
        name="How to Create an Effective Brand Identity"
        description="A comprehensive guide to developing a strong brand identity that resonates with your target audience"
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/services/graphic-design"
        totalTime="PT14M"
        steps={howToSteps}
        tool={["Design Software", "Brand Research", "Creative Process", "Print Specifications"]}
      />
      <VideoSchema {...videoData} />
      
      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-pink-50 to-rose-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-pink-100 text-pink-600 rounded-full px-6 py-3 mb-6">
                  <Palette className="w-5 h-5" />
                  <span className="font-medium">Graphic Design & Packaging</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Creative Design Solutions for Your Brand
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your brand with stunning visual designs that captivate your audience. 
                  From brand identity to product packaging, we create designs that drive results and build lasting impressions.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Start Your Design Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Portfolio
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
                    Visual Design Excellence
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Our creative team combines artistic vision with strategic thinking to deliver designs 
                    that not only look beautiful but also drive business results. We understand that great design 
                    is both art and science.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Brand Identity & Logo Design</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Product Packaging Design</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Marketing Materials & Collateral</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Digital Assets & Social Media</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-poppins font-bold mb-6">Why Choose Our Design Services?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Eye className="w-5 h-5" />
                      <span>Strategic Visual Design</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5" />
                      <span>Award-Winning Creativity</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Target className="w-5 h-5" />
                      <span>Results-Driven Approach</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-5 h-5" />
                      <span>Unique Brand Expression</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Services Grid */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Comprehensive Design Services
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  From concept to final delivery, we handle all aspects of your design needs
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                    <Palette className="w-6 h-6 text-pink-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Brand Identity Design</h3>
                  <p className="text-gray-600">Complete brand identity packages including logos, color palettes, typography, and brand guidelines that reflect your unique values.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Logo Design</h3>
                  <p className="text-gray-600">Memorable, scalable logos that work across all platforms and effectively communicate your brand message to your target audience.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Product Packaging</h3>
                  <p className="text-gray-600">Eye-catching packaging designs that protect your products, enhance shelf appeal, and communicate your brand story effectively.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Marketing Materials</h3>
                  <p className="text-gray-600">Brochures, flyers, business cards, and other marketing collateral that maintain brand consistency and drive customer engagement.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Sparkles className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Digital Assets</h3>
                  <p className="text-gray-600">Social media graphics, website designs, email templates, and digital marketing materials optimized for online engagement.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Eye className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Print Design</h3>
                  <p className="text-gray-600">High-quality print designs with proper specifications, color management, and technical requirements for professional printing.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Design Process Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Our Design Process
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  A proven methodology that ensures creative excellence and client satisfaction
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pink-600">1</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Discovery</h3>
                  <p className="text-gray-600">We research your industry, competitors, target audience, and brand values to understand your unique positioning.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pink-600">2</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Concept Development</h3>
                  <p className="text-gray-600">Create initial design concepts and mockups based on your requirements and strategic insights from our research.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pink-600">3</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Refinement</h3>
                  <p className="text-gray-600">Refine designs based on your feedback, ensuring all elements align with your brand identity and business objectives.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-pink-600">4</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Delivery</h3>
                  <p className="text-gray-600">Deliver final design files in all required formats with specifications for print, web, and social media use.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-pink-600 to-rose-700">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Transform Your Brand with Creative Design?
              </h2>
              <p className="text-xl text-pink-100 mb-8 max-w-3xl mx-auto">
                Let's create stunning visual designs that captivate your audience and drive business results.
              </p>
              <Button size="lg" className="bg-white text-pink-600 hover:bg-gray-100" onClick={handleContact}>
                Start Your Design Project
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

export default GraphicDesign; 