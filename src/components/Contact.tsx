import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  MessageSquare,
  Send,
  CheckCircle,
  X,
  User,
  Shield,
  AlertTriangle
} from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { websiteActions, contactInfo as contactData, whatsappContacts } from '@/lib/utils';
import { validateContactForm, SecurityValidator } from '@/lib/security';

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

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showWhatsAppPopup, setShowWhatsAppPopup] = useState(false);
  const [csrfToken] = useState(() => SecurityValidator.csrf.generateToken());

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
    
    // Clear previous errors
    setFormErrors({});
    
    // Validate form data
    const validation = validateContactForm(formData);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      SecurityValidator.logSecurityEvent('form_validation_failed', { errors: validation.errors });
      return;
    }
    
    // Rate limiting check
    const clientId = typeof window !== 'undefined' ? window.location.hostname : 'unknown';
    if (!SecurityValidator.rateLimiter.checkLimit(`contact_form_${clientId}`, 3, 300000)) {
      setSubmitStatus('error');
      setFormErrors({ general: 'Too many submission attempts. Please try again in 5 minutes.' });
      SecurityValidator.logSecurityEvent('rate_limit_exceeded', { clientId });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Create structured WhatsApp message with all form details
      const whatsappMessage = `*New Contact Form Submission* 📋

*Contact Information:*
👤 *Name:* ${formData.firstName} ${formData.lastName}
📧 *Email:* ${formData.email}
📱 *Phone:* ${formData.phone || 'Not provided'}

*Service Interest:*
🎯 *Service:* ${formData.service}

*Project Details:*
📝 *Message:* ${formData.message || 'No additional details provided'}

*Consent:* ✅ User agreed to receive communications

---
*Submitted via:* Maninfini Website Contact Form
*Timestamp:* ${new Date().toLocaleString('en-IN', { 
  timeZone: 'Asia/Kolkata',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}`;

      // Sanitize message content before sending
      const sanitizedMessage = SecurityValidator.sanitizeHtml(whatsappMessage);
      
      // Send to WhatsApp
      websiteActions.openWhatsApp(contactData.salesPhone, sanitizedMessage);
      
      // Log successful submission
      SecurityValidator.logSecurityEvent('contact_form_submitted', {
        service: formData.service,
        hasPhone: !!formData.phone
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
      console.error('Error sending to WhatsApp:', error);
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
          { label: 'Support: +91 83105 16955', number: contactData.supportPhone },
          { label: 'Sales: +91 83105 16955', number: contactData.salesPhone }
        ];
        
        const choice = confirm(`Choose a number to call:\n1. ${phoneNumbers[0].label}\n2. ${phoneNumbers[1].label}\n\nClick OK for Support, Cancel for Sales`);
        
        if (choice) {
          websiteActions.callPhone(phoneNumbers[0].number);
        } else {
          websiteActions.callPhone(phoneNumbers[1].number);
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
      details: [contactData.salesPhone],
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
    <section id="contact" className="py-12 sm:py-16 lg:py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-accent/10 text-accent rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">Get In Touch</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-poppins font-bold text-foreground mb-4 sm:mb-6">
            Let's Start Your Project
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            Ready to transform your business? Get in touch with our experts for a free consultation 
            and discover how we can help you achieve your goals.
          </p>
        </div>

        {/* Contact Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {contactInfo.map((info, index) => (
            <div 
              key={index} 
              className="card-elegant p-4 sm:p-6 text-center group cursor-pointer animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-glow group-hover:scale-110 transition-transform">
                <info.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
              
              <h3 className="text-base sm:text-lg font-poppins font-semibold text-foreground mb-3 sm:mb-4">
                {info.title}
              </h3>
              
              <div className="space-y-1 sm:space-y-2 mb-4 sm:mb-6">
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex} className="text-xs sm:text-sm text-muted-foreground">
                    {detail}
                  </p>
                ))}
              </div>
              
              <Button 
                variant="ghost" 
                className="text-primary hover:text-foreground text-xs sm:text-sm"
                onClick={() => handleContactAction(info.action)}
              >
                {info.action}
              </Button>
            </div>
          ))}
        </div>

        {/* Contact Form & Map */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Contact Form */}
          <div className="animate-fade-in-up">
            <div className="card-elegant p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-poppins font-semibold text-foreground mb-4 sm:mb-6">
                Send Us a Message
              </h3>
              
              {/* Success/Error Messages */}
              {submitStatus === 'success' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <p className="text-green-800 font-medium text-sm sm:text-base">
                      Thank you! Your message has been sent to WhatsApp. Our team will respond within 24 hours.
                    </p>
                  </div>
                </div>
              )}
              
              {submitStatus === 'error' && (
                <div className="mb-4 sm:mb-6 p-3 sm:p-4 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-red-800 text-sm sm:text-base">
                    Sorry, there was an error sending your message. Please try again or contact us directly.
                  </p>
                </div>
              )}
              
              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                      First Name *
                    </label>
                    <Input 
                      placeholder="Your first name"
                      className="w-full text-sm sm:text-base"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                      Last Name *
                    </label>
                    <Input 
                      placeholder="Your last name"
                      className="w-full text-sm sm:text-base"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Email Address *
                  </label>
                  <Input 
                    type="email" 
                    placeholder="your.email@company.com"
                    className="w-full text-sm sm:text-base"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Phone Number
                  </label>
                  <Input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full text-sm sm:text-base"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                  />
                </div>
                
                <div>
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Service Interest *
                  </label>
                  <Select value={formData.service} onValueChange={(value) => handleInputChange('service', value)}>
                    <SelectTrigger className="text-sm sm:text-base">
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
                  <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">
                    Project Details
                  </label>
                  <Textarea 
                    placeholder="Tell us about your project requirements, timeline, and any specific needs..."
                    rows={4}
                    className="w-full text-sm sm:text-base"
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
                  <label htmlFor="consent" className="text-xs sm:text-sm text-muted-foreground">
                    I agree to receive communications from Maninfini Automation and understand 
                    that I can unsubscribe at any time. View our{' '}
                    <a href="#" className="text-primary hover:text-foreground">Privacy Policy</a>.
                  </label>
                </div>
                
                <Button 
                  type="submit" 
                  size="lg" 
                  className="btn-gradient w-full text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending to WhatsApp...' : 'Send to WhatsApp'}
                  <Send className="ml-2 w-4 h-4 sm:w-5 sm:h-5" />
                </Button>
              </form>
            </div>
          </div>

          {/* Map & Quick Actions */}
          <div className="space-y-6 sm:space-y-8 animate-slide-in-right">
            {/* Interactive Google Map */}
            <div className="card-elegant p-0 overflow-hidden h-64 sm:h-96 relative">
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
              <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 bg-white/90 backdrop-blur-sm px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg">
                <div className="flex items-center gap-1 sm:gap-2">
                  <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary" />
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-foreground">Our Bengaluru Office</p>
                    <p className="text-xs text-muted-foreground">12.97002° N, 77.58429° E</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="card-elegant p-6 sm:p-8">
              <h4 className="text-lg sm:text-xl font-poppins font-semibold text-foreground mb-4 sm:mb-6">
                Quick Actions
              </h4>
              
              <div className="space-y-3 sm:space-y-4">
                <Button 
                  className="btn-gradient w-full justify-start text-sm sm:text-base"
                  onClick={() => setShowWhatsAppPopup(true)}
                >
                  <MessageSquare className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                  Chat on WhatsApp
                </Button>
                
                <Button 
                  variant="outline" 
                  className="btn-outline-elegant w-full justify-start text-sm sm:text-base"
                  onClick={() => handleContactAction('Schedule Call')}
                >
                  <Phone className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                  Schedule a Call
                </Button>
                
                <Button 
                  variant="outline" 
                  className="btn-outline-elegant w-full justify-start text-sm sm:text-base"
                  onClick={() => websiteActions.sendEmail(
                    contactData.email,
                    'Inquiry about Automation Services',
                    'Hello,\n\nI would like to know more about your automation services.\n\nPlease provide information about:\n- Available services\n- Pricing\n- Implementation timeline\n- Case studies\n\nThank you!'
                  )}
                >
                  <Mail className="mr-2 sm:mr-3 w-4 h-4 sm:w-5 sm:h-5" />
                  Email Us Directly
                </Button>
              </div>
              
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 sm:gap-3">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                  <div>
                    <h5 className="font-semibold text-green-800 text-sm sm:text-base">Free Consultation</h5>
                    <p className="text-xs sm:text-sm text-green-700">
                      Get expert advice within 24 hours
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12 sm:mt-16 animate-fade-in-up">
          <div className="card-elegant p-8 sm:p-12 bg-gradient-to-r from-primary to-accent text-white">
            <h3 className="text-2xl sm:text-3xl font-poppins font-semibold mb-3 sm:mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-base sm:text-lg lg:text-xl mb-6 sm:mb-8 opacity-90">
              Join 200+ businesses who trust Maninfini for their automation needs
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
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
                className="border-white text-white hover:bg-white hover:text-primary text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4"
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
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl max-w-md w-full animate-fade-in-up">
            {/* Header */}
            <div className="bg-green-500 text-white p-4 sm:p-6 rounded-t-xl sm:rounded-t-2xl relative">
              <button
                onClick={() => setShowWhatsAppPopup(false)}
                className="absolute top-2 sm:top-4 right-2 sm:right-4 text-white hover:text-gray-200 transition-colors"
                aria-label="Close WhatsApp popup"
                title="Close"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
              <div className="flex items-center gap-2 sm:gap-3">
                <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8" />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold">Chat on WhatsApp</h3>
                  <p className="text-green-100 text-xs sm:text-sm">Choose who you'd like to chat with</p>
                </div>
              </div>
            </div>

            {/* Contact List */}
            <div className="p-4 sm:p-6 space-y-2 sm:space-y-3">
              {whatsappContacts.map((contact, index) => (
                <div
                  key={index}
                  onClick={() => handleWhatsAppContact(contact)}
                  className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl border border-gray-200 hover:border-green-300 hover:bg-green-50 cursor-pointer transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{contact.name}</h4>
                    <p className="text-xs sm:text-sm text-gray-600">{contact.role}</p>
                    <p className="text-xs sm:text-sm text-green-600 font-medium">{contact.number}</p>
                  </div>
                  <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="px-4 sm:px-6 pb-4 sm:pb-6">
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