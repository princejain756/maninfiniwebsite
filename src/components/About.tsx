import { 
  Award, 
  Users, 
  Calendar, 
  MapPin, 
  Linkedin,
  Target,
  TrendingUp,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import teamImage from '@/assets/team-collaboration.jpg';
import miteshImage from '@/assets/Mitesh CEO.jpg';
import princeImage from '@/assets/Prince Jain AIO CTO.png';
import neeravImage from '@/assets/Neerav Deepak Jain COO.jpg';
import dipakImage from '@/assets/Deepak Jain Mentor.jpg';
import rambhupalImage from '@/assets/Rambhupal M CFO Qualified CA with 25 years of experience.jpg';
import vishakhaImage from '@/assets/Vishakha Sisodhiya Cybersecurity.jpg';

const About = () => {
  const companyStats = [
    { number: '2008', label: 'Founded', description: 'Started our journey in automation' },
    { number: '500+', label: 'Projects', description: 'Successfully delivered worldwide' },
    { number: '50+', label: 'Team Size', description: 'Expert developers and consultants' },
    { number: '16+', label: 'Years', description: 'Combined leadership experience' }
  ];

  const leadership = [
    {
      name: 'Mitesh Narendra Jain',
      role: 'CEO',
      experience: '16+ years',
      background: 'Ex-Ola Cabs, Full-stack Architecture Expert',
      image: miteshImage,
      linkedin: 'https://www.linkedin.com/in/miteshj'
    },
    {
      name: 'Prince Jain',
      role: 'AIO and CTO',
      experience: '5+ years',
      background: 'AI Operations & Technology Leadership',
      image: princeImage,
      linkedin: 'https://www.linkedin.com/in/prince-jain-267519194/'
    },
    {
      name: 'Neerav Deepak Jain',
      role: 'COO',
      experience: '3+ years',
      background: 'Business Operations & Strategy',
      image: neeravImage,
      linkedin: '#'
    },
    {
      name: 'Dipak Jain',
      role: 'Mentor',
      experience: '20+ years',
      background: 'Strategic Business Guidance & Industry Expertise',
      image: dipakImage,
      linkedin: '#'
    },
    {
      name: 'Vishakha Sisodiya',
      role: 'Cybersecurity & Cloud Expert',
      experience: '4+ years',
      background: 'Cybersecurity and Cloud Infrastructure Specialist',
      image: vishakhaImage,
      linkedin: 'https://www.linkedin.com/in/vishakhasisodiya96/'
    },
    {
      name: 'Rambhupal M',
      role: 'CFO',
      experience: '25+ years',
      background: 'Qualified CA with extensive Financial Management experience',
      image: rambhupalImage,
      linkedin: '#'
    }
  ];

  const values = [
    {
      icon: Target,
      title: 'Mission-Driven',
      description: 'To democratize business automation and make advanced technology accessible to all businesses'
    },
    {
      icon: TrendingUp,
      title: 'Innovation First',
      description: 'Continuously exploring new technologies and methodologies to deliver cutting-edge solutions'
    },
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Building long-term partnerships through transparent communication and secure development practices'
    }
  ];

  const companyInfo = [
    { label: 'Incorporation Date', value: 'March 15, 2008' },
    { label: 'Authorised Capital', value: '₹10,00,000' },
    { label: 'CIN', value: 'U72900KA2022PTC165226' },
    { label: 'GST Number', value: '29AAQCM1170Q1ZO' },
    { label: 'Headquarters', value: '#20, Ground Floor, 12th Cross, Cubbonpet, Banappa Park Road, Bengaluru - 560002' }
  ];

  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20 bg-gradient-surface">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-16 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-4 sm:mb-6">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="font-medium text-sm sm:text-base">About Maninfini</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-poppins font-bold text-foreground mb-4 sm:mb-6">
            16 Years of Technical Excellence
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
            From a small startup to a trusted automation partner, we've been transforming 
            businesses with innovative technology solutions since 2008.
          </p>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {companyStats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-number mb-2">{stat.number}</div>
              <h4 className="text-base sm:text-lg font-poppins font-semibold text-foreground mb-2">
                {stat.label}
              </h4>
              <p className="text-xs sm:text-sm text-muted-foreground">{stat.description}</p>
            </div>
          ))}
        </div>

        {/* Company Story */}
        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
          <div className="animate-fade-in-up">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-semibold text-foreground mb-4 sm:mb-6">
              Our Story
            </h3>
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed">
              <p>
                Founded in 2008, Maninfini Automation started with a simple mission: 
                to make enterprise-grade automation accessible to businesses of all sizes. 
                What began as a small team of passionate developers has grown into a 
                comprehensive technology partner.
              </p>
              <p>
                Our founder, Mitesh Jain, brings 16+ years of experience from leading 
                companies like Ola Cabs, where he architected scalable solutions for 
                millions of users. This expertise now powers our client solutions.
              </p>
              <p>
                Today, we serve clients from SMBs to enterprises, delivering everything 
                from custom web applications to complex automation systems. Our agile 
                approach and deep technical expertise ensure every project exceeds expectations.
              </p>
            </div>
            
            <div className="mt-6 sm:mt-8">
              <Button size="lg" className="btn-gradient text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                Join Our Journey
              </Button>
            </div>
          </div>
          
          <div className="animate-slide-in-right">
            <img 
              src={teamImage} 
              alt="Maninfini Team" 
              className="w-full h-auto rounded-xl sm:rounded-2xl shadow-elegant hover:shadow-glow transition-all duration-500"
            />
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-semibold text-foreground mb-3 sm:mb-4">
              Leadership Team
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              Experienced leaders driving innovation and growth
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {leadership.map((leader, index) => (
              <div 
                key={index} 
                className="card-elegant p-6 sm:p-8 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`mx-auto mb-4 sm:mb-6 overflow-hidden shadow-elegant ${
                  leader.name === 'Rambhupal M' 
                    ? 'w-24 h-32 sm:w-32 sm:h-40 rounded-lg' 
                    : 'w-24 h-24 sm:w-32 sm:h-32 rounded-full'
                }`}>
                  <img 
                    src={leader.image} 
                    alt={leader.name}
                    className={`w-full h-full ${
                      leader.name === 'Rambhupal M' 
                        ? 'object-contain' 
                        : 'object-cover'
                    }`}
                  />
                </div>
                
                <h4 className="text-lg sm:text-xl font-poppins font-semibold text-foreground mb-2">
                  {leader.name}
                </h4>
                
                <p className="text-accent font-medium mb-2 text-sm sm:text-base">{leader.role}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">{leader.experience}</p>
                <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">{leader.background}</p>
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-primary hover:text-foreground text-xs sm:text-sm"
                  onClick={() => window.open(leader.linkedin, '_blank', 'noopener,noreferrer')}
                >
                  <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                  Connect
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-16 sm:mb-20">
          <div className="text-center mb-8 sm:mb-12 animate-fade-in-up">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-poppins font-semibold text-foreground mb-3 sm:mb-4">
              Our Values & Culture
            </h3>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-glow">
                  <value.icon className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                
                <h4 className="text-lg sm:text-xl font-poppins font-semibold text-foreground mb-3 sm:mb-4">
                  {value.title}
                </h4>
                
                <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Company Information */}
        <div className="card-elegant p-6 sm:p-8 lg:p-12 animate-fade-in-up">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div>
              <h3 className="text-xl sm:text-2xl font-poppins font-semibold text-foreground mb-4 sm:mb-6">
                Company Information
              </h3>
              <div className="space-y-3 sm:space-y-4">
                {companyInfo.map((info, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:justify-between py-3 border-b border-border last:border-b-0">
                    <span className="text-xs sm:text-sm text-muted-foreground font-medium mb-1 sm:mb-0">{info.label}:</span>
                    <span className="text-xs sm:text-sm text-foreground">{info.value}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-start gap-3 mb-4 sm:mb-6">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Bengaluru Office</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    #20, Ground Floor, 12th Cross, Cubbonpet, Banappa Park Road, Bengaluru - 560002
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 mb-6 sm:mb-8">
                <Award className="w-5 h-5 sm:w-6 sm:h-6 text-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-foreground text-sm sm:text-base">Certifications</h4>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    ISO/IEC 27001 Compliant • GDPR Ready
                  </p>
                </div>
              </div>
              
              <Button size="lg" className="btn-outline-elegant text-sm sm:text-base px-6 sm:px-8 py-3 sm:py-4">
                View Certificates
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;