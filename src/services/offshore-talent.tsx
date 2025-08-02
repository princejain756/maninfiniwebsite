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
import { ArrowRight, Users, CheckCircle, Globe, Zap, Shield, Clock, Award } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';

const OffshoreTalent = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What types of offshore development teams do you provide?",
      answer: "We provide dedicated teams of skilled developers, designers, QA engineers, project managers, and DevOps specialists. Our teams are experienced in React, Node.js, Python, Java, and other modern technologies."
    },
    {
      question: "How do you ensure quality and communication with offshore teams?",
      answer: "We use agile methodologies, daily standups, regular code reviews, automated testing, and transparent communication tools. Our teams work in your timezone and provide detailed progress reports."
    },
    {
      question: "What is the typical timeline for scaling up an offshore team?",
      answer: "We can assemble a dedicated team within 2-4 weeks. For urgent projects, we can start with 1-2 developers immediately and scale up as needed. We ensure all team members are pre-vetted and ready to contribute."
    },
    {
      question: "Do you provide project management and quality assurance?",
      answer: "Yes, each offshore team includes a dedicated project manager and QA engineers. We follow industry best practices, conduct regular code reviews, and ensure high code quality through automated testing and continuous integration."
    },
    {
      question: "How do you handle intellectual property and data security?",
      answer: "We sign comprehensive NDAs and IP agreements. Our teams work in secure environments with encrypted communications, VPN access, and strict data protection protocols to ensure your intellectual property remains secure."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "David Wilson",
      rating: 5,
      reviewBody: "Maninfini's offshore team delivered our project 30% under budget and 2 weeks ahead of schedule. The quality of work exceeded our expectations.",
      datePublished: "2024-01-24",
      reviewTitle: "Outstanding Offshore Team"
    },
    {
      author: "Maria Garcia",
      rating: 5,
      reviewBody: "The dedicated development team they provided scaled our technical capacity significantly. Communication was seamless and the results were exceptional.",
      datePublished: "2024-01-19",
      reviewTitle: "Excellent Offshore Development"
    }
  ];

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Requirements Assessment",
      text: "We analyze your project requirements, team size needs, technology stack, and timeline to assemble the perfect offshore team."
    },
    {
      name: "Team Assembly",
      text: "Select skilled developers, designers, and specialists from our pre-vetted talent pool to match your project requirements."
    },
    {
      name: "Integration & Setup",
      text: "Integrate the offshore team with your existing processes, tools, and communication channels for seamless collaboration."
    },
    {
      name: "Ongoing Management",
      text: "Provide continuous project management, quality assurance, and performance monitoring to ensure project success."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "Offshore Development Team Success Stories",
    description: "Learn how our offshore development teams have helped businesses scale their technical capacity and deliver exceptional results.",
    thumbnailUrl: "https://maninfini.com/manlogo.png",
    uploadDate: "2024-01-15",
    duration: "PT9M20S",
    contentUrl: "https://maninfini.com/videos/offshore-team-success.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manlogo.png"
    },
    author: {
      name: "Maninfini Team",
      url: "https://maninfini.com"
    },
    keywords: ["offshore development", "dedicated team", "remote development", "scalable teams", "technical capacity"],
    genre: "Educational"
  };

  const handleContact = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'m interested in your Offshore Talent services. Please provide information about team composition, pricing, and onboarding process.'
    );
  };

  return (
    <>
      <SEO 
        title="Offshore Talent & Dedicated Development Teams - Maninfini Automation"
        description="Dedicated offshore development teams to scale your technical capacity. Skilled developers, agile process, time zone coverage, and quality assurance for successful project delivery."
        keywords="offshore development, dedicated team, remote developers, offshore talent, development team, skilled developers, agile process, time zone coverage, quality assurance, offshore development India, remote development team, dedicated developers, offshore software development, development outsourcing, technical capacity, project scaling, development team India, offshore development services, remote team management, development team scaling"
        url="https://maninfini.com/services/offshore-talent"
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
          name: "Offshore Talent Services",
          description: "Dedicated development teams to scale your technical capacity",
          url: "https://maninfini.com/services/offshore-talent"
        }}
      />
      <HowToSchema
        name="How to Successfully Work with Offshore Development Teams"
        description="A comprehensive guide to building and managing effective offshore development teams"
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/services/offshore-talent"
        totalTime="PT18M"
        steps={howToSteps}
        tool={["Agile Methodologies", "Communication Tools", "Project Management", "Quality Assurance"]}
      />
      <VideoSchema {...videoData} />
      
      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-purple-50 to-violet-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 rounded-full px-6 py-3 mb-6">
                  <Users className="w-5 h-5" />
                  <span className="font-medium">Offshore Talent</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Dedicated Offshore Development Teams
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Scale your technical capacity with our pre-vetted, skilled development teams. 
                  Get dedicated developers, designers, and specialists working exclusively on your projects with seamless communication.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Build Your Team
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Our Talent
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
                    Scale Your Development Capacity
                  </h2>
                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    Our offshore development teams provide the expertise and flexibility you need to accelerate your projects. 
                    With dedicated teams working in your timezone, you get the benefits of cost-effective development without compromising on quality.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Pre-vetted Skilled Developers</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Agile Development Process</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Time Zone Coverage</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700">Quality Assurance & Testing</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-poppins font-bold mb-6">Why Choose Our Offshore Teams?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      <span>Rapid Team Scaling</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      <span>IP Protection & Security</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="w-5 h-5" />
                      <span>Global Talent Access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5" />
                      <span>Proven Track Record</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Team Roles Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Complete Development Teams
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We provide all the roles you need for successful project delivery
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Full-Stack Developers</h3>
                  <p className="text-gray-600">Experienced developers proficient in React, Node.js, Python, Java, and other modern technologies for end-to-end development.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">UI/UX Designers</h3>
                  <p className="text-gray-600">Creative designers who create beautiful, user-friendly interfaces and seamless user experiences for your applications.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-purple-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">QA Engineers</h3>
                  <p className="text-gray-600">Quality assurance specialists who ensure your applications are bug-free, performant, and meet all requirements.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                    <Clock className="w-6 h-6 text-orange-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Project Managers</h3>
                  <p className="text-gray-600">Experienced project managers who coordinate team efforts, track progress, and ensure timely delivery of your projects.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-red-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">DevOps Engineers</h3>
                  <p className="text-gray-600">Infrastructure specialists who handle deployment, monitoring, and maintenance of your applications in production.</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-indigo-600" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Specialists</h3>
                  <p className="text-gray-600">Domain experts in AI/ML, blockchain, mobile development, and other specialized technologies as needed.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Our Offshore Team Process
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  A proven methodology for building and managing successful offshore development teams
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">1</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Requirements Analysis</h3>
                  <p className="text-gray-600">We analyze your project needs, team size requirements, technology stack, and timeline to design the perfect team structure.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">2</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Team Assembly</h3>
                  <p className="text-gray-600">Select skilled professionals from our pre-vetted talent pool to match your specific project requirements and technology needs.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">3</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Integration & Setup</h3>
                  <p className="text-gray-600">Integrate the offshore team with your existing processes, tools, and communication channels for seamless collaboration.</p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-purple-600">4</span>
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">Ongoing Management</h3>
                  <p className="text-gray-600">Provide continuous project management, quality assurance, and performance monitoring to ensure project success and team productivity.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-purple-600 to-violet-700">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Scale Your Development Team?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-3xl mx-auto">
                Let's build the perfect offshore development team that accelerates your projects and delivers exceptional results.
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100" onClick={handleContact}>
                Start Building Your Team
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

export default OffshoreTalent; 