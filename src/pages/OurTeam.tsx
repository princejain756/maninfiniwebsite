import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  Award, 
  Users, 
  Target,
  Lightbulb,
  Shield,
  Zap
} from "lucide-react";

const teamMembers = [
  {
    name: "Prince Jain",
    role: "AI Officer & CTO",
    image: "/Prince Jain AIO CTO.png",
    bio: "Visionary leader driving AI innovation and technical excellence across all projects.",
    expertise: ["AI Strategy", "Technical Leadership", "Innovation"],
    linkedin: "#",
    email: "prince@maninfini.com"
  },
  {
    name: "Deepak Jain",
    role: "CEO",
    image: "/Deepak Jain Mentor.jpg",
    bio: "Strategic Business Guidance & Industry Expertise.",
    expertise: ["Strategic Guidance", "Industry Expertise", "Leadership"],
    linkedin: "#",
    email: "deepak@maninfini.com"
  },
  {
    name: "Neerav Deepak Jain",
    role: "COO",
    image: "/Neerav Deepak Jain COO.jpg",
    bio: "Operations expert ensuring smooth execution and client satisfaction.",
    expertise: ["Operations", "Client Relations", "Process Optimization"],
    linkedin: "#",
    email: "neerav@maninfini.com"
  },
  {
    name: "Rambhupal M",
    role: "CFO",
    image: "/Rambhupal M CFO Qualified CA with 25 years of experience.jpg",
    bio: "Financial strategist with 25+ years of experience in financial management.",
    expertise: ["Financial Strategy", "Risk Management", "Compliance"],
    linkedin: "#",
    email: "rambhupal@maninfini.com"
  },
  {
    name: "Vishakha Sisodhiya",
    role: "Cybersecurity Expert",
    image: "/Vishakha Sisodhiya Cybersecurity.jpg",
    bio: "Cybersecurity specialist protecting digital assets and ensuring compliance.",
    expertise: ["Cybersecurity", "Risk Assessment", "Compliance"],
    linkedin: "#",
    email: "vishakha@maninfini.com"
  },
  
  {
    name: "Jaswant",
    role: "CA",
    image: "/JaswantCA.jpg",
    bio: "Chartered Accountant ensuring financial accuracy and compliance.",
    expertise: ["Accounting", "Taxation", "Audit"],
    linkedin: "#",
    email: "jaswant@maninfini.com"
  },
  {
    name: "Ashish Dugar",
    role: "Technical Lead",
    image: "/ashishdugar.png",
    bio: "Technical expert leading development teams and ensuring code quality.",
    expertise: ["Full-Stack Development", "Team Leadership", "Code Quality"],
    linkedin: "#",
    email: "ashish@maninfini.com"
  },
  {
    name: "Pawan Kumar",
    role: "Senior Developer",
    image: "/pawankumar.png",
    bio: "Experienced developer specializing in modern web technologies.",
    expertise: ["React", "Node.js", "Database Design"],
    linkedin: "#",
    email: "pawan@maninfini.com"
  },
  {
    name: "Pradeep Kumar",
    role: "Senior Developer",
    image: "/pradeepkumar.png",
    bio: "Skilled developer with expertise in scalable applications.",
    expertise: ["Python", "Django", "API Development"],
    linkedin: "#",
    email: "pradeep@maninfini.com"
  },
  {
    name: "Prateek Oswal",
    role: "UI/UX Designer",
    image: "/prateekoswal.png",
    bio: "Creative designer crafting intuitive and engaging user experiences.",
    expertise: ["UI/UX Design", "Prototyping", "User Research"],
    linkedin: "#",
    email: "prateek@maninfini.com"
  },
  {
    name: "Praveen Ganna",
    role: "DevOps Engineer",
    image: "/praveenganna.png",
    bio: "DevOps specialist ensuring smooth deployments and infrastructure management.",
    expertise: ["DevOps", "Cloud Infrastructure", "CI/CD"],
    linkedin: "#",
    email: "praveen@maninfini.com"
  },
  {
    name: "Kamna Jain",
    role: "Project Manager",
    image: "/kamnajain.png",
    bio: "Project management expert ensuring timely delivery and client satisfaction.",
    expertise: ["Project Management", "Agile", "Client Relations"],
    linkedin: "#",
    email: "kamna@maninfini.com"
  },
  {
    name: "Mamta Bee Honey",
    role: "Quality Assurance",
    image: "/mambeehoney.png",
    bio: "QA specialist ensuring high-quality deliverables and testing excellence.",
    expertise: ["Quality Assurance", "Testing", "Process Improvement"],
    linkedin: "#",
    email: "mamta@maninfini.com"
  },
  {
    name: "Manoj Didwania",
    role: "Business Analyst",
    image: "/manojdidwania.png",
    bio: "Business analyst translating requirements into technical solutions.",
    expertise: ["Business Analysis", "Requirements Gathering", "Process Design"],
    linkedin: "#",
    email: "manoj@maninfini.com"
  },
  {
    name: "Nikith Surana",
    role: "Marketing Specialist",
    image: "/nikithsurana.png",
    bio: "Marketing expert driving brand awareness and lead generation.",
    expertise: ["Digital Marketing", "Brand Strategy", "Lead Generation"],
    linkedin: "#",
    email: "nikith@maninfini.com"
  }
];

