import { 
  Package, 
  MessageCircle, 
  BarChart3, 
  RefreshCw, 
  Bell, 
  Smartphone,
  ArrowRight,
  Play,
  Ruler,
  Users,
  Database
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import inventoryImage from '@/assets/inventory-software.jpg';
import erpCrmHrmImage from '@/assets/crmhrmerp.png';
import { websiteActions, contactInfo } from '@/lib/utils';

const Products = () => {
  const inventoryFeatures = [
    { icon: Package, title: 'SKU Management', description: 'Unlimited product variants with automated categorization' },
    { icon: Bell, title: 'Reorder Alerts', description: 'Smart notifications when stock levels are low' },
    { icon: BarChart3, title: 'Analytics Dashboard', description: 'Real-time insights into inventory performance' },
    { icon: RefreshCw, title: 'Multi-channel Sync', description: 'Synchronize across all sales channels instantly' }
  ];

  const chatbotFeatures = [
    { icon: MessageCircle, title: 'WhatsApp Integration', description: 'Native WhatsApp Business API integration' },
    { icon: Smartphone, title: 'Bulk Messaging', description: 'Send targeted campaigns to thousands of customers' },
    { icon: RefreshCw, title: 'CRM Integration', description: 'Seamlessly connect with existing CRM systems' },
    { icon: BarChart3, title: 'Campaign Analytics', description: 'Track engagement and conversion metrics' }
  ];

  // ERP / CRM / HRM feature sets
  const erpFeatures = [
    { icon: Database, title: 'Unified Ledger', description: 'Finance, procurement, and inventory on a single source of truth' },
    { icon: RefreshCw, title: 'Workflow Automation', description: 'Automate approvals, GRN, and reconciliation flows' },
    { icon: BarChart3, title: 'Real-time Analytics', description: 'P&L, cashflow and operations KPIs with drill-downs' },
    { icon: Package, title: 'Operations Hub', description: 'MRP, BOM, production planning and dispatch orchestration' }
  ];

  const crmFeatures = [
    { icon: Users, title: '360° Customer View', description: 'Leads, accounts, activities and notes in one profile' },
    { icon: MessageCircle, title: 'Omnichannel CRM', description: 'WhatsApp, email, and calls unified into deal timelines' },
    { icon: BarChart3, title: 'Pipeline Insights', description: 'Forecasting, velocity, and win/loss analytics' },
    { icon: Smartphone, title: 'Mobile CRM', description: 'On-the-go lead capture, tasks and reminders' }
  ];

  const hrmFeatures = [
    { icon: Users, title: 'Workforce Directory', description: 'Org chart, roles, skills, and access control' },
    { icon: RefreshCw, title: 'Attendance & Leave', description: 'Geo-tagged attendance, shifts, and policy engines' },
    { icon: Database, title: 'Payroll Engine', description: 'Allowances, deductions, compliance-ready pay runs' },
    { icon: BarChart3, title: 'People Analytics', description: 'Attrition risk, engagement signals, and performance trends' }
  ];



  const handleRequestDemo = (product: string) => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      `Hello! I would like to request a demo of your ${product}. Please provide scheduling options and demo details.`
    );
  };

  const handleViewFeatures = (product: string) => {
    websiteActions.sendEmail(
      contactInfo.email,
      `${product} Features Request`,
      `Hello,\n\nI would like to know more about the features of your ${product}.\n\nPlease provide:\n- Detailed feature list\n- Technical specifications\n- Integration capabilities\n- Pricing information\n\nThank you!`
    );
  };

  const handleStartTrial = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I would like to start a free trial of your WhatsApp Chatbot Engine. Please provide trial access and setup instructions.'
    );
  };

  const handleSeeDemo = () => {
    websiteActions.openExternalLink('/WhatsappBotVideo.mp4', true);
  };

  // ERP/CRM/HRM section state
  const [activeSuite, setActiveSuite] = useState<'ERP' | 'CRM' | 'HRM'>('ERP');
  const suiteMeta: Record<'ERP' | 'CRM' | 'HRM', { subtitle: string; features: { icon: any; title: string; description: string }[] }> = {
    ERP: {
      subtitle: 'Plan, run and scale operations with a unified enterprise backbone',
      features: erpFeatures
    },
    CRM: {
      subtitle: 'Acquire, engage and grow customers across every channel',
      features: crmFeatures
    },
    HRM: {
      subtitle: 'Manage people operations from onboarding to payroll to insights',
      features: hrmFeatures
    }
  };



  return (
    <section id="products" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Our Products</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-poppins font-bold text-foreground mb-4 sm:mb-6">
            Powerful Software Solutions
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Ready-to-deploy products that can be customized for your specific business needs.
          </p>
        </div>

        {/* Inventory Management Product */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-semibold text-foreground">
                  Inventory Management Software
                </h3>
                <p className="text-accent font-medium text-sm sm:text-base">Real-time stock tracking & multi-channel sync</p>
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Transform your inventory management with our powerful software that provides 
              real-time tracking, automated reordering, and seamless integration across all sales channels.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {inventoryFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="btn-gradient text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
                onClick={() => handleRequestDemo('Inventory Management Software')}
              >
                Request Demo
                <Play className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-outline-elegant text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
                onClick={() => handleViewFeatures('Inventory Management Software')}
              >
                View Features
              </Button>
            </div>
          </div>
          
          <div className="animate-slide-in-right">
            <img 
              src={inventoryImage} 
              alt="Inventory Management Dashboard" 
              className="w-full h-auto rounded-xl sm:rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500"
            />
          </div>
        </div>

        {/* Chatbot Engine Product */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          <div className="lg:order-2 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-semibold text-foreground">
                  WhatsApp Chatbot Engine
                </h3>
                <p className="text-accent font-medium text-sm sm:text-base">Automated customer engagement & bulk messaging</p>
              </div>
            </div>
            
            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              Revolutionize customer communication with our intelligent chatbot engine. 
              Automate responses, manage bulk campaigns, and integrate seamlessly with your CRM.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {chatbotFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 sm:gap-4">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="btn-gradient text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
                onClick={handleStartTrial}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-outline-elegant text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
                onClick={handleSeeDemo}
              >
                See Demo
              </Button>
            </div>
          </div>
          
          <div className="lg:order-1 animate-slide-in-right">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
              <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 shadow-card">
                <div className="flex items-center gap-3 mb-4 sm:mb-6">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm sm:text-base">WhatsApp Business</div>
                    <div className="text-xs sm:text-sm text-green-500">Online</div>
                  </div>
                </div>
                
                <div className="space-y-3 sm:space-y-4">
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                    Hi! Welcome to Maninfini. How can I help you today?
                  </div>
                  <div className="bg-primary text-white rounded-lg p-2 sm:p-3 text-xs sm:text-sm ml-4 sm:ml-8">
                    I need help with inventory management
                  </div>
                  <div className="bg-gray-100 rounded-lg p-2 sm:p-3 text-xs sm:text-sm">
                    Perfect! I can help you with that. Would you like to:
                    <br />1. See our inventory software demo
                    <br />2. Schedule a consultation
                    <br />3. Get pricing information
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ERP / CRM / HRM Suite */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 rounded-xl flex items-center justify-center">
                <Database className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-semibold text-foreground">
                  ERP • CRM • HRM Suite
                </h3>
                <p className="text-accent font-medium text-sm sm:text-base">Modern enterprise stack for operations, customers, and people</p>
              </div>
            </div>

            {/* Suite Switcher */}
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-5">
              {(['ERP','CRM','HRM'] as const).map(tab => (
                <Button
                  key={tab}
                  variant={activeSuite === tab ? 'default' : 'outline'}
                  className={`rounded-full px-4 sm:px-5 ${activeSuite === tab ? 'btn-gradient' : ''}`}
                  onClick={() => setActiveSuite(tab)}
                  size="sm"
                >
                  {tab}
                </Button>
              ))}
            </div>

            <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8 leading-relaxed">
              {suiteMeta[activeSuite].subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {suiteMeta[activeSuite].features.map((feature, index) => (
                <div key={index} className="group flex items-start gap-3 sm:gap-4 p-3 rounded-lg border border-border hover:border-primary/30 hover:bg-primary/5 transition-colors">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15">
                    <feature.icon className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1 text-sm sm:text-base">{feature.title}</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Button 
                size="lg" 
                className="btn-gradient text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
                onClick={() => handleRequestDemo(`${activeSuite} Suite`)}
              >
                Request Demo
                <Play className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-outline-elegant text-sm sm:text-base px-4 sm:px-6 py-3 sm:py-4"
                onClick={() => handleViewFeatures(`${activeSuite} Suite`)}
              >
                View Features
              </Button>
            </div>
          </div>

          <div className="animate-slide-in-right">
            <img 
              src={erpCrmHrmImage} 
              alt={`${activeSuite} Suite`} 
              className="w-full h-auto rounded-xl sm:rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500"
            />
          </div>
        </div>


      </div>
    </section>
  );
};

export default Products;