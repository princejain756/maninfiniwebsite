import { 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Twitter, 
  Facebook,
  ArrowRight,
  Code2,
  MessageSquare,
  ShoppingCart
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { websiteActions, contactInfo } from '@/lib/utils';

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Products', href: '#products' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '/blog' }
  ];

  const services = [
    { icon: Code2, label: 'Web Development', href: '#services' },
    { icon: ShoppingCart, label: 'E-commerce Solutions', href: '#services' },
    { icon: MessageSquare, label: 'WhatsApp Automation', href: '#services' },
    { label: 'Offshore Teams', href: '#services' },
    { label: 'Virtual Office', href: '#services' },
    { label: 'Custom Development', href: '#services' }
  ];

  const legalLinks = [
    { label: 'Privacy Policy', href: '/privacy-policy' },
    { label: 'Terms of Service', href: '/terms-of-service' },
    { label: 'Cookie Policy', href: '/cookie-policy' },
    { label: 'GDPR Compliance', href: '#gdpr' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: 'https://www.linkedin.com/company/maninfini-automation?originalSubdomain=in', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ];

  const handleSubscribe = () => {
    websiteActions.sendEmail(
      contactInfo.email,
      'Newsletter Subscription',
      'Hello,\n\nI would like to subscribe to your newsletter for automation insights and updates.\n\nPlease add me to your mailing list.\n\nThank you!'
    );
  };

  const handleQuickLink = (href: string) => {
    if (href.startsWith('#')) {
      websiteActions.scrollToSection(href.substring(1));
    } else if (href.startsWith('/')) {
      // Handle internal navigation
      window.location.href = href;
    }
  };

  return (
    <footer className="text-gray-900" style={{ backgroundColor: '#FFFAF1' }}>
      {/* Newsletter Section */}
      <div className="border-b border-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 items-center">
            <div>
              <h3 className="text-xl sm:text-2xl font-poppins font-semibold mb-3 sm:mb-4">
                Stay Updated with Latest Automation Trends
              </h3>
              <p className="text-gray-700 text-sm sm:text-base lg:text-lg">
                Get exclusive insights, case studies, and automation tips delivered to your inbox monthly.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Input 
                placeholder="Enter your email address"
                className="bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 text-sm sm:text-base"
              />
              <Button 
                className="btn-gradient px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base"
                onClick={handleSubscribe}
              >
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Company Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center mb-4 sm:mb-6">
              <img 
                src="/manlogo.png" 
                alt="Maninfini Logo" 
                className="h-16 sm:h-20 w-auto mr-3"
              />
              <div>
                <h3 className="text-xl sm:text-2xl font-poppins font-bold">Maninfini</h3>
                <p className="text-xs sm:text-sm text-gray-600">Automation</p>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
              Transforming businesses through innovative automation solutions, 
              custom development, and intelligent systems since 2008.
            </p>
            
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <div className="text-gray-700 text-sm sm:text-base">
                  <div className="text-gray-700">+91 97412 66370</div>
                </div>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
                <div className="text-gray-700 text-sm sm:text-base">
                  <div className="text-gray-700">mitesh@maninfini.com</div>
                  <div className="text-gray-700">support@maninfini.com</div>
                </div>
              </div>
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-accent mt-1" />
                <span className="text-gray-700 text-sm sm:text-base">
                  #20, Ground Floor, 12th Cross<br />
                  Cubbonpet, Banappa Park Road<br />
                  Bengaluru - 560002, India<br />
                  12.97002° N, 77.58429° E
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base sm:text-lg font-poppins font-semibold mb-4 sm:mb-6">Quick Links</h4>
            <ul className="space-y-2 sm:space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleQuickLink(link.href)}
                    className="text-gray-600 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 inline-block text-left text-sm sm:text-base"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-base sm:text-lg font-poppins font-semibold mb-4 sm:mb-6">Our Services</h4>
            <ul className="space-y-2 sm:space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <button 
                    onClick={() => handleQuickLink(service.href)}
                    className="text-gray-600 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 inline-block flex items-center gap-2 text-left text-sm sm:text-base"
                  >
                    {service.icon && <service.icon className="w-3 h-3 sm:w-4 sm:h-4" />}
                    {service.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Certifications */}
          <div>
            <h4 className="text-base sm:text-lg font-poppins font-semibold mb-4 sm:mb-6">Legal & Compliance</h4>
            <ul className="space-y-2 sm:space-y-3 mb-6 sm:mb-8">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-gray-600 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 inline-block text-sm sm:text-base"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <div className="space-y-2 sm:space-y-3">
              <div className="bg-white/80 rounded-lg p-2 sm:p-3">
                <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">ISO/IEC 27001</div>
                <div className="text-xs text-gray-600">Information Security</div>
              </div>
              <div className="bg-white/80 rounded-lg p-2 sm:p-3">
                <div className="text-xs sm:text-sm font-medium text-gray-900 mb-1">GDPR Compliant</div>
                <div className="text-xs text-gray-600">Data Protection</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-xs sm:text-sm text-center md:text-left">
              <p>© 2024 Maninfini Automation. All rights reserved.</p>
              <p className="mt-1">
                CIN: U72900KA2022PTC165226 | GST: 29AAQCM1170Q1ZO
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-gray-600 text-xs sm:text-sm">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-8 h-8 sm:w-10 sm:h-10 bg-white/80 rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;