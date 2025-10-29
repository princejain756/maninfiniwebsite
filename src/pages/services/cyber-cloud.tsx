import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import ReviewSchema from '@/components/ReviewSchema';
import HowToSchema from '@/components/HowToSchema';
import VideoSchema from '@/components/VideoSchema';
import { Shield, ArrowRight, Lock, Eye, AlertTriangle, Clock, Globe, Database, FileText, Wifi, UserCheck, Monitor, Activity, Settings, Star, CheckCircle, Award, BarChart3, Users, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { websiteActions, contactInfo } from '@/lib/utils';

// Comprehensive service offerings
const services = [
  {
    icon: Shield,
    title: "Vulnerability Assessment",
    description: "Comprehensive security assessments to identify and prioritize vulnerabilities in your systems and networks.",
    features: ["Network Security Scans", "Web Application Testing", "Database Security Review", "Cloud Configuration Audit"]
  },
  {
    icon: Lock,
    title: "Penetration Testing",
    description: "Ethical hacking to simulate real-world attacks and uncover security weaknesses before malicious actors do.",
    features: ["External Penetration Testing", "Internal Network Testing", "Web App Pen Testing", "Social Engineering Tests"]
  },
  {
    icon: Eye,
    title: "24/7 Security Monitoring",
    description: "Round-the-clock threat detection and monitoring with advanced SIEM technology and expert analysis.",
    features: ["Real-time Threat Detection", "Security Incident Response", "Log Analysis", "Automated Alerting"]
  },
  {
    icon: FileText,
    title: "Compliance & Auditing",
    description: "Ensure your organization meets industry standards and regulatory requirements with our compliance expertise.",
    features: ["GDPR Compliance", "ISO 27001 Certification", "HIPAA Compliance", "PCI-DSS Assessment"]
  },
  {
    icon: Database,
    title: "Data Protection",
    description: "Protect your sensitive data with encryption, access controls, and comprehensive data loss prevention.",
    features: ["Data Encryption", "Access Control", "DLP Solutions", "Backup Security"]
  },
  {
    icon: Globe,
    title: "Cloud Security",
    description: "Secure your cloud infrastructure across AWS, Azure, and Google Cloud with expert cloud security services.",
    features: ["Cloud Configuration", "Identity Management", "Multi-Cloud Security", "Container Security"]
  }
];

// Security frameworks and certifications
const certifications = [
  { name: "ISO 27001", description: "Information Security Management" },
  { name: "SOC 2 Type II", description: "Service Organization Control" },
  { name: "GDPR", description: "General Data Protection Regulation" },
  { name: "HIPAA", description: "Health Insurance Portability" },
  { name: "PCI DSS", description: "Payment Card Industry" },
  { name: "NIST", description: "Cybersecurity Framework" }
];

// Pricing plans
const pricingPlans = [
  {
    name: "Essential Security",
    price: "₹25,000",
    period: "per month",
    description: "Perfect for small businesses looking to establish basic security measures",
    features: [
      "Quarterly Vulnerability Scans",
      "Basic Security Monitoring",
      "Incident Response Support",
      "Security Awareness Training",
      "Email & Phone Support"
    ],
    popular: false
  },
  {
    name: "Advanced Protection",
    price: "₹75,000",
    period: "per month",
    description: "Comprehensive security for growing businesses with elevated threat exposure",
    features: [
      "Monthly Penetration Testing",
      "24/7 Security Monitoring",
      "Advanced Threat Detection",
      "Compliance Assistance",
      "Security Incident Response",
      "Priority Support"
    ],
    popular: true
  },
  {
    name: "Enterprise Security",
    price: "Custom",
    period: "pricing",
    description: "Tailored security solutions for large enterprises with complex requirements",
    features: [
      "Continuous Security Testing",
      "Dedicated Security Team",
      "Custom Compliance Programs",
      "Advanced Threat Intelligence",
      "Executive Security Briefings",
      "24/7 Dedicated Support"
    ],
    popular: false
  }
];

// Testimonials
const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "CTO, TechCorp India",
    content: "Maninfini's cybersecurity team transformed our security posture. Their proactive monitoring caught threats our previous security firm missed.",
    rating: 5
  },
  {
    name: "Priya Sharma",
    role: "IT Director, HealthPlus",
    content: "The penetration testing revealed critical vulnerabilities we weren't aware of. Their detailed reports and remediation guidance were invaluable.",
    rating: 5
  },
  {
    name: "Amit Patel",
    role: "CEO, FinanceSecure",
    content: "Achieving PCI DSS compliance was seamless with Maninfini's expertise. They guided us through every step of the certification process.",
    rating: 5
  }
];

