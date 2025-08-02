import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Products from '@/components/Products';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import FAQSchema from '@/components/FAQSchema';
import LocalBusinessSchema from '@/components/LocalBusinessSchema';
import PerformanceOptimizer from '@/components/PerformanceOptimizer';
import { StaggerTestimonials } from '@/components/ui/stagger-testimonials';

import SecurityHeaders from '@/components/SecurityHeaders';
import ReviewSchema from '@/components/ReviewSchema';
import EventSchema from '@/components/EventSchema';
import HowToSchema from '@/components/HowToSchema';
import VideoSchema from '@/components/VideoSchema';

const Index = () => {
  // FAQ data for schema
  const faqs = [
    {
      question: "What services does Maninfini Automation provide?",
      answer: "Maninfini Automation provides comprehensive business automation services including process automation, custom software development, AI & machine learning solutions, digital transformation consulting, and enterprise software development."
    },
    {
      question: "How long has Maninfini Automation been in business?",
      answer: "Maninfini Automation has been providing automation solutions since 2008, with over 15 years of experience in digital transformation and business automation."
    },
    {
      question: "What industries does Maninfini Automation serve?",
      answer: "We serve multiple industries including manufacturing, healthcare, finance, retail, logistics, and technology sectors, providing tailored automation solutions for each industry's unique needs."
    },
    {
      question: "Does Maninfini Automation provide free consultations?",
      answer: "Yes, we offer free initial consultations to understand your business needs and provide customized automation solutions that align with your goals and budget."
    },
    {
      question: "What technologies does Maninfini Automation use?",
      answer: "We use cutting-edge technologies including AI/ML, RPA, cloud computing, API development, web technologies, mobile development, and enterprise software platforms to deliver comprehensive automation solutions."
    }
  ];

  // Sample review data for schema
  const reviews = [
    {
      author: "John Smith",
      rating: 5,
      reviewBody: "Maninfini Automation transformed our manufacturing process with their intelligent automation solutions. The ROI was incredible!",
      datePublished: "2024-01-15",
      reviewTitle: "Outstanding Automation Solutions"
    },
    {
      author: "Sarah Johnson",
      rating: 5,
      reviewBody: "Their custom software development team delivered exactly what we needed. Highly recommend for any business automation project.",
      datePublished: "2024-01-10",
      reviewTitle: "Excellent Custom Development"
    }
  ];

  // Sample event data for schema
  const upcomingEvent = {
    name: "Digital Transformation Webinar 2024",
    description: "Join us for an exclusive webinar on the latest trends in business automation and digital transformation strategies.",
    startDate: "2024-02-15T10:00:00Z",
    endDate: "2024-02-15T11:30:00Z",
    organizer: {
      name: "Maninfini Automation",
      url: "https://maninfini.com"
    },
    eventType: "Webinar" as const,
    image: "https://maninfini.com/manlogo.png",
    url: "https://maninfini.com/webinar-2024"
  };

  // Sample how-to data for schema
  const howToSteps = [
    {
      name: "Assess Current Processes",
      text: "Identify manual, repetitive tasks that can be automated to improve efficiency."
    },
    {
      name: "Choose Automation Tools",
      text: "Select appropriate automation technologies based on your business requirements."
    },
    {
      name: "Implement and Test",
      text: "Deploy automation solutions and thoroughly test before full implementation."
    }
  ];

  // Sample video data for schema
  const videoData = {
    name: "Introduction to Business Automation",
    description: "Learn the basics of business automation and how it can transform your organization.",
    thumbnailUrl: "https://maninfini.com/manlogo.png",
    uploadDate: "2024-01-15",
    duration: "PT5M30S",
    contentUrl: "https://maninfini.com/videos/intro-automation.mp4",
    publisher: {
      name: "Maninfini Automation",
      logo: "https://maninfini.com/manlogo.png"
    },
    author: {
      name: "Maninfini Team",
      url: "https://maninfini.com"
    },
    keywords: ["business automation", "digital transformation", "process optimization"],
    genre: "Educational"
  };

  return (
    <>
      <SEO 
        title="Maninfini Automation - Business Automation Services"
        description="Transform your business with cutting-edge automation and custom software development. Trusted automation partner since 2008."
        keywords="business automation, digital transformation, custom software development, process automation, AI solutions, machine learning, workflow automation, enterprise software, business intelligence, data analytics, cloud solutions, API development, web applications, mobile apps, system integration, legacy modernization, digital consulting, IT services, technology solutions, automation consulting"
        url="https://maninfini.com"
        image="https://maninfini.com/manlogo.png"
        language="en"
        twitterHandle="@maninfini"
        googleAnalyticsId="GA_MEASUREMENT_ID"
        googleTagManagerId="GTM_CONTAINER_ID"
      />
      <SecurityHeaders />
      <FAQSchema faqs={faqs} />
      <LocalBusinessSchema />
      <ReviewSchema 
        reviews={reviews}
        itemReviewed={{
          name: "Maninfini Automation Services",
          description: "Comprehensive business automation and digital transformation services",
          url: "https://maninfini.com"
        }}
      />
      <EventSchema {...upcomingEvent} />
      <HowToSchema
        name="How to Implement Business Automation"
        description="A step-by-step guide to implementing business automation in your organization"
        image="https://maninfini.com/manlogo.png"
        url="https://maninfini.com/automation-guide"
        totalTime="PT30M"
        steps={howToSteps}
        tool={["RPA Tools", "AI Platforms", "Custom Software"]}
      />
      <VideoSchema {...videoData} />
      <PerformanceOptimizer>
        <div className="min-h-screen">
          <Header />
          <main>
            <Hero />
            <Services />
            <Products />
            <About />
            <StaggerTestimonials />
            <Contact />
          </main>
          <Footer />
        </div>
      </PerformanceOptimizer>
      
    </>
  );
};

export default Index;
