
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
import { Shield, Lock, Zap, CheckCircle, ArrowRight, BarChart3, Users, Award } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';

const faqs = [
  {
    question: "What cybersecurity certifications do you hold?",
    answer: "We are certified in ISO 27001, GDPR, NIST, and SOC 2, ensuring the highest standards of security and compliance."
  },
  {
    question: "How do you respond to security incidents?",
    answer: "Our SOC team provides 24/7 monitoring and rapid incident response, with playbooks for containment and remediation."
  },
  {
    question: "Do you offer vulnerability assessments and penetration testing?",
    answer: "Yes, we provide comprehensive vulnerability assessments, penetration testing, and risk analysis for all environments."
  },
  {
    question: "Is your dashboard accessible and mobile-friendly?",
    answer: "Our security dashboard is fully responsive, color-blind friendly, and supports keyboard navigation and adjustable contrast."
  }
];

const reviews = [
  {
    author: "Rohit Sharma",
    rating: 5,
    reviewBody: "Maninfini's cybersecurity team helped us achieve GDPR compliance and stopped a major phishing attack. Their dashboard is intuitive and actionable.",
    datePublished: "2025-06-15",
    reviewTitle: "Outstanding Security Service"
  },
  {
    author: "Priya Mehta",
    rating: 5,
    reviewBody: "The vulnerability assessment and incident response were world-class. We feel much safer now!",
    datePublished: "2025-07-01",
    reviewTitle: "Excellent Cybersecurity"
  }
];

const howToSteps = [
  {
    name: "Risk Assessment & Analysis",
    text: "We analyze your business environment, identify vulnerabilities, and assess risk levels to design a tailored security strategy."
  },
  {
    name: "Defense Implementation",
    text: "Deploy security controls, compliance measures, and monitoring systems to protect your assets."
  },
  {
    name: "Continuous Monitoring & Response",
    text: "24/7 SOC monitoring, incident response, and ongoing optimization to ensure maximum protection."
  }
];

const videoData = {
  name: "Cybersecurity Solutions Overview",
  description: "See how our cybersecurity solutions protect businesses from evolving threats and ensure compliance.",
  thumbnailUrl: "https://maninfini.com/manlogo.png",
  uploadDate: "2025-07-01",
  duration: "PT7M30S",
  contentUrl: "https://maninfini.com/videos/cybersecurity-solutions.mp4",
  publisher: {
    name: "Maninfini Automation",
    logo: "https://maninfini.com/manlogo.png"
  },
  author: {
    name: "Maninfini Team",
    url: "https://maninfini.com"
  },
  keywords: ["cybersecurity", "risk management", "compliance", "incident response", "security dashboard"],
  genre: "Educational"
};

const handleContact = () => {
  websiteActions.openWhatsApp(
    "+91 83105 16955",
    "Hello! I'm interested in your Cyber Security services. Please provide information about pricing, features, and compliance support."
  );
};

export default function CyberCloud() {
  return (
    <>
      <SEO 
        title="Cyber Security Services - Maninfini Automation"
        description="Comprehensive cybersecurity solutions: vulnerability assessment, penetration testing, security audits, compliance, and 24/7 monitoring."
        keywords="cybersecurity, vulnerability assessment, penetration testing, security audits, compliance, SOC, incident response, ISO 27001, GDPR, NIST, SOC 2, PCI DSS, HIPAA, security dashboard, threat detection, risk management"
        url="https://maninfini.com/services/cyber-cloud"
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
          name: "Cyber Security Services",
          description: "Comprehensive cybersecurity solutions",
          url: "https://maninfini.com/services/cyber-cloud"
        }}
      />
      <HowToSchema
        name="How to Secure Your Business Against Cyber Threats"
        description="A comprehensive guide to implementing cybersecurity best practices for business protection."
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/services/cyber-cloud"
        totalTime="PT15M"
        steps={howToSteps}
        tool={["Risk Assessment", "Security Controls", "SOC Monitoring"]}
      />
      <VideoSchema {...videoData} />
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 to-blue-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-blue-900/80 text-blue-300 rounded-full px-6 py-3 mb-6">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Cyber Security</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold mb-6">
                  Next-Gen Cybersecurity for Modern Businesses
                </h1>
                <p className="text-xl text-blue-200 mb-8 leading-relaxed">
                  Protect your business with advanced security solutions, real-time threat detection, and compliance expertise. Our intuitive dashboard puts actionable insights at your fingertips.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Get Started
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Certifications
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
                  <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                    Comprehensive Cybersecurity Solutions
                  </h2>
                  <p className="text-lg text-blue-200 mb-8 leading-relaxed">
                    We provide end-to-end cybersecurity services, from risk assessment to incident response and compliance. Our solutions are tailored to your business needs and regulatory requirements.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-blue-100">Vulnerability Assessment & Penetration Testing</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-blue-100">Security Audits & Compliance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-blue-100">24/7 SOC Monitoring & Incident Response</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-blue-100">Cloud & Network Security</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-800 to-gray-900 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-poppins font-bold mb-6">Why Choose Our Cybersecurity?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      <span>Real-Time Threat Detection</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="w-5 h-5" />
                      <span>Enterprise-Grade Security</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5" />
                      <span>Certified & Compliant</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <BarChart3 className="w-5 h-5" />
                      <span>Actionable Security Insights</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                  Key Cybersecurity Features
                </h2>
                <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                  Everything you need to protect your business from digital threats
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-blue-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Vulnerability Assessment</h3>
                  <p className="text-blue-200">Identify and prioritize system vulnerabilities with actionable recommendations.</p>
                </div>
                <div className="bg-blue-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mb-4">
                    <Lock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Penetration Testing</h3>
                  <p className="text-blue-200">Simulate real-world attacks to uncover security gaps and strengthen defenses.</p>
                </div>
                <div className="bg-blue-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mb-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Security Audits</h3>
                  <p className="text-blue-200">Comprehensive audits for compliance and risk management.</p>
                </div>
                <div className="bg-blue-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Incident Response</h3>
                  <p className="text-blue-200">Rapid containment and remediation of security incidents.</p>
                </div>
                <div className="bg-blue-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-blue-800 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Compliance & Certifications</h3>
                  <p className="text-blue-200">ISO, GDPR, NIST, SOC 2, PCI DSS, HIPAA compliance support.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Compliance Section */}
          <section className="py-10">
            <div className="container mx-auto px-4 text-center">
              <div className="flex flex-wrap gap-6 justify-center items-center">
                <img src="/manlogo.png" alt="ISO 27001" className="h-10" />
                <img src="/manlogo.png" alt="GDPR" className="h-10" />
                <img src="/manlogo.png" alt="NIST" className="h-10" />
                <img src="/manlogo.png" alt="SOC 2" className="h-10" />
                <img src="/manlogo.png" alt="PCI DSS" className="h-10" />
                <img src="/manlogo.png" alt="HIPAA" className="h-10" />
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-poppins font-bold text-white mb-6">
                  Our Security Engagement Process
                </h2>
                <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                  A proven methodology for proactive defense and rapid response.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Threat Analysis</h3>
                  <p className="text-blue-200">Real-time risk assessment and threat detection.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Defense Implementation</h3>
                  <p className="text-blue-200">Deploy security controls and compliance measures.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Continuous Monitoring</h3>
                  <p className="text-blue-200">24/7 SOC monitoring and rapid incident response.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-gray-900 to-blue-900">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Secure Your Business?
              </h2>
              <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
                Get a free security audit and see how Maninfini can protect your business from evolving cyber threats.
              </p>
              <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100" onClick={handleContact}>
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
}