const CyberCloudPage: React.FC = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What cybersecurity services does Maninfini offer?",
      answer: "We provide comprehensive cybersecurity solutions including vulnerability assessment, penetration testing, 24/7 security monitoring, compliance assistance, data protection, cloud security, and incident response services."
    },
    {
      question: "How often should we conduct security assessments?",
      answer: "We recommend quarterly vulnerability assessments for most businesses, with monthly penetration testing for high-risk environments. Critical infrastructure may require continuous monitoring and weekly assessments."
    },
    {
      question: "Do you provide 24/7 threat monitoring and response?",
      answer: "Yes, our Security Operations Center (SOC) provides round-the-clock threat monitoring with automated detection, real-time analysis, and immediate incident response to protect your business from emerging cyber threats."
    },
    {
      question: "Can you help with compliance requirements like GDPR and HIPAA?",
      answer: "Absolutely! We specialize in helping businesses achieve and maintain compliance with standards like GDPR, HIPAA, PCI-DSS, ISO 27001, SOC 2, and other regulatory frameworks with comprehensive audit support."
    },
    {
      question: "What is included in your penetration testing service?",
      answer: "Our penetration testing includes external network testing, internal network assessment, web application security testing, wireless network evaluation, and social engineering tests with detailed reports and remediation guidance."
    },
    {
      question: "How quickly can you respond to security incidents?",
      answer: "Our incident response team can respond within 15 minutes for critical threats, with full incident containment typically achieved within 2-4 hours depending on the severity and scope of the incident."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "Rajesh Kumar",
      rating: 5,
      reviewBody: "Maninfini's cybersecurity team identified and fixed critical vulnerabilities in our network that our previous security firm missed. Their proactive 24/7 monitoring has given us complete peace of mind.",
      datePublished: "2024-01-18",
      reviewTitle: "Outstanding Cybersecurity Services"
    },
    {
      author: "Priya Sharma",
      rating: 5,
      reviewBody: "The penetration testing service was incredibly thorough and professional. They provided detailed reports with actionable recommendations that significantly improved our security posture and helped us achieve compliance.",
      datePublished: "2024-01-15",
      reviewTitle: "Comprehensive Security Assessment"
    },
    {
      author: "Amit Patel",
      rating: 5,
      reviewBody: "Their incident response team helped us contain a security breach within hours. The expertise and speed of response was impressive, and they guided us through the entire recovery process.",
      datePublished: "2024-01-20",
      reviewTitle: "Excellent Incident Response"
    }
  ];

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Security Assessment & Risk Analysis",
      text: "We conduct comprehensive vulnerability assessment and penetration testing to identify security gaps and analyze risk levels in your infrastructure, applications, and networks."
    },
    {
      name: "Threat Detection & Monitoring Setup",
      text: "Implement advanced threat detection systems, configure 24/7 security monitoring with SIEM technology, and establish automated alerting for real-time threat identification."
    },
    {
      name: "Security Controls Implementation",
      text: "Deploy security controls, patches, configurations, and access management systems to address identified vulnerabilities and strengthen your overall security posture."
    },
    {
      name: "Compliance & Policy Framework",
      text: "Establish security policies, implement compliance measures for relevant regulations (GDPR, HIPAA, PCI-DSS), and create incident response procedures."
    },
    {
      name: "Training & Continuous Improvement",
      text: "Provide comprehensive security training for your team, establish security awareness programs, and implement continuous monitoring and improvement processes."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "Advanced Cybersecurity Services Overview",
    description: "Learn about Maninfini's comprehensive cybersecurity solutions including vulnerability assessment, penetration testing, 24/7 threat monitoring, compliance assistance, and incident response services.",
    thumbnailUrl: "https://maninfini.com/manilogos.webp",
    uploadDate: "2024-01-14",
    duration: "PT8M45S",
    contentUrl: "https://maninfini.com/videos/cybersecurity-services-demo.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manilogos.webp"
    },
    author: {
      name: "Maninfini Security Team",
      url: "https://maninfini.com"
    },
    keywords: ["cybersecurity", "vulnerability assessment", "penetration testing", "threat monitoring", "incident response", "security audits", "data protection", "compliance", "ISO 27001", "GDPR", "HIPAA", "SOC", "security consulting"],
    genre: "Educational"
  };
  const handleContact = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'m interested in your Cyber Security services. I need comprehensive cybersecurity solutions including vulnerability assessment, penetration testing, 24/7 threat monitoring, compliance assistance, and incident response. Please provide details about your security packages, implementation timeline, and pricing options.'
    );
  };

  const handleViewCertifications = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'d like to view your cybersecurity certifications and compliance documentation including ISO 27001, SOC 2, GDPR, HIPAA, and PCI-DSS certifications. Please share relevant certification details.'
    );
  };
  return (
    <>
      <SEO
        title="Cyber Security Services - Maninfini Automation"
        description="Comprehensive cybersecurity solutions including vulnerability assessment, penetration testing, security audits, 24/7 threat monitoring, and incident response. Protect your business from digital threats."
        keywords="cybersecurity, vulnerability assessment, penetration testing, security audits, threat monitoring, incident response, data protection, compliance, GDPR, HIPAA, PCI-DSS, ISO 27001, network security, cloud security, Maninfini"
        url="https://maninfini.com/services/cyber-cloud"
        image="https://maninfini.com/manilogos.webp"
        language="en"
        twitterHandle="@maninfini"
        googleAnalyticsId="G-4N0C42TBRL"
        googleTagManagerId=""
        type="service"
      />
      <FAQSchema faqs={faqs} />
      <LocalBusinessSchema />
      <ReviewSchema
        reviews={reviews}
        itemReviewed={{
          name: "Cyber Security Services",
          description: "Comprehensive cybersecurity solutions and threat protection services",
          url: "https://maninfini.com/services/cyber-cloud"
        }}
      />
      <HowToSchema
        name="How to Implement Cybersecurity Solutions"
        description="A comprehensive guide to implementing cybersecurity measures for your business"
        image="https://maninfini.com/manilogos.webp"
        url="https://maninfini.com/services/cyber-cloud"
        totalTime="PT10M"
        steps={howToSteps}
        tool={["Security Assessment Tools", "Monitoring Systems", "Compliance Frameworks", "Incident Response Tools"]}
      />
      <VideoSchema {...videoData} />

      <div className="min-h-screen">
        <Header />
        
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-blue-900/80 text-blue-300 rounded-full px-6 py-3 mb-6">
                  <Shield className="w-5 h-5" />
                  <span className="font-medium">Cyber Security</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-white mb-6">
                  Advanced Cybersecurity Solutions for Modern Businesses
                </h1>
                <p className="text-xl text-blue-200 mb-8 leading-relaxed">
                  Protect your business with enterprise-grade security solutions, real-time threat detection, 
                  and comprehensive compliance expertise. Our security experts safeguard your digital assets 24/7.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Get Security Assessment
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 font-medium" onClick={handleViewCertifications}>
                    View Certifications
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Services Overview */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Comprehensive Cybersecurity Services
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  From vulnerability assessments to incident response, we provide end-to-end security solutions 
                  tailored to your business needs and regulatory requirements.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.map((service, index) => {
                  const IconComponent = service.icon;
                  return (
                    <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                          <IconComponent className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-poppins font-semibold text-gray-900 mb-3">{service.title}</h3>
                        <p className="text-gray-600 mb-4">{service.description}</p>
                        <ul className="space-y-2">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Security Framework & Certifications */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Certified Security Excellence
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Our security practices are backed by industry-leading certifications and compliance frameworks.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {certifications.map((cert, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Award className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-2">{cert.name}</h3>
                      <p className="text-gray-600 text-sm">{cert.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20 bg-gray-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                  Our Security Implementation Process
                </h2>
                <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                  A proven methodology for comprehensive security implementation and continuous protection.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Assessment & Analysis</h3>
                  <p className="text-blue-200">Comprehensive security assessment, vulnerability analysis, and risk evaluation.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Implementation & Protection</h3>
                  <p className="text-blue-200">Deploy security controls, monitoring systems, and compliance measures.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Monitor className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Monitoring & Response</h3>
                  <p className="text-blue-200">24/7 threat monitoring, incident response, and continuous security improvement.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Testimonials Section */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  What Our Clients Say
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  See how our cybersecurity solutions have helped businesses protect their digital assets.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="p-6">
                    <CardContent className="p-0">
                      <div className="flex items-center gap-1 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <p className="text-gray-600 mb-4">"{testimonial.content}"</p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonial.name}</p>
                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Security Plans That Scale With Your Business
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choose the right security package for your organization's needs and budget.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {pricingPlans.map((plan, index) => (
                  <Card key={index} className={`p-8 ${plan.popular ? 'ring-2 ring-blue-500 shadow-lg' : ''}`}>
                    <CardContent className="p-0">
                      {plan.popular && (
                        <Badge className="mb-4">Most Popular</Badge>
                      )}
                      <h3 className="text-2xl font-poppins font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className="mb-4">
                        <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                        <span className="text-gray-600">/{plan.period}</span>
                      </div>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      <ul className="space-y-3 mb-8">
                        {plan.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button 
                        className={`w-full ${plan.popular ? 'btn-gradient' : ''}`} 
                        variant={plan.popular ? 'default' : 'outline'}
                        onClick={handleContact}
                      >
                        Get Started
                      </Button>
                    </CardContent>
                  </Card>
                ))}
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
                Get a free security audit and discover how Maninfini can protect your business from evolving cyber threats.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100" onClick={handleContact}>
                  Get Free Security Audit
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-gray-900 font-medium" onClick={handleViewCertifications}>
                  View Our Certifications
                </Button>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default CyberCloudPage;
