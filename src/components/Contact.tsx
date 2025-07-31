import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle,
  X,
  User
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { websiteActions, contactInfo as contactData, whatsappContacts } from '@/lib/utils';

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    consent: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);

  const handleWhatsAppContact = (contact: typeof whatsappContacts[0]) => {
    const message = 'Hello, I would like to know more about your automation services.';
    websiteActions.openWhatsApp(contact.phone, message);
    setShowWhatsAppPopup(false);
  };

  // Google Forms URL - Replace with your actual Google Form URL
  const GOOGLE_FORM_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/formResponse";
  
  // Form field mapping - Replace with your actual Google Form field names
  const FORM_FIELDS = {
    firstName: "entry.123456789", // Replace with actual field name from Google Form
    lastName: "entry.987654321",  // Replace with actual field name from Google Form
    email: "entry.555666777",     // Replace with actual field name from Google Form
    phone: "entry.888999000",     // Replace with actual field name from Google Form
    service: "entry.111222333",   // Replace with actual field name from Google Form
    message: "entry.444555666"    // Replace with actual field name from Google Form
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.service || !formData.consent) {
      alert('Please fill in all required fields and accept the consent.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create form data for Google Forms
      const googleFormData = new FormData();
      googleFormData.append(FORM_FIELDS.firstName, formData.firstName);
      googleFormData.append(FORM_FIELDS.lastName, formData.lastName);
      googleFormData.append(FORM_FIELDS.email, formData.email);
      googleFormData.append(FORM_FIELDS.phone, formData.phone);
      googleFormData.append(FORM_FIELDS.service, formData.service);
      googleFormData.append(FORM_FIELDS.message, formData.message);

      // Submit to Google Forms
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        body: googleFormData,
        mode: 'no-cors' // Important for Google Forms
      });

      // Reset form and show success message
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        consent: false
      });
      setSubmitStatus('success');
      
      // Hide success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setTimeout(() => setSubmitStatus('idle'), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactAction = (actionType: string) => {
    switch (actionType) {
      case 'Get Directions':
        websiteActions.getDirections(contactData.address, contactData.coordinates);
        break;
      case 'Call Now': {
        // Show options for multiple phone numbers
        const phoneNumbers = [
          { label: 'Main Office: +91 80 4112 5555', number: contactData.mainPhone },
          { label: 'Support: +91 98450 12345', number: contactData.supportPhone },
          { label: 'Sales: +91 80056 34678', number: contactData.salesPhone }
        ];
        
        const choice = confirm(`Choose a number to call:\n1. ${phoneNumbers[0].label}\n2. ${phoneNumbers[1].label}\n3. ${phoneNumbers[2].label}\n\nClick OK for Main Office, Cancel to see other options`);
        
        if (choice) {
          websiteActions.callPhone(phoneNumbers[0].number);
        } else {
          const secondChoice = confirm(`Choose:\n1. ${phoneNumbers[1].label}\n2. ${phoneNumbers[2].label}\n\nClick OK for Support, Cancel for Sales`);
          if (secondChoice) {
            websiteActions.callPhone(phoneNumbers[1].number);
          } else {
            websiteActions.callPhone(phoneNumbers[2].number);
          }
        }
        break;
      }
      case 'Send Email':
        websiteActions.sendEmail(contactData.email);
        break;
      case 'Schedule Call':
        websiteActions.openWhatsApp(
          contactData.salesPhone,
          'Hello! I would like to schedule a call. Please provide available time slots and call details.'
        );
        break;
      default:
        break;
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Visit Our Office',
      details: [contactData.address, '12.97002° N, 77.58429° E'],
      action: 'Get Directions'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: [contactData.mainPhone, contactData.supportPhone, contactData.salesPhone],
      action: 'Call Now'
    },
    {
      icon: Mail,
      title: 'Email Us',
      details: [contactData.email, contactData.supportEmail],
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
              
              <Button 
                variant="ghost" 
                className="text-primary hover:text-accent"
                onClick={() => handleContactAction(info.action)}
              >
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
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800 font-medium">
                      Thank you! Your message has been sent successfully. We'll get back to you soon.
                    </p>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800">
                    Sorry, there was an error sending your message. Please try again or contact us directly.
                  </p>
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input 
                      placeholder="Your first name"
                      className="w-full"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input 
                      placeholder="Your last name"
                      className="w-full"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
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
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
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
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Service Interest *
                  </label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
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
                    value={formData.message}
                    onChange={(e) => handleInputChange('message', e.target.value)}
                  />
                </div>
                
                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="consent" 
                    className="mt-1"
                    checked={formData.consent}
                    onChange={(e) => handleInputChange('consent', e.target.checked)}
                    required
                  />
                  <label htmlFor="consent" className="text-sm text-muted-foreground">
                    I agree to receive communications from Maninfini Automation and understand 
                    that I can unsubscribe at any time. View our{' '}
                    <a href="#" className="text-primary hover:text-accent">Privacy Policy</a>.
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="btn-gradient w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                  <Send className="ml-2 w-5 h-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Map & Quick Actions */}
          <div className="space-y-8 animate-slide-in-right">
            {/* Interactive Google Map */}
            <div className="card-elegant p-0 overflow-hidden h-96 relative">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8267!2d77.58429!3d12.97002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTLCsDU4JzEyLjAiTiA3N8KwMzUnMDQuMCJF!5e0!3m2!1sen!2sin!4v1642345678901!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maninfini Automation Office Location"
              ></iframe>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Our Bengaluru Office</p>
                    <p className="text-xs text-muted-foreground">12.97002° N, 77.58429° E</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-elegant p-8">
              <h4 className="text-xl font-poppins font-semibold text-foreground mb-6">
                Quick Actions
              </h4>
              
              <div className="space-y-4">
                <Button 
                  className="btn-gradient w-full justify-start"
                  onClick={() => setShowWhatsAppPopup(true)}
                >
                  <MessageSquare className="mr-3 w-5 h-5" />
                  Chat on WhatsApp
                </Button>
                
                <Button 
                  variant="outline" 
                  className="btn-outline-elegant w-full justify-start"
                  onClick={() => handleContactAction('Schedule Call')}
                >
                  <Phone className="mr-3 w-5 h-5" />
                  Schedule a Call
                </Button>
                
                <Button 
                  variant="outline" 
                  className="btn-outline-elegant w-full justify-start"
                  onClick={() => websiteActions.sendEmail(
                    contactData.email,
                    'Inquiry about Automation Services',
                    'Hello,\n\nI would like to know more about your automation services.\n\nPlease provide information about:\n- Available services\n- Pricing\n- Implementation timeline\n- Case studies\n\nThank you!'
                  )}
                >
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
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100"
                onClick={() => websiteActions.openWhatsApp(
                  contactData.salesPhone,
                  'Hello! I would like to book a free consultation. Please provide available time slots and consultation details.'
                )}
              >
                Book Free Consultation
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white hover:text-primary"
                onClick={() => websiteActions.sendEmail(
                  contactData.email,
                  'Brochure Request',
                  'Hello,\n\nI would like to download your company brochure.\n\nPlease provide:\n- Company brochure\n- Service catalogs\n- Case studies\n- Pricing information\n\nThank you!'
                )}
              >
                Download Brochure
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* WhatsApp Contact Popup */}
      {showWhatsAppPopup && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
            {/* Header */}
            <div className="bg-green-500 text-white p-6 rounded-t-2xl relative">
              <button
                onClick={() => setShowWhatsAppPopup(false)}
                className="absolute top-4 right-4 text-white hover:text-gray-200 transition-colors"
                aria-label="Close WhatsApp popup"
                title="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-3">
                <MessageSquare className="w-8 h-8" />
                <div>
                  <h3 className="text-xl font-semibold">Chat on WhatsApp</h3>
                  <p className="text-green-100 text-sm">Choose who you'd like to chat with</p>
                </div>
              </div>
            </div>

            {/* Contact List */}
            <div className="p-6 space-y-3">
              {whatsappContacts.map((contact, index) => (
                <div
                  key={index}
                  onClick={() => handleWhatsAppContact(contact)}
                  className="flex items-center gap-4 p-4 rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{contact.name}</h4>
                    <p className="text-sm text-gray-600">{contact.role}</p>
                    <p className="text-sm text-green-600 font-medium">{contact.number}</p>
                  </div>
                  <MessageSquare className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-6 pb-6">
              <p className="text-xs text-gray-500 text-center">
                You'll be redirected to WhatsApp to start the conversation
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;