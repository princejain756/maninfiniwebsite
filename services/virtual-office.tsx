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
import { ArrowRight, Building, CheckCircle, Phone, Mail, Users, MapPin, Calendar } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';

const VirtualOffice = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What virtual office services do you provide?",
      answer: "We provide complete virtual office solutions including professional business addresses, call handling services, mail management, meeting room access, and administrative support to help businesses establish a professional presence without the overhead of a physical office."
    },
    {
      question: "Can I use your address for business registration?",
      answer: "Yes, our professional business addresses can be used for business registration, legal documents, and official correspondence. We provide all necessary documentation and forwarding services for your business needs."
    },
    {
      question: "How do your call handling services work?",
      answer: "Our professional call handling service includes answering calls in your business name, taking messages, forwarding urgent calls, and providing basic customer service. We can customize the service based on your specific requirements."
    },
    {
      question: "Do you provide meeting room access?",
      answer: "Yes, we provide access to professional meeting rooms and conference facilities. You can book meeting rooms on-demand for client meetings, presentations, or team gatherings with modern amenities and technology."
    },
    {
      question: "What about mail and package handling?",
      answer: "We handle all your incoming mail and packages, including sorting, scanning, forwarding, and secure storage. You can choose to have mail forwarded to your location or access it digitally through our online portal."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "Jennifer Adams",
      rating: 5,
      reviewBody: "Maninfini's virtual office service gave our startup a professional image without the high costs. The call handling and mail management services are excellent.",
      datePublished: "2024-01-23",
      reviewTitle: "Excellent Virtual Office Service"
    },
    {
      author: "Robert Chen",
      rating: 5,
      reviewBody: "The meeting room access and professional address helped us impress clients and scale our business efficiently. Highly recommend their virtual office solutions.",
      datePublished: "2024-01-17",
      reviewTitle: "Outstanding Virtual Office"
    }
  ];

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Service Selection",
      text: "Choose the virtual office services you need including business address, call handling, mail management, and meeting room access."
    },
    {
      name: "Setup & Configuration",
      text: "We set up your virtual office with professional business address, phone numbers, and customize services according to your requirements."
    },
    {
      name: "Integration & Training",
      text: "Integrate virtual office services with your existing business processes and provide training for your team on using the services effectively."
    },
    {
      name: "Ongoing Support",
      text: "Provide continuous support and management of your virtual office services to ensure smooth business operations and professional image."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "Virtual Office Services Overview",
    description: "Learn how our virtual office services can help your business establish a professional presence without the overhead of a physical office.",
    thumbnailUrl: "https://maninfini.com/manlogo.png",
    uploadDate: "2024-01-15",
    duration: "PT5M45S",
    contentUrl: "https://maninfini.com/videos/virtual-office-overview.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manlogo.png"
    },
    author: {
      name: "Maninfini Team",
      url: "https://maninfini.com"
    },
    keywords: ["virtual office", "business address", "call handling", "mail management", "meeting rooms"],
    genre: "Educational"
  };

  const handleContact = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'m interested in your Virtual Office Services. Please provide information about pricing, features, and setup process.'
    );
  };

  return (
    <>
      <SEO 
        title="Virtual Office Services - Professional Business Address & Support - Maninfini Automation"
        description="Complete virtual office setup with professional address, call handling, mail management, and meeting rooms. Establish a professional business presence without physical office overhead."
        keywords="virtual office, business address, call handling, mail management, meeting rooms, professional address, virtual office services, business registration address, call answering service, mail forwarding, virtual office India, professional business address, virtual office setup, business support services, administrative services, virtual office solutions, professional image, business presence, virtual office packages, business address services"
        url="https://maninfini.com/services/virtual-office"
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
          name: "Virtual Office Services",
          description: "Complete virtual office setup with professional address and support",
          url: "https://maninfini.com/services/virtual-office"
        }}
      />
      <HowToSchema
        name="How to Set Up a Virtual Office for Your Business"
        description="A comprehensive guide to establishing a professional virtual office presence for your business"
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/services/virtual-office"
        totalTime="PT12M"
        steps={howToSteps}
        tool={["Business Address", "Call Handling", "Mail Management", "Meeting Rooms"]}
      />
      <VideoSchema {...videoData} />
      
      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-indigo-50 to-blue-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-600 rounded-full px-6 py-3 mb-6">
                  <Building className="w-5 h-5" />
                  <span className="font-medium">Virtual Office Services</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Professional Virtual Office Solutions
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Establish a professional business presence without the overhead of a physical office. 
                  Get a prestigious business address, professional call handling, and comprehensive support services.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Set Up Your Virtual Office
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Our Locations
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
                    Complete Virtual Office Setup
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Our virtual office services provide everything you need to maintain a professional business image 
                    while operating remotely. From prestigious business addresses to comprehensive administrative support.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Professional Business Address</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Call Handling & Answering</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Mail Management & Forwarding</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Meeting Room Access</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-500 to-blue-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-poppins font-bold mb-6">Why Choose Our Virtual Office?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Building className="w-5 h-5" />
                      <span>Prestigious Business Address</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5" />
                      <span>Professional Call Handling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Mail className="w-5 h-5" />
                      <span>Comprehensive Mail Management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <span>Meeting Room Access</span>
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
                  Comprehensive Virtual Office Services
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Everything you need to maintain a professional business presence
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Building className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Professional Business Address</h3>
                  <p className="text-gray-600">Use our prestigious business address for registration, legal documents, and official correspondence with complete privacy protection.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Call Handling Service</h3>
                  <p className="text-gray-600">Professional call answering in your business name, message taking, call forwarding, and basic customer service support.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Mail Management</h3>
                  <p className="text-gray-600">Complete mail handling including receiving, sorting, scanning, forwarding, and secure storage of your business mail and packages.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Meeting Room Access</h3>
                  <p className="text-gray-600">Book professional meeting rooms and conference facilities on-demand for client meetings, presentations, and team gatherings.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Administrative Support</h3>
                  <p className="text-gray-600">Professional administrative services including document preparation, appointment scheduling, and business support tasks.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <MapPin className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Multiple Locations</h3>
                  <p className="text-gray-600">Choose from multiple prestigious business addresses across different cities to establish your presence where it matters most.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Benefits of Virtual Office Services
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Discover how virtual office services can transform your business operations
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-indigo-600">$</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Cost Savings</h3>
                  <p className="text-gray-600">Eliminate high office rent, utilities, and maintenance costs while maintaining a professional business image.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">PR</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Professional Image</h3>
                  <p className="text-gray-600">Establish credibility with a prestigious business address and professional call handling services.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">FL</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Flexibility</h3>
                  <p className="text-gray-600">Scale your business presence up or down as needed without long-term commitments or physical constraints.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">GL</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Global Presence</h3>
                  <p className="text-gray-600">Establish business presence in multiple locations without the overhead of physical offices.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-indigo-600 to-blue-700">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Establish Your Professional Presence?
              </h2>
              <p className="text-xl text-indigo-100 mb-8 max-w-3xl mx-auto">
                Let's set up your virtual office with professional services that enhance your business image and streamline operations.
              </p>
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-gray-100" onClick={handleContact}>
                Get Started Today
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

export default VirtualOffice; 