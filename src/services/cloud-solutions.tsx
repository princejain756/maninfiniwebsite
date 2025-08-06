
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
import { Cloud, Zap, CheckCircle, ArrowRight, Server, Shield, TrendingUp, Award } from 'lucide-react';
import { websiteActions, contactInfo } from '@/lib/utils';

const faqs = [
  {
    question: "Which cloud platforms do you support?",
    answer: "We support AWS, Azure, Google Cloud, and hybrid/multi-cloud environments."
  },
  {
    question: "How do you ensure cloud security?",
    answer: "We implement enterprise-grade security controls, compliance frameworks, and 24/7 monitoring for all cloud deployments."
  },
  {
    question: "Can you migrate my existing infrastructure to the cloud?",
    answer: "Yes, we offer seamless cloud migration services, including assessment, planning, and execution with zero downtime."
  },
  {
    question: "Do you provide cost optimization and analytics?",
    answer: "Our cloud solutions include cost optimization, usage analytics, and automated scaling to maximize ROI."
  }
];

const reviews = [
  {
    author: "Amit Verma",
    rating: 5,
    reviewBody: "Maninfini migrated our entire infrastructure to AWS with zero downtime. Their cloud dashboard is intuitive and helped us cut costs by 30%.",
    datePublished: "2025-05-20",
    reviewTitle: "Outstanding Cloud Migration"
  },
  {
    author: "Neha Singh",
    rating: 5,
    reviewBody: "The cloud security and automation features are top-notch. We now have peace of mind and agility!",
    datePublished: "2025-07-02",
    reviewTitle: "Excellent Cloud Solutions"
  }
];

const howToSteps = [
  {
    name: "Cloud Assessment & Planning",
    text: "We analyze your current infrastructure, business needs, and goals to design the perfect cloud strategy."
  },
  {
    name: "Migration & Deployment",
    text: "Seamless migration of apps, data, and workloads to the cloud with zero downtime."
  },
  {
    name: "Optimization & Scaling",
    text: "Automated scaling, cost optimization, and ongoing support for maximum ROI."
  }
];

const videoData = {
  name: "Cloud Solutions Overview",
  description: "See how our cloud solutions accelerate digital transformation, improve security, and optimize costs.",
  thumbnailUrl: "https://maninfini.com/manlogo.png",
  uploadDate: "2025-07-01",
  duration: "PT6M45S",
  contentUrl: "https://maninfini.com/videos/cloud-solutions-overview.mp4",
  publisher: {
    name: "Maninfini Automation",
    logo: "https://maninfini.com/manlogo.png"
  },
  author: {
    name: "Maninfini Team",
    url: "https://maninfini.com"
  },
  keywords: ["cloud solutions", "cloud migration", "managed hosting", "cloud security", "cost optimization"],
  genre: "Educational"
};

const handleContact = () => {
  websiteActions.openWhatsApp(
    "+91 83105 16955",
    "Hello! I'm interested in your Cloud Solutions. Please provide information about migration, security, and pricing."
  );
};

