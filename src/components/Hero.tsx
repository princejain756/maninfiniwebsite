import { ArrowRight, Play, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InteractiveDashboard from '@/components/ui/interactive-dashboard';
import { websiteActions, contactInfo } from '@/lib/utils';

const Hero = () => {
  const achievements = [
    { number: '16+', label: 'Years Experience' },
    { number: '500+', label: 'Projects Delivered' },
    { number: '99%', label: 'Client Satisfaction' },
    { number: '24/7', label: 'Support Available' },
  ];

  const trustIndicators = [
    'Trusted by 200+ Businesses',
    'ISO/IEC 27001 Compliant',
    'Ex-Ola Cabs Leadership',
    'Agile Development Process'
  ];

  const handleBookConsultation = () => {
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I would like to book a free consultation about your automation services. Please provide available time slots and details about the consultation process.'
    );
  };

  const handleWatchDemo = () => {
    // Open WhatsApp to request demo video
    websiteActions.openWhatsApp(
      contactInfo.salesPhone,
      'Hello! I would like to watch a demo of your automation services. Please share the demo video or schedule a live demo session.'
    );
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden pt-20 sm:pt-24 md:pt-28 lg:pt-32">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-vibrant-orange/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start lg:items-start">
          {/* Left Content */}
          <div className="text-white space-y-6 sm:space-y-8">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 sm:px-6 py-2 sm:py-3 border border-white/20">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-accent" />
              <span className="text-xs sm:text-sm font-medium">Trusted Automation Partner Since 2008</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-poppins font-bold leading-tight">
                End-to-End
                <span className="text-gradient block">Digital & Automation</span>
                Solutions
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 font-inter leading-relaxed">
                Transform your business with cutting-edge automation, custom development, 
                and intelligent systems. From WhatsApp bots to enterprise ERP - we deliver it all.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-accent flex-shrink-0" />
                  <span className="text-white/90 text-xs sm:text-sm font-medium">{indicator}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button 
                size="lg" 
                className="btn-gradient group text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6"
                onClick={handleBookConsultation}
              >
                Book Free Consultation
                <ArrowRight className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg"
                onClick={handleWatchDemo}
              >
                <Play className="mr-2 w-4 h-4 sm:w-5 sm:h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 pt-6 sm:pt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {achievements.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="stat-number text-2xl sm:text-3xl lg:text-4xl">{stat.number}</div>
                  <div className="text-white/80 text-xs sm:text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Interactive Dashboard */}
          <div className="relative animate-slide-in-right mt-8 lg:mt-0">
            <InteractiveDashboard />
          </div>
        </div>
      </div>


    </section>
  );
};

export default Hero;