import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail, ExternalLink, MessageCircle, ChevronRight, Shield, Cloud, Code2, ShoppingCart, MessageSquare, Users, Building, Palette, Brain, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { websiteActions, contactInfo } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mega menu data for desktop
  const serviceLinks = [
    { label: 'Cyber Security', href: '/services/cyber-cloud', Icon: Shield, desc: 'VAPT, audits, monitoring' },
    { label: 'Cloud Solutions', href: '/services/cloud-solutions', Icon: Cloud, desc: 'Migration, DevOps, DR' },
    { label: 'Web & Custom Dev', href: '/services/web-development', Icon: Code2, desc: 'Apps, APIs, mobile' },
    { label: 'E-commerce & Inventory', href: '/services/ecommerce-inventory', Icon: ShoppingCart, desc: 'Inventory, sync, analytics' },
    { label: 'WhatsApp & Comms', href: '/services/whatsapp-communications', Icon: MessageSquare, desc: 'Bots, IVR, CRM' },
    { label: 'Offshore Talent', href: '/services/offshore-talent', Icon: Users, desc: 'Dedicated teams' },
    { label: 'Virtual Office', href: '/services/virtual-office', Icon: Building, desc: 'Address, calls, mail' },
    { label: 'Graphic Design', href: '/services/graphic-design', Icon: Palette, desc: 'Brand & packaging' },
    { label: 'Quantiti (AI/Quant)', href: '/services/quantiti', Icon: Brain, desc: 'AI, HFT, risk' },
  ];

  const shopUrl = "https://shop.maninfini.com";

  const topLevelNav = [
    { label: 'Home', href: '/', section: 'home' },
    { label: 'Products', href: '/', section: 'products' },
    { label: 'About', href: '/', section: 'about' },
    { label: 'Contact', href: '/', section: 'contact' },
    { label: 'Quant Algorithms', href: 'https://quantiti.in', external: true },
  ];

  // Service pages with dark hero backgrounds where white nav text is needed
  const darkHeroServicePrefixes = ['/services/cyber-cloud'];
  const isDarkRoute = darkHeroServicePrefixes.some(prefix => location.pathname.startsWith(prefix));
  const isHomeRoute = location.pathname === '/';
  const isCareersRoute = location.pathname === '/careers';
  const isDarkBackgroundRoute = isDarkRoute || isHomeRoute || isCareersRoute;

  const redirectToShop = () => {
    window.location.href = shopUrl;
  };

  const handleNavigation = (href: string, section?: string, external?: boolean) => {
    // Close mobile menu
    setIsMenuOpen(false);

    // Handle external links
    if (external) {
      window.open(href, '_blank', 'noopener,noreferrer');
      return;
    }

    // If we're on the home page and trying to navigate to a section
    if (location.pathname === '/' && section) {
      // Scroll to section on the same page
      websiteActions.scrollToSection(section);
    } else if (href === '/' && section) {
      // Navigate to home page and then scroll to section
      navigate(href);
      // Use setTimeout to ensure navigation completes before scrolling
      setTimeout(() => {
        websiteActions.scrollToSection(section);
      }, 300);
    } else {
      // Regular navigation
      navigate(href);
    }
  };

  const handleGetDemo = () => {
    websiteActions.sendEmail(
      contactInfo.email,
      'Demo Request - Maninfini Automation',
      'Hello,\n\nI would like to request a demo of your automation services.\n\nPlease provide more information about:\n- Available demos\n- Scheduling options\n- Contact details\n\nThank you!'
    );
  };

  const handleFreeConsultation = () => {
    setIsMenuOpen(false);
    websiteActions.scrollToSection('contact');
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      {/* Top Contact Bar - simplified & actionable */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-xs sm:text-sm">
          <div className="flex items-center gap-4 sm:gap-6">
            <button
              onClick={() => websiteActions.sendEmail(contactInfo.email, 'Inquiry - Maninfini Automation')}
              className="inline-flex items-center gap-1 hover:opacity-90"
              aria-label="Email us"
            >
              <Mail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{contactInfo.displayEmail}</span>
              <span className="sm:hidden">Email</span>
            </button>
            <button
              onClick={() => websiteActions.callPhone(contactInfo.salesPhone)}
              className="inline-flex items-center gap-1 hover:opacity-90"
              aria-label="Call us"
            >
              <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">{contactInfo.salesPhone}</span>
              <span className="sm:hidden">Call</span>
            </button>
            <button
              onClick={() => websiteActions.openWhatsApp(contactInfo.salesPhone, 'Hello! I would like a free consultation.')}
              className="inline-flex items-center gap-1 hover:opacity-90"
              aria-label="WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">WhatsApp</span>
              <span className="sm:hidden">WA</span>
            </button>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span>🚀 Free Consultation</span>
            <ChevronRight className="w-4 h-4" />
          </div>
          <div className="md:hidden">
            <span className="text-xs">🚀 Free Consultation</span>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center hover:opacity-80 transition-opacity pl-2 sm:pl-4"
            >
              <img 
                src="/manilogos.webp" 
                alt="Maninfini Logo" 
                className="h-8 sm:h-10 lg:h-12 w-auto mr-2 sm:mr-3"
              />
              <div className="flex flex-col">
                <div className={`text-base sm:text-lg lg:text-xl font-poppins font-bold transition-colors duration-300 ${isScrolled ? 'text-primary' : (isDarkBackgroundRoute ? 'text-white' : 'text-primary')}`}>Maninfini</div>
                <div className="flex items-center">
                  <span className="text-xs text-orange-500 mr-1">⭐</span>
                  <p
                    className={`text-xs hidden sm:block transition-colors duration-300 font-medium ${isScrolled ? 'text-gray-700' : (isDarkBackgroundRoute ? 'text-gray-200' : 'text-gray-700')}`}
                  >
                    Trusted Automation Partner Since 2008
                  </p>
                  <p
                    className={`text-xs sm:hidden transition-colors duration-300 font-medium ${isScrolled ? 'text-gray-700' : (isDarkBackgroundRoute ? 'text-gray-200' : 'text-gray-700')}`}
                  >
                    Since 2008
                  </p>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation with Mega Menu */}
          <div className="hidden lg:flex items-center space-x-2">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Solutions (Services) */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={`font-medium transition-colors duration-300 ${isScrolled 
                    ? 'text-foreground hover:bg-accent hover:text-accent-foreground' 
                    : isDarkBackgroundRoute 
                      ? 'text-white bg-transparent hover:text-gray-200 hover:bg-white/10 data-[state=open]:bg-white/10 data-[state=open]:text-white' 
                      : 'text-foreground hover:text-foreground/80 hover:bg-white/10'}`}>Solutions</NavigationMenuTrigger>
                  <NavigationMenuContent className="p-4 md:w-[760px]">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {serviceLinks.map(({ label, href, Icon, desc }) => (
                        <button
                          key={label}
                          onClick={() => handleNavigation(href)}
                          className="text-left p-3 rounded-lg hover:bg-primary/5 transition-colors"
                        >
                          <div className="flex items-start gap-3">
                            <div className="w-9 h-9 rounded-md bg-primary/10 flex items-center justify-center">
                              <Icon className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                              <div className="text-sm font-semibold text-foreground">{label}</div>
                              <div className="text-xs text-muted-foreground">{desc}</div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Products anchor */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <button
                      onClick={() => handleNavigation('/', 'products')}
                      className={`group inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors duration-300 ${isScrolled 
                        ? 'hover:bg-accent hover:text-accent-foreground' 
                        : isDarkBackgroundRoute 
                          ? 'text-white hover:text-gray-200 hover:bg-white/10' 
                          : 'text-foreground hover:text-foreground/80 hover:bg-white/10'}`}
                    >
                      Products
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* Shop */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                <button
                  onClick={redirectToShop}
                  className={`group inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors duration-300 ${isScrolled 
                    ? 'hover:bg-accent hover:text-accent-foreground' 
                    : isDarkBackgroundRoute 
                      ? 'text-white hover:text-gray-200 hover:bg-white/10' 
                      : 'text-foreground hover:text-foreground/80 hover:bg-white/10'}`}
                >
                  Shop
                </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>

                {/* About & Contact anchors */}
                {topLevelNav.filter(n => ['About','Contact'].includes(n.label)).map((item) => (
                  <NavigationMenuItem key={item.label}>
                    <NavigationMenuLink asChild>
                      <button
                        onClick={() => handleNavigation(item.href, item.section)}
                        className={`group inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors duration-300 ${isScrolled 
                          ? 'hover:bg-accent hover:text-accent-foreground' 
                          : isDarkBackgroundRoute 
                            ? 'text-white hover:text-gray-200 hover:bg-white/10' 
                            : 'text-foreground hover:text-foreground/80 hover:bg-white/10'}`}
                      >
                        {item.label}
                      </button>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                {/* External link */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <button
                      onClick={() => handleNavigation('https://quantiti.in', undefined, true)}
                      className={`group inline-flex h-10 items-center justify-center rounded-md px-4 text-sm font-medium transition-colors duration-300 ${isScrolled 
                        ? 'hover:bg-accent hover:text-accent-foreground' 
                        : isDarkBackgroundRoute 
                          ? 'text-white hover:text-gray-200 hover:bg-white/10' 
                          : 'text-foreground hover:text-foreground/80 hover:bg-white/10'}`}
                    >
                      Quant Algorithms
                      <ExternalLink className="ml-1 w-3.5 h-3.5" />
                    </button>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4">
            {/* Hiring CTA for maximum visibility */}
            <Button 
              className="btn-gradient relative overflow-hidden"
              onClick={() => {
                try { (window as any).gtag?.('event', 'hiring_cta_click', { location: 'header', event_category: 'engagement' }); } catch {}
                handleNavigation('/careers')
              }}
            >
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/90 animate-ping" />
              We’re Hiring
            </Button>
            <Button 
              className="btn-gradient"
              onClick={handleFreeConsultation}
            >
              Start Free Consultation
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden p-2 transition-colors duration-300 ${isScrolled ? 'text-foreground' : (isDarkBackgroundRoute ? 'text-white' : 'text-foreground')}`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-6 border-t border-border animate-fade-in-up bg-background/95 backdrop-blur-md rounded-lg">
            <div className="flex flex-col space-y-4">
              {[{ label: 'Home', href: '/', section: 'home' }, { label: 'Services', href: '/', section: 'services' }, { label: 'Products', href: '/', section: 'products' }, { label: 'Shop', href: shopUrl, shopRedirect: true }, { label: 'About', href: '/', section: 'about' }, { label: 'Contact', href: '/', section: 'contact' }, { label: 'Careers', href: '/careers' }, { label: 'Quant Algorithms', href: 'https://quantiti.in', external: true }].map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    if (item.label === 'Careers') {
                      try { (window as any).gtag?.('event', 'hiring_cta_click', { location: 'mobile_menu', event_category: 'engagement' }); } catch {}
                    }
                    if (item.shopRedirect) {
                      setIsMenuOpen(false);
                      redirectToShop();
                      return;
                    }
                    handleNavigation(item.href, item.section, item.external)
                  }}
                  className="text-foreground hover:text-primary transition-colors font-medium py-3 text-left flex items-center gap-2 hover:bg-primary/5 rounded-lg px-4"
                >
                  {item.label}
                  {item.external && <ExternalLink className="w-3 h-3" />}
                </button>
              ))}
              <div className="flex flex-col space-y-3 pt-4 border-t border-border/50 px-4">
                <Button 
                  className="btn-gradient w-full h-12 rounded-xl shadow-md"
                  onClick={() => {
                    handleFreeConsultation();
                    setIsMenuOpen(false);
                  }}
                >
                  Start Free Consultation
                </Button>
                <div className="grid grid-cols-3 gap-2">
                  <Button variant="outline" className="w-full" onClick={() => handleNavigation('/', 'home')}>
                    <Home className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => websiteActions.callPhone(contactInfo.salesPhone)}>
                    <Phone className="w-4 h-4" />
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => websiteActions.openWhatsApp(contactInfo.salesPhone)}>
                    <MessageCircle className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