export default function CloudSolutions() {
  return (
    <>
      <SEO 
        title="Cloud Solutions & Managed Hosting - Maninfini Automation"
        description="Scalable and secure cloud services: migration, hosting, DevOps, security, cost optimization, and compliance. AWS, Azure, GCP supported."
        keywords="cloud solutions, cloud migration, managed hosting, DevOps, cloud automation, cloud security, cost optimization, AWS, Azure, Google Cloud, compliance, ISO, GDPR, SOC 2, PCI DSS, HIPAA, cloud dashboard, cloud analytics"
        url="https://maninfini.com/services/cloud-solutions"
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
          name: "Cloud Solutions",
          description: "Scalable and secure cloud services",
          url: "https://maninfini.com/services/cloud-solutions"
        }}
      />
      <HowToSchema
        name="How to Migrate and Optimize Your Business in the Cloud"
        description="A comprehensive guide to cloud migration, optimization, and security for modern businesses."
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/services/cloud-solutions"
        totalTime="PT12M"
        steps={howToSteps}
        tool={["Cloud Assessment", "Migration Tools", "Optimization Platforms"]}
      />
      <VideoSchema {...videoData} />
      <div className="min-h-screen">
        <Header />
        <main>
          {/* Hero Section */}
          <section className="pt-32 pb-20 bg-gradient-to-br from-sky-900 to-indigo-900">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-2 bg-indigo-900/80 text-sky-300 rounded-full px-6 py-3 mb-6">
                  <Cloud className="w-5 h-5" />
                  <span className="font-medium">Cloud Solutions</span>
                </div>
                <h1 className="text-4xl lg:text-6xl font-poppins font-bold mb-6">
                  Scalable, Secure Cloud Services for Modern Businesses
                </h1>
                <p className="text-xl text-sky-200 mb-8 leading-relaxed">
                  Accelerate your digital transformation with seamless cloud migration, managed hosting, automation, and enterprise-grade security. Our cloud dashboard delivers actionable insights and cost savings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="btn-gradient" onClick={handleContact}>
                    Start Your Cloud Journey
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button variant="outline" size="lg">
                    View Cloud Partners
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
                    Comprehensive Cloud Solutions
                  </h2>
                  <p className="text-lg text-sky-200 mb-8 leading-relaxed">
                    We provide end-to-end cloud services, from migration and hosting to security and cost optimization. Our solutions are tailored to your business needs and growth goals.
                  </p>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sky-100">Cloud Migration & Managed Hosting</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sky-100">DevOps & Automation</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sky-100">Cloud Security & Compliance</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400" />
                      <span className="text-sky-100">Cost Optimization & Analytics</span>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-indigo-800 to-sky-900 rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-poppins font-bold mb-6">Why Choose Our Cloud Solutions?</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Zap className="w-5 h-5" />
                      <span>Automated Scaling & Optimization</span>
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
                      <TrendingUp className="w-5 h-5" />
                      <span>Cost Savings & Analytics</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 bg-indigo-900">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                  Key Cloud Features
                </h2>
                <p className="text-lg text-sky-200 max-w-3xl mx-auto">
                  Everything you need to accelerate your business in the cloud
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-sky-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-800 rounded-lg flex items-center justify-center mb-4">
                    <Cloud className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Cloud Migration</h3>
                  <p className="text-sky-200">Seamless migration of apps, data, and workloads to AWS, Azure, or GCP.</p>
                </div>
                <div className="bg-sky-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-800 rounded-lg flex items-center justify-center mb-4">
                    <Server className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Managed Cloud Hosting</h3>
                  <p className="text-sky-200">Fully managed, secure, and scalable cloud hosting for all business needs.</p>
                </div>
                <div className="bg-sky-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-800 rounded-lg flex items-center justify-center mb-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">DevOps & Automation</h3>
                  <p className="text-sky-200">CI/CD pipelines, infrastructure as code, and automated cloud operations.</p>
                </div>
                <div className="bg-sky-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-800 rounded-lg flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Cloud Security</h3>
                  <p className="text-sky-200">Enterprise-grade security controls, compliance, and 24/7 monitoring.</p>
                </div>
                <div className="bg-sky-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-800 rounded-lg flex items-center justify-center mb-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Cloud Cost Optimization</h3>
                  <p className="text-sky-200">Usage analytics, automated scaling, and cost-saving strategies.</p>
                </div>
                <div className="bg-sky-900 rounded-xl p-6 shadow-lg">
                  <div className="w-12 h-12 bg-indigo-800 rounded-lg flex items-center justify-center mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Compliance & Certifications</h3>
                  <p className="text-sky-200">Support for ISO, GDPR, SOC 2, PCI DSS, HIPAA, and more.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Partner Section */}
          <section className="py-10">
            <div className="container mx-auto px-4 text-center">
              <div className="flex flex-wrap gap-6 justify-center items-center">
                <img src="/manlogo.png" alt="AWS" className="h-10" />
                <img src="/manlogo.png" alt="Azure" className="h-10" />
                <img src="/manlogo.png" alt="Google Cloud" className="h-10" />
                <img src="/manlogo.png" alt="ISO" className="h-10" />
                <img src="/manlogo.png" alt="GDPR" className="h-10" />
                <img src="/manlogo.png" alt="SOC 2" className="h-10" />
              </div>
            </div>
          </section>

          {/* Process Section */}
          <section className="py-20">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl font-poppins font-bold text-white mb-6">
                  Our Cloud Adoption Process
                </h2>
                <p className="text-lg text-sky-200 max-w-3xl mx-auto">
                  A proven methodology for seamless migration, optimization, and ongoing support.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Cloud Assessment</h3>
                  <p className="text-sky-200">Analyze current infrastructure and business needs.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Cloud className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Migration & Setup</h3>
                  <p className="text-sky-200">Seamless migration and secure cloud deployment.</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-poppins font-semibold text-white mb-3">Optimization & Scaling</h3>
                  <p className="text-sky-200">Automated scaling, cost optimization, and ongoing support.</p>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-to-r from-sky-900 to-indigo-900">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl lg:text-4xl font-poppins font-bold text-white mb-6">
                Ready to Transform Your Business with Cloud?
              </h2>
              <p className="text-xl text-sky-200 mb-8 max-w-3xl mx-auto">
                Start your cloud journey with Maninfini and unlock agility, security, and cost savings.
              </p>
              <Button size="lg" className="bg-white text-indigo-900 hover:bg-gray-100" onClick={handleContact}>
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
