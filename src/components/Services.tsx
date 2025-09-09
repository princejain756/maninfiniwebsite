// Service Icons
import cloudIcon from '@/assets/ICONS/CLOUDBG.png';
import cyberIcon from '@/assets/ICONS/CYBERSEBG.png';
import ecomIcon from '@/assets/ICONS/ECOM.png';
import graphicDesignIcon from '@/assets/ICONS/GRAPHDESIGN.png';
import offshoreIcon from '@/assets/ICONS/OFFSHORETALENT.png';
import quantitiIcon from '@/assets/ICONS/QUANTITINEW.png';
import virtualOfficeIcon from '@/assets/ICONS/VIRTUAL OFFICE.png';
import webDevIcon from '@/assets/ICONS/WEB AND CUSTOM.png';
import whatsappIcon from '@/assets/ICONS/WHATSAPPBG.png';

// Process Icons
import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';
import * as React from 'react';
import { Button } from '@/components/ui/button';
import { websiteActions, contactInfo } from '@/lib/utils';

const Services = () => {
  // Service icon mapping
  const serviceIcons = {
    'Cyber Security': cyberIcon,
    'Cloud Solutions': cloudIcon,
    'Web & Custom Development': webDevIcon,
    'E-commerce & Inventory': ecomIcon,
    'WhatsApp & Communications': whatsappIcon,
    'Offshore Talent': offshoreIcon,
    'Virtual Office Services': virtualOfficeIcon,
    'Graphic Design & Packaging': graphicDesignIcon,
    'Quantiti': quantitiIcon
  };

  const services = [
    {
      icon: serviceIcons['Cyber Security'],
      title: 'Cyber Security',
      description: 'Comprehensive cybersecurity solutions to protect your business from digital threats and ensure compliance.',
      features: [
        'Vulnerability Assessment',
        'Penetration Testing',
        'Security Audits',
        'Data Protection & Compliance',
        '24/7 Threat Monitoring',
        'Incident Response',
        'Cloud Security',
        'Network Security'
      ],
      category: 'Security & Cloud'
    },
    {
      icon: serviceIcons['Cloud Solutions'],
      title: 'Cloud Solutions',
      description: 'Scalable and secure cloud services for modern businesses, enabling agility, collaboration, and cost savings.',
      features: [
        'Cloud Migration',
        'Managed Cloud Hosting',
        'DevOps & Automation',
        'Disaster Recovery',
        'Hybrid & Multi-Cloud',
        'Serverless Architecture',
        'Cloud Cost Optimization',
        'Collaboration Tools'
      ],
      category: 'Security & Cloud'
    },
    {
      icon: serviceIcons['Web & Custom Development'],
      title: 'Web & Custom Development',
      description: 'Full-stack development solutions tailored to your business needs',
      features: ['React & Node.js', 'Custom APIs', 'Mobile Apps', 'Cloud Integration'],
      category: 'Development'
    },
    {
      icon: serviceIcons['E-commerce & Inventory'],
      title: 'E-commerce & Inventory',
      description: 'Complete e-commerce solutions with real-time inventory management',
      features: ['Multi-channel Sync', 'Real-time Tracking', 'Analytics Dashboard', 'Payment Gateway'],
      category: 'Commerce & Comms'
    },
    {
      icon: serviceIcons['WhatsApp & Communications'],
      title: 'WhatsApp & Communications',
      description: 'Advanced messaging solutions and cloud communication platforms',
      features: ['WhatsApp Bots', 'Bulk Messaging', 'IVR Systems', 'CRM Integration'],
      demo: '/WhatsappBotVideo.mp4',
      category: 'Commerce & Comms'
    },
    {
      icon: serviceIcons['Offshore Talent'],
      title: 'Offshore Talent',
      description: 'Dedicated development teams to scale your technical capacity',
      features: ['Skilled Developers', 'Agile Process', 'Time Zone Coverage', 'Quality Assurance'],
      category: 'Operations'
    },
    {
      icon: serviceIcons['Virtual Office Services'],
      title: 'Virtual Office Services',
      description: 'Complete virtual office setup with professional address and support',
      features: ['Business Address', 'Call Handling', 'Mail Management', 'Meeting Rooms'],
      category: 'Operations'
    },
    {
      icon: serviceIcons['Graphic Design & Packaging'],
      title: 'Graphic Design & Packaging',
      description: 'Creative design solutions for branding, marketing, and product packaging',
      features: ['Brand Identity', 'Product Packaging', 'Marketing Materials', 'Digital Assets'],
      portfolio: '/Graphic%20Design%20Portfolio.pdf',
      category: 'Design & AI'
    },
    {
      icon: serviceIcons['Quantiti'],
      title: 'Quantiti',
      description: 'Advanced AI and algorithmic solutions for financial markets, risk management, and business optimization',
      features: [
        'Algorithmic Trading & HFT',
        'Fraud Detection & Risk Management',
        'Portfolio Optimization & Robo-Advisory',
        'Product & Content Personalization',
        'Price Optimization & Revenue Management',
        'Supply Chain & Logistics Optimization',
        'Insurance Underwriting & Risk Analysis',
        'Computer Vision & Image Recognition',
        'Scientific Computing & Simulation'
      ],
      category: 'Design & AI'
    }
  ];

  const processSteps = [
    { icon: Zap, title: 'Quick Analysis', description: 'Understand your requirements in 24 hours' },
    { icon: Shield, title: 'Secure Development', description: 'Build with industry best practices' },
    { icon: Clock, title: 'Timely Delivery', description: 'Agile delivery with regular updates' }
  ];

  const handleServiceAction = (service: any) => {
    if (service.portfolio) {
      websiteActions.downloadFile(service.portfolio, `${service.title} Portfolio`);
    } else if (service.demo) {
      websiteActions.openExternalLink(service.demo, true);
    } else {
      // Navigate to service page based on service title
      const serviceRoutes: { [key: string]: string } = {
        'Cyber Security': '/services/cyber-cloud',
        'Cloud Solutions': '/services/cloud-solutions',
        'Web & Custom Development': '/services/web-development',
        'E-commerce & Inventory': '/services/ecommerce-inventory',
        'WhatsApp & Communications': '/services/whatsapp-communications',
        'Offshore Talent': '/services/offshore-talent',
        'Virtual Office Services': '/services/virtual-office',
        'Graphic Design & Packaging': '/services/graphic-design',
        'Quantiti': '/services/quantiti'
      };
      const route = serviceRoutes[service.title];
      if (route) {
        window.location.href = route;
      } else {
        // Fallback to WhatsApp for consultation
        websiteActions.openWhatsApp(
          contactInfo.salesPhone,
          `Hello! I'm interested in your ${service.title} service. Please provide more information about pricing, features, and implementation timeline.`
        );
      }
    }
  };

  const handleStartProject = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I would like to start a project with Maninfini. Please provide information about project requirements, timeline, and next steps.'
    );
  };

  const categories = ['All', 'Development', 'Commerce & Comms', 'Operations', 'Security & Cloud', 'Design & AI'] as const;
  const [selectedCategory, setSelectedCategory] = React.useState<(typeof categories)[number]>('All');

  const visibleServices = selectedCategory === 'All'
    ? services
    : services.filter((s) => s.category === selectedCategory);

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-gradient-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Our Services</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-poppins font-bold text-foreground mb-4 sm:mb-6">
            What We Do
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            From concept to deployment, we provide end-to-end digital transformation 
            solutions that drive real business results.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-2 rounded-full text-xs sm:text-sm border transition-colors ${
                selectedCategory === cat
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background hover:bg-primary/5 border-border'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {visibleServices.map((service, index) => (
            <div 
              key={index} 
              className="service-card group animate-fade-in-up p-6 sm:p-8 will-change-transform"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`rounded-xl flex items-center justify-center service-icon transition-all duration-300 ${
                service.title === 'Graphic Design & Packaging'
                  ? 'w-32 h-32 sm:w-36 sm:h-36 mb-0 sm:mb-1'
                  : 'w-28 h-28 sm:w-32 sm:h-32 mb-4 sm:mb-6'
              }`}>
                {service.icon ? (
                  <img
                    src={service.icon}
                    alt={`${service.title} icon`}
                    className={`object-contain drop-shadow-sm ${
                      service.title === 'Graphic Design & Packaging'
                        ? 'w-24 h-24 sm:w-28 sm:h-28'
                        : 'w-20 h-20 sm:w-24 sm:h-24'
                    }`}
                  />
                ) : (
                  <div className={`bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg flex items-center justify-center ${
                    service.title === 'Graphic Design & Packaging'
                      ? 'w-24 h-24 sm:w-28 sm:h-28'
                      : 'w-20 h-20 sm:w-24 sm:h-24'
                  }`}>
                    <span className="text-primary font-bold text-lg sm:text-xl">
                      {service.title.charAt(0)}
                    </span>
                  </div>
                )}
              </div>
              
              <h3 className="text-lg sm:text-xl md:text-2xl font-poppins font-semibold text-foreground mb-3 sm:mb-4">
                {service.title}
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm">
                    <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="ghost"
                className="group text-foreground hover:text-foreground p-0 text-sm sm:text-base bg-transparent border-none shadow-none"
                style={{ backgroundColor: 'transparent', color: 'inherit', boxShadow: 'none', border: 'none' }}
                onClick={() => handleServiceAction(service)}
              >
                {service.portfolio ? 'View Portfolio' : service.demo ? 'Watch Demo' : 'Explore Service'}
                <ArrowRight className="ml-2 w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="card-elegant p-8 sm:p-10 lg:p-12 text-center animate-fade-in-up">
          <h3 className="text-2xl sm:text-3xl font-poppins font-semibold text-foreground mb-3 sm:mb-4">
            Our 3-Step Process
          </h3>
          <p className="text-base sm:text-lg text-muted-foreground mb-8 sm:mb-12">
            Simple, transparent, and efficient approach to every project
          </p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-24 h-24 sm:w-28 sm:h-28 bg-gradient-accent rounded-full flex items-center justify-center mb-4 sm:mb-6 shadow-glow">
                  <step.icon className="w-12 h-12 sm:w-16 sm:h-16 text-white" />
                </div>
                <h4 className="text-lg sm:text-xl font-poppins font-semibold text-foreground mb-2 sm:mb-3">
                  {step.title}
                </h4>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 sm:mt-12">
            <Button 
              size="lg" 
              className="btn-gradient text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
              onClick={handleStartProject}
            >
              Start Your Project Today
              <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
