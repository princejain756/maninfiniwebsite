import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const features = [
  'Vulnerability Assessment',
  'Penetration Testing',
  'Security Audits',
  'Data Protection & Compliance',
  '24/7 Threat Monitoring',
  'Incident Response',
  'Cloud Security',
  'Network Security'
];

const CyberCloudPage: React.FC = () => {
  return (
    <section className="min-h-screen py-16 bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex flex-col items-center text-center mb-12 animate-fade-in-up">
        <div className="mb-4">
          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-r from-gray-800 to-indigo-500 shadow-lg">
            <Shield className="w-8 h-8 text-white" />
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">Cyber Security</h1>
        <p className="text-lg sm:text-xl text-indigo-200 mb-6 max-w-2xl mx-auto">
          Comprehensive cybersecurity solutions to protect your business from digital threats and ensure compliance. From vulnerability assessment to incident response, we secure your digital infrastructure for peace of mind.
        </p>
          <Button size="lg" className="btn-gradient px-8 py-4 text-lg font-semibold">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
        <div className="bg-white/5 rounded-2xl shadow-xl p-8 animate-fade-in-up">
          <h2 className="text-2xl font-semibold mb-6 text-indigo-200">Our Capabilities</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-base">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-center gap-3 py-2">
                <span className="w-3 h-3 bg-indigo-400 rounded-full inline-block"></span>
                <span className="text-white/90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default CyberCloudPage;
