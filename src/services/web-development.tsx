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
import { ArrowRight, Code2, CheckCircle, Users, Zap, Shield } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';

const WebDevelopment = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What technologies does Maninfini use for web development?",
      answer: "We use modern technologies including React, Node.js, TypeScript, Next.js, and cloud platforms like AWS, Azure, and Google Cloud for scalable web applications."
    },
    {
      question: "How long does it take to develop a custom web application?",
      answer: "Development time varies based on complexity. Simple applications take 4-6 weeks, while complex enterprise solutions may take 3-6 months. We provide detailed timelines during consultation."
    },
    {
      question: "Do you provide ongoing maintenance and support?",
      answer: "Yes, we offer comprehensive maintenance packages including bug fixes, security updates, performance optimization, and feature enhancements to keep your application running smoothly."
    },
    {
      question: "Can you integrate with existing systems and APIs?",
      answer: "Absolutely! We specialize in system integration and can connect your new web application with existing databases, CRMs, payment gateways, and third-party services."
    },
    {
      question: "What about mobile responsiveness and SEO?",
      answer: "All our web applications are mobile-first, fully responsive, and built with SEO best practices to ensure optimal performance across all devices and search engines."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "Michael Chen",
      rating: 5,
      reviewBody: "Maninfini delivered an exceptional e-commerce platform that increased our online sales by 300%. Their technical expertise and attention to detail are outstanding.",
      datePublished: "2024-01-20",
      reviewTitle: "Outstanding Web Development"
    },
    {
      author: "Lisa Rodriguez",
      rating: 5,
      reviewBody: "The custom CRM system they built for us transformed our business operations. Highly recommend their web development services.",
      datePublished: "2024-01-15",
      reviewTitle: "Excellent Custom Development"
    }
  ];

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Requirements Analysis",
      text: "We analyze your business needs, user requirements, and technical specifications to create a detailed project roadmap."
    },
    {
      name: "Design & Prototyping",
      text: "Create wireframes, UI/UX designs, and interactive prototypes to visualize the final product before development."
    },
    {
      name: "Development & Testing",
      text: "Build the application using modern technologies with continuous testing and quality assurance throughout the process."
    },
    {
      name: "Deployment & Launch",
      text: "Deploy to production with monitoring, documentation, and training to ensure smooth launch and ongoing success."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "Web Development Process at Maninfini",
    description: "Learn about our comprehensive web development process from concept to deployment.",
    thumbnailUrl: "https://maninfini.com/manlogo.png",
    uploadDate: "2024-01-15",
    duration: "PT8M45S",
    contentUrl: "https://maninfini.com/videos/web-development-process.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manlogo.png"
    },
    author: {
      name: "Maninfini Team",
      url: "https://maninfini.com"
    },
    keywords: ["web development", "custom software", "React", "Node.js", "full-stack development"],
    genre: "Educational"
  };

  const handleContact = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'m interested in your Web & Custom Development services. Please provide information about pricing, timeline, and next steps.'
    );
  };

  return (
    <>
      <SEO 
        title="Web & Custom Development Services - Maninfini Automation"
        description="Expert web development and custom software solutions. Full-stack development with React, Node.js, and cloud integration. Transform your business with scalable web applications."
        keywords="web development, custom software development, React development, Node.js development, full-stack development, web applications, custom APIs, mobile apps, cloud integration, software development company, web development services, custom web applications, enterprise software, e-commerce development, CRM development, API development, cloud solutions, responsive web design, progressive web apps, web development India"
        url="https://maninfini.com/services/web-development"
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
          name: "Web & Custom Development Services",
          description: "Expert web development and custom software solutions",
          url: "https://maninfini.com/services/web-development"
        }}
      />
      <HowToSchema
        name="How to Choose the Right Web Development Partner"
        description="A comprehensive guide to selecting the perfect web development company for your project"
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/services/web-development"
        totalTime="PT15M"
        steps={howToSteps}
        tool={["React", "Node.js", "Cloud Platforms", "Testing Tools"]}
      />
      <VideoSchema {...videoData} />
      
      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-6 py-3 mb-6">
                  <Code2 className="w-5 h-5" />
                  <span className="font-medium">Web & Custom Development</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Expert Web Development & Custom Software Solutions
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your business with scalable, modern web applications built with cutting-edge technologies. 
                  From simple websites to complex enterprise solutions, we deliver results that drive growth.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Our Portfolio
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
                    Full-Stack Development Excellence
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    We specialize in building robust, scalable web applications that solve real business problems. 
                    Our expertise spans the entire development stack, from frontend to backend, ensuring seamless integration and optimal performance.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Modern React & Next.js Applications</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Node.js & Express Backend Development</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">RESTful APIs & GraphQL Integration</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Cloud Deployment & DevOps</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-poppins font-bold mb-6">Why Choose Our Web Development?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      <span>Fast Development & Deployment</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      <span>Enterprise-Grade Security</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5" />
                      <span>Dedicated Development Team</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5" />
                      <span>Ongoing Support & Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Technologies & Tools */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Technologies We Master
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We use the latest technologies and frameworks to build modern, scalable web applications
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">Frontend</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>React & Next.js</li>
                    <li>TypeScript</li>
                    <li>Tailwind CSS</li>
                    <li>Redux & Zustand</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">Backend</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Node.js & Express</li>
                    <li>Python & Django</li>
                    <li>PostgreSQL & MongoDB</li>
                    <li>GraphQL & REST APIs</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">Cloud & DevOps</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>AWS & Azure</li>
                    <li>Docker & Kubernetes</li>
                    <li>CI/CD Pipelines</li>
                    <li>Monitoring & Logging</li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-4">Testing & Quality</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li>Jest & Cypress</li>
                    <li>Unit & E2E Testing</li>
                    <li>Code Quality Tools</li>
                    <li>Performance Optimization</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Our Development Process
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  A proven methodology that ensures quality, transparency, and successful project delivery
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">1</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Discovery & Planning</h3>
                  <p className="text-gray-600">Understanding your requirements, creating detailed specifications, and planning the development roadmap.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">2</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Design & Prototyping</h3>
                  <p className="text-gray-600">Creating wireframes, UI/UX designs, and interactive prototypes to visualize the final product.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">3</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Development & Testing</h3>
                  <p className="text-gray-600">Building the application with continuous testing, code reviews, and quality assurance.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">4</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Deployment & Launch</h3>
                  <p className="text-gray-600">Deploying to production, monitoring performance, and providing training and documentation.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Build Your Next Web Application?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Let's discuss your project requirements and create a custom solution that drives your business forward.
              </p>
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={handleContact}>
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

export default WebDevelopment; 