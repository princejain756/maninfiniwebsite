import { 
  Code2, 
  ShoppingCart, 
  MessageSquare, 
  Users, 
  Building, 
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Palette,
  TrendingUp,
  Brain
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { websiteActions, contactInfo } from '@/lib/utils';

const Services = () => {
  const services = [
    {
      icon: Code2,
      title: 'Web & Custom Development',
      description: 'Full-stack development solutions tailored to your business needs',
      features: ['React & Node.js', 'Custom APIs', 'Mobile Apps', 'Cloud Integration'],
      color: 'from-blue-500 to-primary'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce & Inventory',
      description: 'Complete e-commerce solutions with real-time inventory management',
      features: ['Multi-channel Sync', 'Real-time Tracking', 'Analytics Dashboard', 'Payment Gateway'],
      color: 'from-accent to-vibrant-orange-light'
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp & Communications',
      description: 'Advanced messaging solutions and cloud communication platforms',
      features: ['WhatsApp Bots', 'Bulk Messaging', 'IVR Systems', 'CRM Integration'],
      color: 'from-green-500 to-emerald-600',
      demo: '/WhatsappBotVideo.mp4'
    },
    {
      icon: Users,
      title: 'Offshore Talent',
      description: 'Dedicated development teams to scale your technical capacity',
      features: ['Skilled Developers', 'Agile Process', 'Time Zone Coverage', 'Quality Assurance'],
      color: 'from-purple-500 to-violet-600'
    },
    {
      icon: Building,
      title: 'Virtual Office Services',
      description: 'Complete virtual office setup with professional address and support',
      features: ['Business Address', 'Call Handling', 'Mail Management', 'Meeting Rooms'],
      color: 'from-indigo-500 to-blue-600'
    },
    {
      icon: Palette,
      title: 'Graphic Design & Packaging',
      description: 'Creative design solutions for branding, marketing, and product packaging',
      features: ['Brand Identity', 'Product Packaging', 'Marketing Materials', 'Digital Assets'],
      color: 'from-pink-500 to-rose-600',
      portfolio: '/Graphic%20Design%20Portfolio.pdf'
    },
    {
      icon: Brain,
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
      color: 'from-cyan-500 to-blue-600'
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

  return (
    <section id="services" className="py-20 bg-gradient-surface">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-6 py-3 mb-6">
            <Zap className="w-5 h-5" />
            <span className="font-medium">Our Services</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            What We Do
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            From concept to deployment, we provide end-to-end digital transformation 
            solutions that drive real business results.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${service.color} flex items-center justify-center mb-6 service-icon transition-all duration-300`}>
                <service.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-poppins font-semibold text-foreground mb-4">
                {service.title}
              </h3>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {service.description}
              </p>
              
              <ul className="space-y-3 mb-8">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-3 text-sm">
                    <div className="w-2 h-2 bg-accent rounded-full flex-shrink-0"></div>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <Button 
                variant="ghost" 
                className="group text-primary hover:text-accent p-0"
                onClick={() => handleServiceAction(service)}
              >
                {service.portfolio ? 'View Portfolio' : service.demo ? 'Watch Demo' : 'Explore Service'}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="card-elegant p-12 text-center animate-fade-in-up">
          <h3 className="text-3xl font-poppins font-semibold text-foreground mb-4">
            Our 3-Step Process
          </h3>
          <p className="text-muted-foreground mb-12 text-lg">
            Simple, transparent, and efficient approach to every project
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col items-center">
                <div className="w-20 h-20 bg-gradient-accent rounded-full flex items-center justify-center mb-6 shadow-glow">
                  <step.icon className="w-10 h-10 text-white" />
                </div>
                <h4 className="text-xl font-poppins font-semibold text-foreground mb-3">
                  {step.title}
                </h4>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="mt-12">
            <Button 
              size="lg" 
              className="btn-gradient"
              onClick={handleStartProject}
            >
              Start Your Project Today
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;