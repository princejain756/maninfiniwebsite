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
import { Cloud, ArrowRight, CheckCircle, Server, Database, Shield, Zap, Globe, Settings, Users, Award, Star, BarChart3, Activity, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import awsLogo from '@/assets/cloudservices/aws.webp';
import gcpLogo from '@/assets/cloudservices/gcp.png';
import azureLogo from '@/assets/cloudservices/Microsoft_Azure.svg.png';
import multiCloudLogo from '@/assets/cloudservices/multicloud.png';
import { Badge } from '@/components/ui/badge';
import { websiteActions, contactInfo } from '@/lib/utils';

// Comprehensive cloud service offerings
const cloudServices = [
  {
    icon: Cloud,
    title: "Cloud Migration & Strategy",
    description: "Seamless migration of your applications and data to the cloud with comprehensive planning and minimal downtime.",
    features: ["Migration Assessment", "Cloud Strategy Planning", "Data Migration", "Application Modernization"]
  },
  {
    icon: Server,
    title: "Managed Cloud Infrastructure",
    description: "Fully managed cloud infrastructure with 24/7 monitoring, maintenance, and optimization across all major platforms.",
    features: ["Infrastructure Management", "24/7 Monitoring", "Auto-scaling", "Performance Optimization"]
  },
  {
    icon: Database,
    title: "Cloud Storage & Database",
    description: "Scalable cloud storage solutions and managed database services with automatic backups and disaster recovery.",
    features: ["Object Storage", "Database Management", "Backup Solutions", "Disaster Recovery"]
  },
  {
    icon: Shield,
    title: "Cloud Security & Compliance",
    description: "Enterprise-grade security for your cloud infrastructure with compliance support for various industry standards.",
    features: ["Security Hardening", "Access Management", "Compliance Monitoring", "Threat Protection"]
  },
  {
    icon: Settings,
    title: "DevOps & Automation",
    description: "Streamline your development and deployment processes with CI/CD pipelines and infrastructure automation.",
    features: ["CI/CD Pipelines", "Infrastructure as Code", "Automated Deployments", "Container Orchestration"]
  },
  {
    icon: BarChart3,
    title: "Cost Optimization",
    description: "AI-driven cost optimization strategies to reduce cloud spending while maintaining performance and reliability.",
    features: ["Cost Analysis", "Resource Optimization", "Reserved Instances", "Budget Monitoring"]
  }
];

// Major cloud platforms
const cloudPlatforms = [
  {
    name: "Amazon Web Services",
    logo: awsLogo,
    description: "Comprehensive AWS services including EC2, S3, RDS, Lambda, and more",
    features: ["EC2 Computing", "S3 Storage", "RDS Database", "Lambda Serverless"]
  },
  {
    name: "Microsoft Azure",
    logo: azureLogo,
    description: "Full Azure ecosystem with virtual machines, storage, and enterprise integrations",
    features: ["Virtual Machines", "Azure Storage", "SQL Database", "Active Directory"]
  },
  {
    name: "Google Cloud Platform",
    logo: gcpLogo,
    description: "GCP services with advanced AI/ML capabilities and BigQuery analytics",
    features: ["Compute Engine", "Cloud Storage", "BigQuery", "AI/ML Services"]
  },
  {
    name: "Multi-Cloud Solutions",
    logo: multiCloudLogo,
    description: "Hybrid and multi-cloud architectures for maximum flexibility and reliability",
    features: ["Hybrid Cloud", "Multi-Cloud Management", "Vendor Flexibility", "Risk Mitigation"]
  }
];

// Migration process steps
const migrationSteps = [
  {
    step: "01",
    title: "Assessment & Planning",
    description: "Comprehensive analysis of your current infrastructure, applications, and data to create a detailed migration roadmap."
  },
  {
    step: "02",
    title: "Architecture Design",
    description: "Design optimal cloud architecture considering scalability, security, performance, and cost-effectiveness."
  },
  {
    step: "03",
    title: "Migration Execution",
    description: "Phased migration approach with thorough testing and validation to ensure zero data loss and minimal downtime."
  },
  {
    step: "04",
    title: "Optimization & Monitoring",
    description: "Post-migration optimization, performance monitoring, and continuous improvement of your cloud environment."
  }
];

// Pricing plans
const pricingPlans = [
  {
    name: "Starter Cloud",
    price: "₹35,000",
    period: "per month",
    description: "Perfect for small businesses taking their first steps into the cloud",
    features: [
      "Basic Cloud Migration",
      "Single Cloud Platform",
      "Standard Monitoring",
      "Email Support",
      "Monthly Reports"
    ],
    popular: false
  },
  {
    name: "Business Cloud",
    price: "₹85,000",
    period: "per month",
    description: "Comprehensive cloud solutions for growing businesses with complex needs",
    features: [
      "Multi-Cloud Migration",
      "Advanced Monitoring",
      "DevOps Automation",
      "Cost Optimization",
      "24/7 Support",
      "Weekly Reports"
    ],
    popular: true
  },
  {
    name: "Enterprise Cloud",
    price: "Custom",
    period: "pricing",
    description: "Tailored cloud solutions for large enterprises with mission-critical requirements",
    features: [
      "Custom Cloud Architecture",
      "Dedicated Cloud Team",
      "Advanced Security",
      "Compliance Support",
      "Priority Support",
      "Real-time Monitoring"
    ],
    popular: false
  }
];

// Testimonials
const testimonials = [
  {
    name: "Amit Singh",
    role: "CTO, TechVenture India",
    content: "Maninfini's cloud migration service was flawless. They migrated our entire infrastructure from on-premises to AWS with zero downtime. The cost savings have been remarkable.",
    rating: 5
  },
  {
    name: "Kavita Patel",
    role: "IT Director, ScaleUp Solutions",
    content: "Their DevOps automation and multi-cloud strategy transformed our operations. We've reduced deployment time by 80% and cut infrastructure costs by 40%.",
    rating: 5
  },
  {
    name: "Rajesh Kumar",
    role: "CEO, DataCorp",
    content: "The cloud optimization services helped us achieve better performance while reducing costs. Their expertise in AWS and Azure is unmatched.",
    rating: 5
  }
];

const CloudSolutionsPage: React.FC = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What cloud platforms does Maninfini support for migration?",
      answer: "We support all major cloud platforms including Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), and hybrid multi-cloud solutions. We help you choose the best platform based on your specific needs, compliance requirements, and budget."
    },
    {
      question: "How long does a typical cloud migration take?",
      answer: "Migration timelines vary based on complexity and data volume. Simple migrations can take 2-4 weeks, while complex enterprise migrations may take 3-6 months. We provide detailed migration plans with realistic timelines and phased approaches to minimize disruption."
    },
    {
      question: "Do you provide ongoing cloud management and optimization?",
      answer: "Yes, we offer comprehensive managed cloud services including 24/7 monitoring, performance optimization, security updates, automated scaling, backup management, and AI-driven cost optimization to ensure your cloud infrastructure runs efficiently."
    },
    {
      question: "Can you help reduce our cloud costs without affecting performance?",
      answer: "Absolutely! Our cloud cost optimization services use advanced analytics and AI-driven tools to optimize your cloud spending. We typically reduce cloud costs by 20-40% through resource optimization, reserved instances, and intelligent scaling while maintaining or improving performance."
    },
    {
      question: "What about data security and compliance in the cloud?",
      answer: "We implement enterprise-grade security measures including encryption at rest and in transit, advanced access controls, compliance frameworks (GDPR, HIPAA, SOC 2, PCI-DSS), regular security audits, and continuous monitoring to ensure your data remains secure and compliant."
    },
    {
      question: "Do you support hybrid and multi-cloud architectures?",
      answer: "Yes, we specialize in hybrid cloud solutions that combine on-premises infrastructure with cloud services, and multi-cloud strategies that leverage multiple cloud providers for maximum flexibility, performance, and risk mitigation."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "Amit Singh",
      rating: 5,
      reviewBody: "Maninfini's cloud migration service was absolutely seamless. They migrated our entire infrastructure from on-premises to AWS without any downtime. The cost savings and performance improvements have been substantial and exceeded our expectations.",
      datePublished: "2024-01-20",
      reviewTitle: "Excellent Cloud Migration Experience"
    },
    {
      author: "Kavita Patel",
      rating: 5,
      reviewBody: "Their DevOps automation and cloud cost optimization services have completely transformed our operations. We've reduced costs by 35% while improving performance, reliability, and deployment speed significantly.",
      datePublished: "2024-01-17",
      reviewTitle: "Outstanding Cloud Optimization Results"
    },
    {
      author: "Rajesh Kumar",
      rating: 5,
      reviewBody: "The multi-cloud strategy they implemented gave us the flexibility and redundancy we needed. Their expertise across AWS, Azure, and GCP is impressive, and the ongoing support is excellent.",
      datePublished: "2024-01-22",
      reviewTitle: "Exceptional Multi-Cloud Expertise"
    }
  ];

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Cloud Assessment & Strategy Planning",
      text: "We assess your current infrastructure, applications, and business requirements to create a comprehensive cloud migration strategy with platform recommendations and cost analysis."
    },
    {
      name: "Architecture Design & Platform Selection",
      text: "Design optimal cloud architecture and choose the best cloud platform (AWS, Azure, GCP, or multi-cloud) based on your specific needs, compliance requirements, and cost considerations."
    },
    {
      name: "Migration Execution & Testing",
      text: "Execute the migration using proven methodologies with comprehensive testing, validation, and minimal downtime approach to ensure successful transition to the cloud."
    },
    {
      name: "Security Implementation & Compliance",
      text: "Implement enterprise-grade security controls, access management, encryption, and compliance measures to ensure your cloud environment meets industry standards."
    },
    {
      name: "Optimization & Ongoing Management",
      text: "Provide continuous monitoring, performance optimization, cost management, and ongoing support to ensure your cloud environment remains efficient, secure, and cost-effective."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "Comprehensive Cloud Solutions Services Overview",
    description: "Learn about Maninfini's comprehensive cloud solutions including migration, managed hosting, DevOps automation, cost optimization, and multi-cloud strategies for modern businesses.",
    thumbnailUrl: "https://maninfini.com/manilogos.webp",
    uploadDate: "2024-01-16",
    duration: "PT9M20S",
    contentUrl: "https://maninfini.com/videos/cloud-solutions-demo.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manilogos.webp"
    },
    author: {
      name: "Maninfini Cloud Team",
      url: "https://maninfini.com"
    },
    keywords: ["cloud migration", "AWS", "Azure", "GCP", "DevOps", "cloud hosting", "cost optimization", "hybrid cloud", "multi-cloud", "serverless", "disaster recovery", "cloud security", "infrastructure automation"],
    genre: "Educational"
  };
  const handleContact = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'m interested in your Cloud Solutions services. I need scalable cloud infrastructure including cloud migration, managed hosting, DevOps automation, multi-cloud strategies, and cost optimization. Please provide details about your cloud packages, migration process, timeline, and pricing options.'
    );
  };

  const handleGetQuote = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I\'d like to get a custom quote for cloud solutions including migration assessment, architecture design, and ongoing management. Please provide detailed pricing information for my specific requirements.'
    );
  };
  return (
    <>
      <SEO
        title="Cloud Solutions - Maninfini Automation"
        description="Scalable cloud services including migration, managed hosting, DevOps automation, and cost optimization. AWS, Azure, GCP cloud solutions for modern businesses."
        keywords="cloud solutions, cloud migration, AWS, Azure, GCP, DevOps, cloud hosting, cost optimization, hybrid cloud, serverless, disaster recovery, cloud security, Maninfini"
        url="https://maninfini.com/services/cloud-solutions"
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
          name: "Cloud Solutions Services",
          description: "Comprehensive cloud migration, hosting, and optimization services",
          url: "https://maninfini.com/services/cloud-solutions"
        }}
      />
      <HowToSchema
        name="How to Migrate to Cloud"
        description="A comprehensive guide to migrating your business infrastructure to the cloud"
        image="https://maninfini.com/manilogos.webp"
        url="https://maninfini.com/services/cloud-solutions"
        totalTime="PT12M"
        steps={howToSteps}
        tool={["Cloud Platforms", "Migration Tools", "Monitoring Systems", "Cost Optimization Tools"]}
      />
      <VideoSchema {...videoData} />

      <div className="min-h-screen">
        <Header />

        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-100">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-6 py-3 mb-6">
                  <Cloud className="w-5 h-5" />
                  <span className="font-medium">Cloud Solutions</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold text-gray-900 mb-6">
                  Scalable Cloud Solutions for Modern Businesses
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Transform your business with enterprise-grade cloud infrastructure. From migration to optimization, 
                  we deliver secure, scalable, and cost-effective cloud solutions across AWS, Azure, and GCP.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Start Your Migration
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg" className="font-medium" onClick={handleGetQuote}>
                    Get Custom Quote
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Cloud Platforms Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Multi-Cloud Expertise
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  We're certified experts across all major cloud platforms, helping you choose the right solution for your needs.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {cloudPlatforms.map((platform, index) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-0">
                      <div className="w-20 h-20 rounded-xl flex items-center justify-center mx-auto mb-4 bg-white shadow-sm">
                        <img src={platform.logo} alt={`${platform.name} logo`} className="max-w-[70%] max-h-[70%] object-contain" />
                      </div>
                      <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-3">{platform.name}</h3>
                      <p className="text-gray-600 mb-4 text-sm">{platform.description}</p>
                      <ul className="space-y-2">
                        {platform.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Services Overview */}
          <section className="py-20 bg-gray-50">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Comprehensive Cloud Services
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  From strategy to implementation, we provide end-to-end cloud solutions that drive business growth.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {cloudServices.map((service, index) => {
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

          {/* Migration Process */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-gray-900 mb-6">
                  Our Proven Migration Process
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  A systematic approach to ensure successful cloud migration with minimal disruption to your business.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {migrationSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-xl font-bold text-white">{step.step}</span>
                    </div>
                    <h3 className="text-lg font-poppins font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="py-20 bg-blue-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                  Why Choose Our Cloud Solutions?
                </h2>
                <p className="text-lg text-blue-200 max-w-3xl mx-auto">
                  Experience the benefits of modern cloud infrastructure with our expert guidance and support.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Cost Reduction</h3>
                  <p className="text-blue-200">Reduce infrastructure costs by 20-40% with intelligent optimization.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Enhanced Performance</h3>
                  <p className="text-blue-200">Improve application performance and user experience.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Enterprise Security</h3>
                  <p className="text-blue-200">Bank-grade security with compliance and data protection.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Global Scalability</h3>
                  <p className="text-blue-200">Scale globally with automatic resource management.</p>
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
                  See how our cloud solutions have transformed businesses across industries.
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
                  Cloud Solutions That Fit Your Budget
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Choose the right cloud solution for your organization's needs and scale as you grow.
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
          <section className="py-20 bg-gradient-to-r from-sky-500 via-blue-500 to-indigo-600">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Transform Your Business with Cloud?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                Get a free cloud assessment and discover how our cloud solutions can reduce costs, 
                improve performance, and scale your business for the future.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100" onClick={handleContact}>
                  Get Free Assessment
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:text-blue-600 font-medium" onClick={handleGetQuote}>
                  Request Custom Quote
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

export default CloudSolutionsPage;
