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
import { ArrowRight, MessageSquare, CheckCircle, Users, Zap, Shield, Phone, Bot } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';

const WhatsAppCommunications = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What WhatsApp Business API features do you offer?",
      answer: "We provide complete WhatsApp Business API integration including automated messaging, chatbot development, bulk messaging, media sharing, and CRM integration for seamless customer communication."
    },
    {
      question: "Can you integrate WhatsApp with our existing CRM system?",
      answer: "Yes, we integrate WhatsApp with all major CRM systems including Salesforce, HubSpot, Zoho, and custom CRM solutions to centralize customer communications and data."
    },
    {
      question: "How do your WhatsApp bots work?",
      answer: "Our intelligent WhatsApp bots use AI and NLP to handle customer queries, process orders, provide support, and route complex issues to human agents seamlessly."
    },
    {
      question: "Do you provide IVR (Interactive Voice Response) systems?",
      answer: "Yes, we develop custom IVR systems with voice recognition, call routing, automated responses, and integration with your existing phone infrastructure."
    },
    {
      question: "What about bulk messaging and campaign management?",
      answer: "We offer bulk messaging solutions with scheduling, segmentation, analytics, and compliance features to ensure effective and legal mass communication campaigns."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "Amit Patel",
      rating: 5,
      reviewBody: "Maninfini's WhatsApp integration transformed our customer service. Response times improved by 80% and customer satisfaction increased significantly.",
      datePublished: "2024-01-22",
      reviewTitle: "Excellent WhatsApp Integration"
    },
    {
      author: "Sneha Reddy",
      rating: 5,
      reviewBody: "The WhatsApp bot they built for us handles 70% of customer queries automatically, freeing up our team for complex issues. Highly recommend!",
      datePublished: "2024-01-16",
      reviewTitle: "Outstanding WhatsApp Bot"
    }
  ];

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Requirements Analysis",
      text: "We analyze your communication needs, customer interaction patterns, and business processes to design the perfect WhatsApp solution."
    },
    {
      name: "API Integration",
      text: "Integrate WhatsApp Business API with your existing systems, databases, and CRM platforms for seamless communication."
    },
    {
      name: "Bot Development",
      text: "Develop intelligent chatbots with AI capabilities to handle customer queries, process orders, and provide automated support."
    },
    {
      name: "Testing & Deployment",
      text: "Thorough testing across all scenarios before deploying your WhatsApp communication system to ensure reliability and performance."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "WhatsApp Business Solutions Demo",
    description: "See how our WhatsApp Business API integration and chatbot solutions can transform your customer communication.",
    thumbnailUrl: "https://maninfini.com/manlogo.png",
    uploadDate: "2024-01-15",
    duration: "PT7M15S",
    contentUrl: "https://maninfini.com/videos/whatsapp-solutions-demo.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manlogo.png"
    },
    author: {
      name: "Maninfini Team",
      url: "https://maninfini.com"
    },
    keywords: ["WhatsApp Business API", "chatbot", "customer communication", "bulk messaging", "CRM integration"],
    genre: "Educational"
  };

  const handleContact = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'m interested in your WhatsApp & Communications services. Please provide information about pricing, features, and implementation timeline.'
    );
  };

  return (
    <>
      <SEO 
        title="WhatsApp & Communications Services - Maninfini Automation"
        description="Advanced WhatsApp Business API integration, chatbots, bulk messaging, and IVR systems. Transform customer communication with automated messaging solutions."
        keywords="WhatsApp Business API, WhatsApp integration, chatbot development, bulk messaging, IVR systems, customer communication, WhatsApp bot, automated messaging, CRM integration, WhatsApp Business, communication automation, WhatsApp API, customer service automation, messaging solutions, WhatsApp development, business communication, automated responses, WhatsApp marketing, customer engagement, WhatsApp India"
        url="https://maninfini.com/services/whatsapp-communications"
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
          name: "WhatsApp & Communications Services",
          description: "Advanced messaging solutions and cloud communication platforms",
          url: "https://maninfini.com/services/whatsapp-communications"
        }}
      />
      <HowToSchema
        name="How to Implement WhatsApp Business API"
        description="A comprehensive guide to implementing WhatsApp Business API for your business communication needs"
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/services/whatsapp-communications"
        totalTime="PT10M"
        steps={howToSteps}
        tool={["WhatsApp Business API", "Chatbot Platforms", "CRM Systems", "IVR Solutions"]}
      />
      <VideoSchema {...videoData} />
      
      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-green-50 to-emerald-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 rounded-full px-6 py-3 mb-6">
                  <MessageSquare className="w-5 h-5" />
                  <span className="font-medium">WhatsApp & Communications</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Advanced WhatsApp Business & Communication Solutions
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your customer communication with intelligent WhatsApp bots, automated messaging, 
                  and integrated communication platforms that drive engagement and efficiency.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Start Your WhatsApp Integration
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    Watch Demo
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
                    Intelligent Communication Automation
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We build sophisticated WhatsApp Business solutions that automate customer interactions, 
                    streamline communication workflows, and provide seamless integration with your existing business systems.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">WhatsApp Business API Integration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">AI-Powered Chatbots</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Bulk Messaging Campaigns</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">CRM & IVR Integration</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-poppins font-bold mb-6">Why Choose Our WhatsApp Solutions?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      <span>24/7 Automated Customer Support</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      <span>Secure & Compliant Messaging</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <span>Enhanced Customer Engagement</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Bot className="w-5 h-5" />
                      <span>Intelligent AI Chatbots</span>
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
                  Comprehensive Communication Solutions
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Everything you need to automate and enhance your business communication
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">WhatsApp Business API</h3>
                  <p className="text-gray-600">Complete WhatsApp Business API integration with automated messaging, media sharing, and conversation management.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Bot className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Intelligent Chatbots</h3>
                  <p className="text-gray-600">AI-powered chatbots that understand customer queries, process orders, and provide instant responses 24/7.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">IVR Systems</h3>
                  <p className="text-gray-600">Custom Interactive Voice Response systems with voice recognition, call routing, and automated responses.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Bulk Messaging</h3>
                  <p className="text-gray-600">Campaign management with scheduling, segmentation, analytics, and compliance features for mass communication.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">CRM Integration</h3>
                  <p className="text-gray-600">Seamless integration with Salesforce, HubSpot, Zoho, and custom CRM systems for centralized communication.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Analytics & Reporting</h3>
                  <p className="text-gray-600">Comprehensive analytics with message delivery rates, response times, customer engagement, and performance metrics.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Use Cases Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  WhatsApp Business Use Cases
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Discover how WhatsApp Business can transform different aspects of your business
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">CS</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Customer Support</h3>
                  <p className="text-gray-600">24/7 automated customer support with instant responses and human handoff for complex issues.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">OR</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Order Processing</h3>
                  <p className="text-gray-600">Automated order processing, tracking updates, and payment confirmations via WhatsApp.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">MK</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Marketing Campaigns</h3>
                  <p className="text-gray-600">Targeted marketing campaigns with personalized messages, promotions, and customer engagement.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-orange-600">AP</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Appointment Booking</h3>
                  <p className="text-gray-600">Automated appointment scheduling, reminders, and rescheduling for service-based businesses.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-green-600 to-emerald-700">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Transform Your Customer Communication?
              </h2>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                Let's build the perfect WhatsApp Business solution that enhances customer engagement and streamlines your communication.
              </p>
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100" onClick={handleContact}>
                Start Your WhatsApp Integration
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

export default WhatsAppCommunications; 