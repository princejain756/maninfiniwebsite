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
import { ArrowRight, Brain, CheckCircle, TrendingUp, Shield, Zap, BarChart3, Target, Cpu } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';

const Quantiti = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What is Quantiti and what services do you provide?",
      answer: "Quantiti is our advanced AI and algorithmic solutions division that provides algorithmic trading, fraud detection, portfolio optimization, personalization systems, price optimization, supply chain optimization, insurance underwriting, computer vision, and scientific computing services."
    },
    {
      question: "How does your algorithmic trading system work?",
      answer: "Our algorithmic trading systems use advanced mathematical models, machine learning algorithms, and real-time market data to execute trades automatically. We create strategies for pairs trading, statistical arbitrage, mean reversion, and high-frequency trading (HFT) to profit from market inefficiencies."
    },
    {
      question: "Can you integrate with existing financial systems?",
      answer: "Yes, we can integrate our AI solutions with your existing trading platforms, risk management systems, and financial databases. We ensure secure, compliant integration that meets regulatory requirements and maintains data integrity."
    },
    {
      question: "What about data security and compliance?",
      answer: "We implement enterprise-grade security measures including encryption, secure APIs, audit trails, and compliance with financial regulations. Our systems are designed to meet the highest security standards for financial and sensitive data."
    },
    {
      question: "Do you provide ongoing monitoring and optimization?",
      answer: "Absolutely! We provide continuous monitoring, performance analysis, and system optimization. Our AI models are regularly updated and retrained to maintain optimal performance and adapt to changing market conditions."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "Dr. Rajesh Kumar",
      rating: 5,
      reviewBody: "Quantiti's algorithmic trading system increased our portfolio returns by 35% while reducing risk. The fraud detection system has saved us millions in potential losses.",
      datePublished: "2024-01-26",
      reviewTitle: "Outstanding AI Solutions"
    },
    {
      author: "Lisa Thompson",
      rating: 5,
      reviewBody: "The portfolio optimization and personalization systems they built for our fintech platform transformed our user experience and significantly improved customer retention.",
      datePublished: "2024-01-20",
      reviewTitle: "Excellent Quantiti Services"
    }
  ];

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Requirements Analysis",
      text: "We analyze your business needs, data infrastructure, and specific AI requirements to design the perfect algorithmic solution for your use case."
    },
    {
      name: "Data Integration & Preparation",
      text: "Integrate with your existing data sources, clean and prepare data, and establish secure data pipelines for real-time processing."
    },
    {
      name: "Model Development & Training",
      text: "Develop and train AI models using advanced algorithms, machine learning techniques, and your specific business data."
    },
    {
      name: "Deployment & Monitoring",
      text: "Deploy AI solutions with continuous monitoring, performance optimization, and regular model updates to ensure optimal results."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "Quantiti AI Solutions Overview",
    description: "Learn how our advanced AI and algorithmic solutions can transform your business operations and drive competitive advantage.",
    thumbnailUrl: "https://maninfini.com/manlogo.png",
    uploadDate: "2024-01-15",
    duration: "PT8M15S",
    contentUrl: "https://maninfini.com/videos/quantiti-overview.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manlogo.png"
    },
    author: {
      name: "Maninfini Team",
      url: "https://maninfini.com"
    },
    keywords: ["algorithmic trading", "AI solutions", "fraud detection", "portfolio optimization", "machine learning"],
    genre: "Educational"
  };

  const handleContact = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'m interested in your Quantiti AI and algorithmic solutions. Please provide information about pricing, features, and implementation timeline.'
    );
  };

  return (
    <>
      <SEO 
        title="Quantiti - Advanced AI & Algorithmic Solutions - Maninfini Automation"
        description="Advanced AI and algorithmic solutions for financial markets, risk management, and business optimization. Algorithmic trading, fraud detection, portfolio optimization, and more."
        keywords="algorithmic trading, AI solutions, fraud detection, portfolio optimization, robo-advisory, high-frequency trading, price optimization, supply chain optimization, insurance underwriting, computer vision, scientific computing, machine learning, artificial intelligence, financial technology, fintech, trading algorithms, risk management, data analytics, predictive modeling, AI consulting, algorithmic solutions India"
        url="https://maninfini.com/services/quantiti"
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
          name: "Quantiti AI & Algorithmic Solutions",
          description: "Advanced AI and algorithmic solutions for financial markets and business optimization",
          url: "https://maninfini.com/services/quantiti"
        }}
      />
      <HowToSchema
        name="How to Implement AI Solutions for Business Optimization"
        description="A comprehensive guide to implementing AI and algorithmic solutions for business transformation"
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/services/quantiti"
        totalTime="PT20M"
        steps={howToSteps}
        tool={["Machine Learning", "Data Analytics", "AI Platforms", "Algorithmic Systems"]}
      />
      <VideoSchema {...videoData} />
      
      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-cyan-50 to-blue-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-cyan-100 text-cyan-600 rounded-full px-6 py-3 mb-6">
                  <Brain className="w-5 h-5" />
                  <span className="font-medium">Quantiti</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Advanced AI & Algorithmic Solutions
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your business with cutting-edge AI and algorithmic solutions. 
                  From algorithmic trading to fraud detection, we deliver intelligent systems that drive competitive advantage.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Explore AI Solutions
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Case Studies
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
                    Intelligent Algorithmic Excellence
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Our Quantiti division specializes in advanced AI and algorithmic solutions that solve complex business problems. 
                    We combine deep technical expertise with industry knowledge to deliver intelligent systems that drive results.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Algorithmic Trading & HFT</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Fraud Detection & Risk Management</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Portfolio Optimization & Robo-Advisory</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">AI-Powered Personalization</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-poppins font-bold mb-6">Why Choose Quantiti?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5" />
                      <span>Advanced AI & Machine Learning</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      <span>Enterprise Security & Compliance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5" />
                      <span>Proven Performance Results</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      <span>Real-time Processing</span>
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
                  Comprehensive AI Solutions
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Advanced algorithmic solutions for every industry and use case
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-cyan-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Algorithmic Trading</h3>
                  <p className="text-gray-600">Automated trading strategies including pairs trading, statistical arbitrage, mean reversion, and high-frequency trading (HFT) for optimal market performance.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Fraud Detection</h3>
                  <p className="text-gray-600">Real-time transaction analysis using AI to detect anomalies and prevent fraud in financial transactions, e-commerce, and digital platforms.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Portfolio Optimization</h3>
                  <p className="text-gray-600">AI-powered portfolio management and robo-advisory services for personalized, dynamically rebalanced investment strategies.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Personalization</h3>
                  <p className="text-gray-600">Content and product recommendation systems that maximize user engagement and sales through intelligent personalization algorithms.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Price Optimization</h3>
                  <p className="text-gray-600">Dynamic pricing strategies that respond to demand, competition, and market conditions to maximize revenue and profitability.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Cpu className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Supply Chain Optimization</h3>
                  <p className="text-gray-600">Intelligent routing, inventory management, and cost reduction algorithms for efficient supply chain operations.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Additional Services */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Specialized AI Applications
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Advanced AI solutions for specialized industries and applications
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-20 h-20 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-cyan-600">IU</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Insurance Underwriting</h3>
                  <p className="text-gray-600">AI-powered risk analysis and premium determination using massive datasets for precise, data-driven insurance decisions.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-blue-600">CV</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Computer Vision</h3>
                  <p className="text-gray-600">Facial recognition, security systems, and medical image analysis for improved automation and diagnostics.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-green-600">SC</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Scientific Computing</h3>
                  <p className="text-gray-600">Climate modeling, astronomical data analysis, drug discovery, and other scientific applications requiring large-scale computation.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">ML</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-2">Machine Learning</h3>
                  <p className="text-gray-600">Custom ML models and algorithms tailored to your specific business needs and industry requirements.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-cyan-600 to-blue-700">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Harness the Power of AI?
              </h2>
              <p className="text-xl text-cyan-100 mb-8 max-w-3xl mx-auto">
                Let's build intelligent algorithmic solutions that transform your business operations and drive competitive advantage.
              </p>
              <Button size="lg" className="bg-white text-cyan-600 hover:bg-gray-100" onClick={handleContact}>
                Start Your AI Journey
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

export default Quantiti; 