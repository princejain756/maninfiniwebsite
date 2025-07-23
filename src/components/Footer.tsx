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

const Footer = () => {
  const quickLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'Products', href: '#products' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
    { label: 'Blog', href: '#blog' }
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
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Cookie Policy', href: '#cookies' },
    { label: 'GDPR Compliance', href: '#gdpr' }
  ];

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' }
  ];

  return (
    <footer className="bg-gray-900 text-white" style={{ backgroundColor: 'hsl(var(--surface-dark))' }}>
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="container mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-poppins font-semibold mb-4">
                Stay Updated with Latest Automation Trends
              </h3>
              <p className="text-white text-lg">
                Get exclusive insights, case studies, and automation tips delivered to your inbox monthly.
              </p>
            </div>
            
            <div className="flex gap-4">
              <Input 
                placeholder="Enter your email address"
                className="bg-gray-800 border-gray-600 text-white placeholder:text-gray-300"
              />
              <Button className="btn-gradient px-8">
                Subscribe
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-6">
              <img 
                src="/manlogo.png" 
                alt="Maninfini Logo" 
                className="h-16 w-auto mr-3"
              />
              <div>
                <h3 className="text-2xl font-poppins font-bold">Maninfini</h3>
                <p className="text-sm text-white">Automation Solutions</p>
              </div>
            </div>
            
            <p className="text-white mb-6 leading-relaxed">
              Transforming businesses through innovative automation solutions, 
              custom development, and intelligent systems since 2008.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-accent" />
                <div className="text-white">
                  <div className="text-white">+91 80 4112 5555</div>
                  <div className="text-white">+91 98450 12345</div>
                  <div className="text-white">+91 80056 34678</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent" />
                <div className="text-white">
                  <div className="text-white">hello@maninfini.com</div>
                  <div className="text-white">support@maninfini.com</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent mt-1" />
                <span className="text-white">
                  Allalasandra, Bengaluru<br />
                  Karnataka 560065, India<br />
                  12.92° N, 77.58° E
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {services.map((service, index) => (
                <li key={index}>
                  <a 
                    href={service.href}
                    className="text-white/80 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 inline-block flex items-center gap-2"
                  >
                    {service.icon && <service.icon className="w-4 h-4" />}
                    {service.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Certifications */}
          <div>
            <h4 className="text-lg font-poppins font-semibold mb-6">Legal & Compliance</h4>
            <ul className="space-y-3 mb-8">
              {legalLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/80 hover:text-accent transition-colors hover:translate-x-1 transform duration-200 inline-block"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Certifications */}
            <div className="space-y-3">
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm font-medium text-white mb-1">ISO/IEC 27001</div>
                <div className="text-xs text-white/70">Information Security</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3">
                <div className="text-sm font-medium text-white mb-1">GDPR Compliant</div>
                <div className="text-xs text-white/70">Data Protection</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              <p>© 2024 Maninfini Automation. All rights reserved.</p>
              <p className="mt-1">
                CIN: U72200KA2008PTC045123 | GST: 29ABCDE1234F1Z5
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-white/70 text-sm">Follow us:</span>
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all duration-200"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
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