const coreValues = [
  {
    icon: <Target className="w-8 h-8 text-blue-600" />,
    title: "Excellence",
    description: "We strive for excellence in every project, delivering solutions that exceed expectations."
  },
  {
    icon: <Users className="w-8 h-8 text-green-600" />,
    title: "Collaboration",
    description: "We believe in the power of teamwork and collaborative problem-solving."
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-yellow-600" />,
    title: "Innovation",
    description: "We embrace innovation and cutting-edge technologies to solve complex challenges."
  },
  {
    icon: <Shield className="w-8 h-8 text-purple-600" />,
    title: "Integrity",
    description: "We maintain the highest standards of integrity and transparency in all our interactions."
  },
  {
    icon: <Zap className="w-8 h-8 text-orange-600" />,
    title: "Agility",
    description: "We adapt quickly to changing requirements and market conditions."
  }
];

const OurTeam = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Our Team - Maninfini Automation</title>
        <meta 
          name="description" 
          content="Meet the talented team behind Maninfini Automation. Our diverse group of experts in AI, development, design, and business strategy work together to deliver exceptional solutions." 
        />
        <meta 
          name="keywords" 
          content="team, about us, leadership, developers, designers, AI experts, automation specialists, Maninfini team" 
        />
        <link rel="canonical" href="https://maninfini.com/our-team" />
      </Helmet>
      
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6 font-poppins">
              Meet Our Amazing Team
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              The passionate professionals behind Maninfini Automation, working together to transform businesses through innovative technology solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                <span>16+ Team Members</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                <span>50+ Years Combined Experience</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                <span>Global Remote Team</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
                Our Core Values
              </h2>
              <p className="text-xl text-gray-600">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8">
              {coreValues.map((value, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <CardContent className="p-0">
                    <div className="flex justify-center mb-4">
                      {value.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-gray-600">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
                Leadership Team
              </h2>
              <p className="text-xl text-gray-600">
                Our visionary leaders driving innovation and growth
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.slice(0, 4).map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Technical Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4 font-poppins">
                Technical Team
              </h2>
              <p className="text-xl text-gray-600">
                Our skilled developers, designers, and technical experts
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.slice(4).map((member, index) => (
                <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square relative">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-blue-600 font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {member.expertise.map((skill, skillIndex) => (
                        <Badge key={skillIndex} variant="secondary" className="text-xs">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" asChild>
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                          <Linkedin className="w-4 h-4" />
                        </a>
                      </Button>
                      <Button size="sm" variant="outline" asChild>
                        <a href={`mailto:${member.email}`}>
                          <Mail className="w-4 h-4" />
                        </a>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 font-poppins">
              Ready to Work with Our Team?
            </h2>
            <p className="text-xl text-blue-100 mb-8">
              Let's discuss how our talented team can help transform your business with innovative technology solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <a href="/contact">
                  Get in Touch
                </a>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600" asChild>
                <a href="/services">
                  View Our Services
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurTeam;
