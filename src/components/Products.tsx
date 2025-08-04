import { 
  Package, 
  MessageCircle, 
  BarChart3, 
  RefreshCw, 
  Bell, 
  Smartphone,
  ArrowRight,
  Play
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import inventoryImage from '@/assets/inventory-software.jpg';
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



  return (
    <section id="products" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-6 py-3 mb-6">
            <Package className="w-5 h-5" />
            <span className="font-medium">Our Products</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            Powerful Software Solutions
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ready-to-deploy products that can be customized for your specific business needs.
          </p>
        </div>

        {/* Inventory Management Product */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-poppins font-semibold text-foreground">
                  Inventory Management Software
                </h3>
                <p className="text-accent font-medium">Real-time stock tracking & multi-channel sync</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Transform your inventory management with our powerful software that provides 
              real-time tracking, automated reordering, and seamless integration across all sales channels.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {inventoryFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="btn-gradient"
                onClick={() => handleRequestDemo('Inventory Management Software')}
              >
                Request Demo
                <Play className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-outline-elegant"
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
              className="w-full h-auto rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500"
            />
          </div>
        </div>

        {/* Chatbot Engine Product */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="lg:order-2 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-accent rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-3xl font-poppins font-semibold text-foreground">
                  WhatsApp Chatbot Engine
                </h3>
                <p className="text-accent font-medium">Automated customer engagement & bulk messaging</p>
              </div>
            </div>
            
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Revolutionize customer communication with our intelligent chatbot engine. 
              Automate responses, manage bulk campaigns, and integrate seamlessly with your CRM.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {chatbotFeatures.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex gap-4">
              <Button 
                size="lg" 
                className="btn-gradient"
                onClick={handleStartTrial}
              >
                Start Free Trial
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="btn-outline-elegant"
                onClick={handleSeeDemo}
              >
                See Demo
              </Button>
            </div>
          </div>
          
          <div className="lg:order-1 animate-slide-in-right">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8">
              <div className="bg-white rounded-xl p-6 shadow-card">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">WhatsApp Business</div>
                    <div className="text-sm text-green-500">Online</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-100 rounded-lg p-3 text-sm">
                    Hi! Welcome to Maninfini. How can I help you today?
                  </div>
                  <div className="bg-primary text-white rounded-lg p-3 text-sm ml-8">
                    I need help with inventory management
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 text-sm">
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


      </div>
    </section>
  );
};

export default Products;