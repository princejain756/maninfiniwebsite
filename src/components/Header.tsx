import { useState, useEffect } from 'react';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { websiteActions, contactInfo } from '@/lib/utils';
import { useNavigate, useLocation } from 'react-router-dom';

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

  const navItems = [
    { label: 'Home', href: '/', section: 'home' },
    { label: 'Services', href: '/', section: 'services' },
    { label: 'Products', href: '/', section: 'products' },
    { label: 'About', href: '/', section: 'about' },
    { label: 'Contact', href: '/', section: 'contact' },
  ];

  const handleNavigation = (href: string, section?: string) => {
    // Close mobile menu
    setIsMenuOpen(false);

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
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I would like to schedule a free consultation about your automation services. Please let me know the available time slots.'
    );
  };

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-background/95 backdrop-blur-md shadow-elegant border-b border-border/50' 
        : 'bg-transparent'
    }`}>
      {/* Top Contact Bar */}
      <div className="bg-primary text-primary-foreground py-2 px-4">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 sm:gap-6">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              <span className="hidden sm:inline">+91 80 4112 5555</span>
              <span className="sm:hidden">+91 80 4112 5555</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">hello@maninfini.com</span>
              <span className="sm:hidden">hello@maninfini.com</span>
            </div>
          </div>
          <div className="hidden md:block">
            <span>🚀 Start Automating Today - Free Consultation Available</span>
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
              className="flex items-center hover:opacity-80 transition-opacity"
            >
              <img 
                src="/manlogo.png" 
                alt="Maninfini Logo" 
                className="h-8 sm:h-10 lg:h-12 w-auto mr-2 sm:mr-3"
              />
              <div className="flex flex-col">
                <div className="text-lg sm:text-xl lg:text-2xl font-poppins font-bold text-primary">Maninfini</div>
                <div className="flex items-center">
                  <span className="text-xs text-orange-500 mr-1">⭐</span>
                  <p className="text-xs text-muted-foreground hidden sm:block">Trusted Automation Partner Since 2008</p>
                  <p className="text-xs text-muted-foreground sm:hidden">Since 2008</p>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => handleNavigation(item.href, item.section)}
                className="text-foreground hover:text-primary transition-colors font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="btn-outline-elegant"
              onClick={handleGetDemo}
            >
              Get Demo
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
            className="lg:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden mt-4 py-4 border-t border-border animate-fade-in-up">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => handleNavigation(item.href, item.section)}
                  className="text-foreground hover:text-primary transition-colors font-medium py-2 text-left"
                >
                  {item.label}
                </button>
              ))}
              <div className="flex flex-col space-y-2 pt-4">
                <Button 
                  variant="outline" 
                  className="btn-outline-elegant"
                  onClick={() => {
                    handleGetDemo();
                    setIsMenuOpen(false);
                  }}
                >
                  Get Demo
                </Button>
                <Button 
                  className="btn-gradient"
                  onClick={() => {
                    handleFreeConsultation();
                    setIsMenuOpen(false);
                  }}
                >
                  Start Free Consultation
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;