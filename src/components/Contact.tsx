import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: ['Allalasandra, Bengaluru', 'Karnataka 560065, India'],
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: ['+91 80 4112 5555', '+91 98450 12345'],
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: ['hello@maninfini.com', 'support@maninfini.com'],
      action: 'Send Email'
    },
    {
      icon: Clock,
      title: 'Business Hours',
      details: ['Mon - Sat: 9:00 AM - 7:00 PM', 'Sunday: Emergency Support'],
      action: 'Schedule Call'
    }
  ];

  const services = [
    'Web & Custom Development',
    'E-commerce & Inventory',
    'WhatsApp & Communications',
    'Offshore Talent',
    'Virtual Office Services',
    'Other'
  ];

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-6 py-3 mb-6">
            <MessageSquare className="w-5 h-5" />
            <span className="font-medium">Get In Touch</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-poppins font-bold text-foreground mb-6">
            Let's Start Your Project
          </h2>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Ready to transform your business? Get in touch with our experts for a free consultation 
            and discover how we can help you achieve your goals.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <div 
              key={index} 
              className="card-elegant p-6 text-center group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow group-hover:scale-110 transition-transform">
                <info.icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-lg font-poppins font-semibold text-foreground mb-4">
                {info.title}
              </h3>
              
              <div className="space-y-2 mb-6">
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
              
              <Button variant="ghost" className="text-primary hover:text-accent">
                {info.action}
              </Button>
            </div>
          ))}
        </div>

        {/* Contact Form & Map */}
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-fade-in-up">
            <div className="card-elegant p-8">
              <h3 className="text-2xl font-poppins font-semibold text-foreground mb-6">
                Send Us a Message
              </h3>
              
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input 
                      placeholder="Your first name"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input 
                      placeholder="Your last name"
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your.email@company.com"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Service Interest *
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a service" />
                    </SelectTrigger>
                    <SelectContent>
                      {services.map((service, index) => (
                        <SelectItem key={index} value={service.toLowerCase().replace(/\s+/g, '-')}>
                          {service}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Project Details
                  </label>
                  <Textarea 
                    placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    rows={4}
                    className="w-full"
                  />
                </div>
                
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    className="mt-1"
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    I agree to receive communications from Maninfini Automation and understand 
                    that I can unsubscribe at any time. View our{' '}
                    <a href="#" className="text-primary hover:text-accent">Privacy Policy</a>.
                  </label>
                </div>
                
                <Button size="lg" className="btn-gradient w-full">
                  Send Message
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Map & Quick Actions */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Map Placeholder */}
            <div className="card-elegant p-8 h-64 bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                <h4 className="text-lg font-semibold text-foreground mb-2">
                  Our Bengaluru Office
                </h4>
                <p className="text-muted-foreground">
                  Interactive map coming soon
                </p>
                <Button variant="outline" className="mt-4">
                  Open in Google Maps
                </Button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-elegant p-8">
              <h4 className="text-xl font-poppins font-semibold text-foreground mb-6">
                Quick Actions
              </h4>
              
              <div className="space-y-4">
                <Button className="btn-gradient w-full justify-start">
                  <MessageSquare className="mr-3 w-5 h-5" />
                  Chat on WhatsApp
                </Button>
                
                <Button variant="outline" className="btn-outline-elegant w-full justify-start">
                  <Phone className="mr-3 w-5 h-5" />
                  Schedule a Call
                </Button>
                
                <Button variant="outline" className="btn-outline-elegant w-full justify-start">
                  <Mail className="mr-3 w-5 h-5" />
                  Email Us Directly
                </Button>
              </div>
              
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <h5 className="font-semibold text-green-800">Free Consultation</h5>
                    <p className="text-sm text-green-700">
                      Get expert advice within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up">
          <div className="card-elegant p-12 bg-gradient-to-r from-primary to-accent text-white">
            <h3 className="text-3xl font-poppins font-semibold mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Join 200+ businesses who trust Maninfini for their automation needs
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                Book Free Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;