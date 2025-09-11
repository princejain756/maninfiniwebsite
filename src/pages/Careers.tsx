import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { contactInfo, websiteActions } from '@/lib/utils';
import { CheckCircle2, Sparkles, Rocket, Users2, Trophy, Laptop, MapPin, Mail, Clock } from 'lucide-react';

const roles = [
  {
    title: 'Senior React/TypeScript Engineer',
    location: 'Bengaluru • Hybrid/Remote',
    type: 'Full-time',
    summary: 'Own delightful product experiences across web. Performance, DX, and pixel-perfect execution.',
    highlights: ['React + TypeScript', 'UX polish & animations', 'API integration', 'Performance & accessibility'],
  },
  {
    title: 'Cloud & DevOps Engineer',
    location: 'Bengaluru • Hybrid/Remote',
    type: 'Full-time',
    summary: 'Design reliable cloud infra and CI/CD for high-availability automation products.',
    highlights: ['AWS/Azure/GCP', 'Docker & CI/CD', 'Security & monitoring', 'Cost optimization'],
  },
  {
    title: 'AI/Automation Engineer',
    location: 'Bengaluru • Hybrid/Remote',
    type: 'Full-time',
    summary: 'Ship intelligent automations: LLMs, RAG, bots, analytics; measurable business impact.',
    highlights: ['Python/Node', 'LLMs/RAG', 'Data pipelines', 'Prompt & evals'],
  },
];

const benefits = [
  { icon: Trophy, label: 'High-impact work' },
  { icon: Users2, label: 'Small, elite team' },
  { icon: Laptop, label: 'Top tools & hardware' },
  { icon: Rocket, label: 'Rapid growth path' },
];

const Careers = () => {
  const apply = (role: string) => {
    try { (window as any).gtag?.('event', 'careers_apply_click', { role, event_category: 'careers' }); } catch {}
    websiteActions.sendEmail(
      contactInfo.displayEmail,
      `Application: ${role} @ Maninfini`,
      `Hello Maninfini team,\n\nI am applying for the ${role} role.\n\nLinks:\n- LinkedIn: \n- GitHub/Portfolio: \n\nShort note (why me): \n\nRegards,\n`
    );
  };

  const jobPostingStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Careers at Maninfini',
    itemListElement: roles.map((r, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'JobPosting',
        title: r.title,
        description: r.summary,
        hiringOrganization: {
          '@type': 'Organization',
          name: 'Maninfini Automation',
          sameAs: 'https://maninfini.com',
          logo: 'https://maninfini.com/manlogo.png',
        },
        employmentType: 'FULL_TIME',
        jobLocationType: 'TELECOMMUTE',
        applicantLocationRequirements: { '@type': 'Country', name: 'India' },
        validThrough: new Date(Date.now() + 1000 * 60 * 60 * 24 * 60).toISOString(),
      },
    })),
  };

  return (
    <>
      <SEO
        title="We’re Hiring – Careers at Maninfini"
        description="Join Maninfini’s elite team building automation, cloud, and AI products used by fast-growing businesses. High-ownership roles, rapid growth, and beautiful UX."
        keywords="careers, hiring, jobs, React jobs, DevOps jobs, AI engineer, Bengaluru jobs, automation"
        url="https://maninfini.com/careers"
        image="https://maninfini.com/manlogo.png"
        structuredData={jobPostingStructuredData}
      />
      <div className="min-h-screen flex flex-col">
        <Header />

        {/* Hero */}
        <section className="relative pt-28 pb-16 sm:pt-32 sm:pb-20">
          <div className="absolute inset-0 hero-gradient opacity-90" />
          <div className="relative container mx-auto px-4 text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20 mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-sm font-medium">We’re hiring across multiple roles</span>
            </div>
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-poppins font-bold leading-tight">
              Build The Future of
              <span className="text-gradient block">Automation & AI</span>
            </h1>
            <p className="mt-4 max-w-2xl text-white/90 text-base sm:text-lg">
              Ship beautiful, performant products that automate real businesses. Own impact end-to-end, learn fast, and grow with us.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {benefits.map(({ icon: Icon, label }) => (
                <Badge key={label} className="bg-white/10 border-white/20 text-white flex items-center gap-2">
                  <Icon className="w-4 h-4" /> {label}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Open Roles */}
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold">Open Roles</h2>
            <p className="text-muted-foreground mt-2">We look for builders who care about craft, speed, and impact.</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {roles.map((role) => (
              <Card key={role.title} className="h-full flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">{role.title}</CardTitle>
                  <CardDescription>{role.summary}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="w-4 h-4" /> {role.location}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground"><Clock className="w-4 h-4" /> {role.type}</div>
                  <ul className="mt-2 space-y-2">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter className="mt-auto flex items-center justify-between">
                  <Button className="btn-gradient" onClick={() => apply(role.title)}>Apply Now</Button>
                  <Button variant="outline" onClick={() => {
                    try { (window as any).gtag?.('event', 'careers_question_click', { role: role.title, event_category: 'careers' }); } catch {}
                    websiteActions.sendEmail(contactInfo.displayEmail, `Question about ${role.title}`, 'Hi team, I have a quick question about this role:')
                  }}>
                    <Mail className="w-4 h-4 mr-2" /> Ask a question
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Culture */}
        <section className="container mx-auto px-4 pb-16">
          <div className="grid gap-6 lg:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-bold">How we work</h2>
              <p className="text-muted-foreground">Small squads, quick decisions, and craftsmanship. We ship fast, iterate with customers, and keep UX quality high.</p>
              <ul className="space-y-2">
                {['Extreme ownership', 'Craft + speed over process', 'Bias to ship + measure impact', 'Kind, direct communication'].map((p) => (
                  <li key={p} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="w-4 h-4 text-accent mt-0.5" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-elegant p-8">
              <h3 className="text-xl font-semibold">Don’t see your role?</h3>
              <p className="text-muted-foreground mt-2">Tell us how you can create value. Great talent always finds a place here.</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button className="btn-gradient" onClick={() => {
                  try { (window as any).gtag?.('event', 'careers_pitch_click', { event_category: 'careers' }); } catch {}
                  apply('General Application')
                }}>Pitch your role</Button>
                <Button variant="outline" onClick={() => {
                  try { (window as any).gtag?.('event', 'careers_whatsapp_click', { event_category: 'careers' }); } catch {}
                  websiteActions.openWhatsApp(contactInfo.salesPhone, 'Hi! I’m interested in careers at Maninfini.')
                }}>
                  Quick chat on WhatsApp
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </>
  );
};

export default Careers;
