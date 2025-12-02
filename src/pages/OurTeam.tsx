import { useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Linkedin, 
  Mail, 
  MapPin, 
  Users, 
  Target,
  Lightbulb,
  Shield,
  Zap,
  Sparkles,
  Calendar,
  Globe,
  Cpu,
  UserCheck,
  Clock
} from "lucide-react";
import NikithMittalImage from "@/assets/TeamMembers/NikithMittal.png";
import PrateekSharmaImage from "@/assets/TeamMembers/Prateeksharma.png";
import PraveenGannaImage from "@/assets/TeamMembers/praveenganna.png";
import RohanIyerImage from "@/assets/TeamMembers/Rohan Iyer.png";
import AanyaKhannaImage from "@/assets/AanyaKhanna.png";
import AnshumaliJainImage from "@/assets/AnshumaliJain.webp";

type TeamMember = {
  name: string;
  role: string;
  image: string;
  bio: string;
  expertise: string[];
  linkedin: string;
  email: string;
  segment: "leadership" | "technical";
};

const teamMembers: TeamMember[] = [
  {
    name: "Prince Jain",
    role: "AI Officer & CTO",
    image: "/PrinceJainNew.webp",
    bio: "Visionary leader driving AI innovation and technical excellence across all projects.",
    expertise: ["AI Strategy", "Technical Leadership", "Innovation"],
    linkedin: "#",
    email: "prince@maninfini.com",
    segment: "leadership"
  },
  {
    name: "Dipak Jain",
    role: "Mentor",
    image: "/PrateekSharma.png",
    bio: "Strategic Business Guidance & Industry Expertise.",
    expertise: ["Strategic Guidance", "Industry Expertise", "Leadership"],
    linkedin: "#",
    email: "prateek@maninfini.com",
    segment: "leadership"
  },
  {
    name: "Anshumali Jain",
    role: "Deep Tech Expert",
    image: AnshumaliJainImage,
    bio: "Brings advanced AI research and systems thinking to solve complex automation challenges.",
    expertise: ["Enterprise AI Research", "Technical Strategy", "System Architecture"],
    linkedin: "https://www.linkedin.com/in/anshumalijain?utm_source=share_via&utm_content=profile&utm_medium=member_ios",
    email: "anshumali@maninfini.com",
    segment: "leadership"
  },
  {
    name: "Neerav Dipak Jain",
    role: "COO",
    image: "/Neerav Dipak Jain COO.jpg",
    bio: "Operations expert ensuring smooth execution and client satisfaction.",
    expertise: ["Operations", "Client Relations", "Process Optimization"],
    linkedin: "#",
    email: "neerav@maninfini.com",
    segment: "leadership"
  },
  {
    name: "Rambhupal M",
    role: "CFO",
    image: "/Rambhupal M CFO Qualified CA with 25 years of experience.jpg",
    bio: "Financial strategist with 25+ years of experience in financial management.",
    expertise: ["Financial Strategy", "Risk Management", "Compliance"],
    linkedin: "#",
    email: "rambhupal@maninfini.com",
    segment: "leadership"
  },
  {
    name: "Vishakha Sisodhiya",
    role: "Chief Cyber Trust Officer",
    image: "/Vishakha Sisodhiya Cybersecurity.jpg",
    bio: "Security leader orchestrating cyber resilience across global programs.",
    expertise: ["Cybersecurity", "Cloud Security", "Risk"],
    linkedin: "#",
    email: "vishakha@maninfini.com",
    segment: "leadership"
  },
  {
    name: "Aanya Khanna",
    role: "Experience Design Lead",
    image: AanyaKhannaImage,
    bio: "Designs human-led journeys that merge service design with intelligent automation.",
    expertise: ["Experience Design", "Service Design", "Customer Insight"],
    linkedin: null,
    email: "aanya@maninfini.com",
    segment: "leadership"
  },
  {
    name: "Rohan Iyer",
    role: "Digital Transformation Lead",
    image: RohanIyerImage,
    bio: "Leads enterprise digital transformation initiatives and activates intelligent automation across industries.",
    expertise: ["Digital Strategy", "Transformation", "Innovation"],
    linkedin: null,
    email: "rohan@maninfini.com",
    segment: "leadership"
  },
  {
    name: "Praveen Ganna",
    role: "DevOps Engineering Lead",
    image: PraveenGannaImage,
    bio: "DevOps strategist building resilient cloud pipelines and observability frameworks.",
    expertise: ["DevOps", "Cloud Infrastructure", "CI/CD"],
    linkedin: "#",
    email: "praveen@maninfini.com",
    segment: "technical"
  },
  {
    name: "Nikith Mittal",
    role: "Growth Strategist",
    image: NikithMittalImage,
    bio: "Activates data-led GTM motions that amplify customer acquisition and retention.",
    expertise: ["Growth Marketing", "Revenue Ops", "Brand Strategy"],
    linkedin: "#",
    email: "nikith@maninfini.com",
    segment: "technical"
  },
  {
    name: "Dipak Jain",
    role: "Product Experience Lead",
    image: PrateekSharmaImage,
    bio: "Crafts immersive product experiences blending UX craft with intelligent insights.",
    expertise: ["Product Design", "Design Systems", "Prototyping"],
    linkedin: "#",
    email: "prateek@maninfini.com",
    segment: "technical"
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

type RosterMember = {
  id: string;
  name: string;
  role: string;
  department: string;
  focus: string;
  location: string;
  workModel: string;
  description: string;
  type: "Human" | "AI Agent";
  avatarGradient: string;
};

const gradientPalette = [
  "from-sky-500 via-cyan-400 to-blue-600",
  "from-indigo-500 via-purple-500 to-indigo-700",
  "from-emerald-500 via-teal-400 to-cyan-600",
  "from-rose-500 via-pink-500 to-fuchsia-600",
  "from-amber-500 via-orange-400 to-red-500",
  "from-blue-600 via-indigo-500 to-purple-600",
  "from-teal-500 via-emerald-400 to-lime-500",
  "from-slate-600 via-blue-500 to-slate-700"
];

const employeeFirstNames = [
  "Aarav",
  "Ishita",
  "Kabir",
  "Mira",
  "Vivaan",
  "Anaya",
  "Reyansh",
  "Zara",
  "Kiaan",
  "Diya",
  "Arjun",
  "Kiara",
  "Shaurya",
  "Naina",
  "Aria",
  "Dev",
  "Reva",
  "Nikhil",
  "Tara",
  "Vihaan"
];

const employeeLastNames = [
  "Singh",
  "Patel",
  "Mehta",
  "Verma",
  "Kapoor",
  "Sharma",
  "Chowdhury",
  "Rao",
  "Menon",
  "Desai"
];

const employeeRoles = [
  "Software Tester",
  "Full-Stack Engineer",
  "AI Product Manager",
  "Cloud Architect",
  "Automation Specialist",
  "UX Researcher",
  "Data Scientist",
  "Delivery Manager",
  "QA Lead",
  "Growth Marketer",
  "Solutions Consultant"
];

const employeeDepartments = [
  "Engineering Guild",
  "AI Delivery",
  "Product Design",
  "Automation Studio",
  "Customer Success",
  "Insights & Data",
  "Experience Lab",
  "Growth Office",
  "Cybersecurity",
  "Operations"
];

const employeeFocusAreas = [
  "Intelligent Platforms",
  "Customer Journeys",
  "Cloud Modernization",
  "Automation Excellence",
  "Predictive Analytics",
  "Experience Design",
  "Reliability Engineering",
  "AI Adoption",
  "Security & Trust",
  "Change Management"
];

const employeeLocations = [
  "Bengaluru, India",
  "Pune, India",
  "Hyderabad, India",
  "Mumbai, India",
  "Delhi NCR, India",
  "Singapore",
  "Dubai, UAE",
  "Berlin, Germany",
  "Toronto, Canada",
  "Austin, USA",
  "Sydney, Australia",
  "Cape Town, South Africa"
];

const employeeWorkModels = [
  "Hybrid",
  "Remote",
  "Remote (APAC)",
  "Remote (EMEA)",
  "On-site (Client)",
  "Flexi"
];

const employeeDescriptions = [
  "Aligns product vision with data-backed insights for 2025 rollouts.",
  "Architects resilient systems that scale with customer demand.",
  "Champions frictionless experiences across omnichannel touchpoints.",
  "Builds automation pipelines that unlock operational velocity.",
  "Partners with stakeholders to deliver measurable transformation.",
  "Ensures our releases stay fast, secure, and reliable.",
  "Creates intelligent handoffs between humans and AI agents.",
  "Advances experimentation to unlock sustainable growth.",
  "Designs service blueprints for enterprise clients.",
  "Elevates delivery excellence through agile mastery."
];

const aiCallSigns = [
  "Aurora",
  "Atlas",
  "Lyra",
  "Quanta",
  "Helios",
  "Satori",
  "Nimbus",
  "Vega",
  "Orion",
  "Pulse",
  "Zenith",
  "Neon",
  "Phoenix",
  "Lumen",
  "Halo"
];

const aiRoles = [
  "Autonomous QA Analyst",
  "Predictive Support Agent",
  "Growth Intelligence Partner",
  "Code Co-Pilot",
  "Security Sentinel",
  "Conversation Designer",
  "Insight Curator",
  "Customer Journey Analyst",
  "Automation Orchestrator",
  "Knowledge Synthesizer"
];

const aiDomains = [
  "24/7 Delivery Pods",
  "Experience Lab",
  "Automation Studio",
  "Cyber Trust",
  "Product Intelligence",
  "Growth Office"
];

const aiFocusAreas = [
  "Realtime insights across programs",
  "Conversational intelligence",
  "Synthetic data generation",
  "Security telemetry",
  "Continuous QA coverage",
  "Customer sentiment mapping",
  "Predictive resourcing",
  "Generative design comps"
];

const aiLocations = [
  "Global Cloud Edge",
  "North America",
  "EMEA",
  "APAC",
  "LATAM",
  "India",
  "Hybrid Pods"
];

const aiWorkModels = [
  "Always-on",
  "Follow-the-sun",
  "Human-in-the-loop",
  "Augmentation Mode"
];

const aiDescriptions = [
  "Co-pilots delivery squads with intelligent accelerators.",
  "Surfaces proactive recommendations before stand-ups.",
  "Synthesizes research into actionable blueprints.",
  "Keeps platforms resilient with predictive telemetry.",
  "Automates QA playbooks for every release train.",
  "Transforms signals into experience improvements.",
  "Connects product metrics with business impact.",
  "Designs adaptive workflows with human oversight."
];

const humanEmployees: RosterMember[] = [
  {
    id: 'human-1',
    name: 'Anshumali Jain',
    role: 'Deep Tech Expert',
    department: 'Automation Studio',
    focus: 'Enterprise AI Research',
    location: 'Bengaluru, India',
    workModel: 'Hybrid',
    description: 'Leads advanced AI experiments and systems thinking that accelerate automation programs.',
    type: 'Human',
    avatarGradient: 'from-slate-500 via-indigo-500 to-blue-500'
  },
  ...Array.from({ length: 100 }, (_, index) => {
    const first = employeeFirstNames[index % employeeFirstNames.length];
    const last = employeeLastNames[Math.floor(index / employeeFirstNames.length) % employeeLastNames.length];
    return {
      id: `human-${index + 2}`,
      name: `${first} ${last}`,
      role: employeeRoles[(index + 1) % employeeRoles.length],
      department: employeeDepartments[index % employeeDepartments.length],
      focus: employeeFocusAreas[index % employeeFocusAreas.length],
      location: employeeLocations[index % employeeLocations.length],
      workModel: employeeWorkModels[index % employeeWorkModels.length],
      description: employeeDescriptions[index % employeeDescriptions.length],
      type: "Human",
      avatarGradient: gradientPalette[(index + 1) % gradientPalette.length]
    };
  })
];

const aiAgents: RosterMember[] = Array.from({ length: 50 }, (_, index) => {
  const callSign = aiCallSigns[index % aiCallSigns.length];
  return {
    id: `ai-${index + 1}`,
    name: `${callSign}-${String(index + 1).padStart(2, "0")}`,
    role: aiRoles[index % aiRoles.length],
    department: aiDomains[index % aiDomains.length],
    focus: aiFocusAreas[index % aiFocusAreas.length],
    location: aiLocations[index % aiLocations.length],
    workModel: aiWorkModels[index % aiWorkModels.length],
    description: aiDescriptions[index % aiDescriptions.length],
    type: "AI Agent",
    avatarGradient: gradientPalette[(index + 3) % gradientPalette.length]
  };
});

const OurTeam = () => {
  const totalHumanMembers = humanEmployees.length;
  const totalAiMembers = aiAgents.length;
  const totalTeamMembers = totalHumanMembers + totalAiMembers;
  const [activeRoster, setActiveRoster] = useState<"employees" | "ai">("employees");
  const [expanded, setExpanded] = useState(false);

  const rosterDirectory = useMemo(
    () => (activeRoster === "employees" ? humanEmployees : aiAgents),
    [activeRoster]
  );
  const visibleCount = expanded ? rosterDirectory.length : 3;

  const workforceStats = [
    {
      icon: <Users className="w-6 h-6 text-blue-600" />,
      value: `${totalTeamMembers}`,
      label: "Total Collective",
      description: "Strategists, makers, and AI copilots shaping intelligent experiences."
    },
    {
      icon: <UserCheck className="w-6 h-6 text-green-600" />,
      value: `${totalHumanMembers}`,
      label: "Human Specialists",
      description: "Product, design, and delivery experts leading transformation."
    },
    {
      icon: <Cpu className="w-6 h-6 text-indigo-600" />,
      value: `${totalAiMembers}`,
      label: "AI Agents",
      description: "Always-on intelligent agents powering automation and insight."
    }
  ];

  const growthTimeline = [
    {
      year: "2023",
      title: "Automation Guild",
      description: "Launched cross-functional pods accelerating process automation."
    },
    {
      year: "2024",
      title: "Global Expansion",
      description: "Scaled delivery footprints across five continents with hybrid teams."
    },
    {
      year: "2025",
      title: "Intelligent Workforce",
      description: "Unified 150 specialists and AI agents to deliver 24/7 innovation."
    }
  ];

  const rosterHeading = activeRoster === "employees" ? "Specialist Employees" : "AI Agents";
  const rosterSubheading =
    activeRoster === "employees"
      ? "Human-led craft across product, engineering, design, growth, and success."
      : "AI copilots orchestrating insights, QA, and operational excellence.";

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
            <div className="flex flex-wrap justify-center gap-4 text-sm text-blue-100">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <Users className="w-5 h-5" />
                <span>{totalTeamMembers}+ Builders & Agents</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <Sparkles className="w-5 h-5" />
                <span>{totalAiMembers} AI copilots live in production</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <MapPin className="w-5 h-5" />
                <span>12+ Regions · Follow-the-sun coverage</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-3 py-2 rounded-full backdrop-blur-sm">
                <Clock className="w-5 h-5" />
                <span>2025 Ready · 24/7 Delivery Rhythm</span>
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
              {teamMembers
                .filter((member) => member.segment === "leadership")
                .map((member) => (
                <Card key={member.email} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square relative bg-white/0">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-contain"
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

      {/* 2025 Workforce Snapshot */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge 
                variant="outline" 
                className="px-4 py-1 text-sm font-semibold uppercase tracking-wide border-blue-100 text-blue-600 bg-blue-50/40"
              >
                2025 Workforce
              </Badge>
              <h2 className="text-4xl font-bold text-gray-900 mt-6 mb-4 font-poppins">
                Building the Intelligent Workforce of 2025
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We blend human ingenuity with AI acceleration to deliver resilient, customer-obsessed experiences around the clock.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              <div className="lg:col-span-2 grid gap-6 sm:grid-cols-2">
                {workforceStats.map((item, index) => (
                  <Card 
                    key={index} 
                    className="h-full shadow-lg border border-blue-50 hover:shadow-xl transition-shadow duration-300"
                  >
                    <CardContent className="p-6 flex flex-col gap-4">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                        {item.icon}
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900 font-poppins">
                          {item.value}
                        </p>
                        <p className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                          {item.label}
                        </p>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <Card className="bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 text-white shadow-xl relative overflow-hidden">
                <CardContent className="p-8 space-y-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-blue-100" />
                    <span className="text-sm uppercase tracking-wide text-blue-100/80">
                      Year 2025
                    </span>
                  </div>
                  <h3 className="text-2xl font-semibold font-poppins">
                    Growth Timeline
                  </h3>
                  <div className="space-y-5">
                    {growthTimeline.map((milestone) => (
                      <div 
                        key={milestone.year} 
                        className="bg-white/10 rounded-xl p-4 backdrop-blur-sm border border-white/10"
                      >
                        <p className="text-sm text-blue-100/70 uppercase tracking-wide">
                          {milestone.year}
                        </p>
                        <p className="text-lg font-semibold text-white mt-1">
                          {milestone.title}
                        </p>
                        <p className="text-sm text-blue-100/80 mt-2 leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Workforce Directory */}
      <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.25),_transparent_55%)] opacity-70 pointer-events-none" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <Badge 
                variant="secondary" 
                className="bg-white/10 border border-white/20 text-white uppercase tracking-wide px-5 py-1 rounded-full"
              >
                150 Members • 2025 Cohort
              </Badge>
              <h2 className="text-4xl font-bold mt-6 mb-4 font-poppins">
                Human + AI Collective
              </h2>
              <p className="text-lg text-blue-100 max-w-3xl mx-auto">
                Explore the full roster of strategists, makers, and intelligent copilots powering Maninfini's next decade of growth.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Button
                variant="outline"
                onClick={() => { setActiveRoster("employees"); setExpanded(false); }}
                className={`rounded-full px-6 py-2 border-white/40 transition-all duration-200 ${
                  activeRoster === "employees"
                    ? "bg-white text-blue-900 hover:bg-blue-50"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                Human Specialists ({totalHumanMembers})
              </Button>
              <Button
                variant="outline"
                onClick={() => { setActiveRoster("ai"); setExpanded(false); }}
                className={`rounded-full px-6 py-2 border-white/40 transition-all duration-200 ${
                  activeRoster === "ai"
                    ? "bg-white text-blue-900 hover:bg-blue-50"
                    : "bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                AI Agents ({totalAiMembers})
              </Button>
            </div>

            <p className="text-center text-blue-100/80 mb-12 max-w-3xl mx-auto">
              {rosterSubheading}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 mb-6 text-blue-100/70">
              <h3 className="text-2xl font-semibold text-white font-poppins">
                {rosterHeading}
              </h3>
              <span className="text-sm uppercase tracking-wide">
                {rosterDirectory.length} profiles curated for 2025 delivery
              </span>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {rosterDirectory.slice(0, visibleCount).map((member) => (
                <Card
                  key={member.id}
                  className="bg-white/5 border border-white/10 backdrop-blur-md text-left overflow-hidden hover:border-white/30 transition-all duration-300"
                >
                  <CardContent className="p-6 space-y-5">
                    <div className={`rounded-2xl bg-gradient-to-br ${member.avatarGradient} p-5 shadow-lg`}>
                      <p className="uppercase text-xs tracking-widest text-white/80">
                        {member.type}
                      </p>
                      <h3 className="text-2xl font-semibold text-white font-poppins mt-2">
                        {member.name}
                      </h3>
                      <p className="text-sm text-white/80">
                        {member.role}
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge 
                        variant="outline" 
                        className="border-white/20 bg-white/10 text-white/90"
                      >
                        {member.department}
                      </Badge>
                      <Badge 
                        variant="outline" 
                        className="border-white/20 bg-white/10 text-white/90"
                      >
                        {member.workModel}
                      </Badge>
                    </div>
                    <div className="space-y-3 text-sm text-blue-100/90">
                      <div className="flex items-center gap-3">
                        <Globe className="w-4 h-4" />
                        <span>{member.location}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-4 h-4" />
                        <span>{member.focus}</span>
                      </div>
                    </div>
                    <p className="text-sm text-blue-50 leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center mt-10">
              {!expanded && rosterDirectory.length > visibleCount && (
                <Button className="bg-white/90 text-blue-900 hover:bg-white" onClick={() => setExpanded(true)}>
                  Show all {rosterDirectory.length}
                </Button>
              )}
              {expanded && (
                <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900" onClick={() => setExpanded(false)}>
                  Show less
                </Button>
              )}
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
              {teamMembers
                .filter((member) => member.segment === "technical")
                .map((member) => (
                <Card key={member.email} className="overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-square relative bg-white/0">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-contain"
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
