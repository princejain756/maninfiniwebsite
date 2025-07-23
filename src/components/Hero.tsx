import { ArrowRight, Play, CheckCircle, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import heroImage from '@/assets/hero-automation-dashboard.jpg';

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

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient opacity-90"></div>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary-glow/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-vibrant-orange/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            {/* Hero Badge */}
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
              <Star className="w-5 h-5 text-accent" />
              <span className="text-sm font-medium">Trusted Automation Partner Since 2008</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-4 animate-fade-in-up">
              <h1 className="text-5xl lg:text-7xl font-poppins font-bold leading-tight">
                End-to-End
                <span className="text-gradient block">Digital & Automation</span>
                Solutions
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 font-inter leading-relaxed">
                Transform your business with cutting-edge automation, custom development, 
                and intelligent systems. From WhatsApp bots to enterprise ERP - we deliver it all.
              </p>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-2 gap-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {trustIndicators.map((indicator, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-white/90 text-sm font-medium">{indicator}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button size="lg" className="btn-gradient group text-lg px-8 py-6">
                Book Free Consultation
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary backdrop-blur-sm px-8 py-6 text-lg"
              >
                <Play className="mr-2 w-5 h-5" />
                Watch Demo
              </Button>
            </div>

            {/* Achievement Stats */}
            <div className="grid grid-cols-4 gap-6 pt-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
              {achievements.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="stat-number">{stat.number}</div>
                  <div className="text-white/80 text-sm font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative animate-slide-in-right">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Automation Dashboard" 
                className="w-full h-auto rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500"
              />
              
              {/* Floating Cards */}
              <div className="absolute -top-6 -left-6 bg-white rounded-xl p-4 shadow-elegant animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">System Online</span>
                </div>
              </div>
              
              <div className="absolute -bottom-6 -right-6 bg-accent rounded-xl p-4 shadow-glow animate-float" style={{ animationDelay: '2s' }}>
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">99.9%</div>
                  <div className="text-sm opacity-90">Uptime</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;