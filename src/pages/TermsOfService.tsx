import { Helmet } from "react-helmet-async";
import Breadcrumb from "@/components/Breadcrumb";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import Header from "@/components/Header";

const TermsOfService = () => {
  return (
    <>
      <Helmet>
        <title>Terms of Service - Maninfini | Automation Solutions</title>
        <meta name="description" content="Read Maninfini's terms of service to understand the rules and conditions for using our automation solutions and services. Learn about your rights and obligations." />
        <meta name="keywords" content="terms of service, terms and conditions, legal agreement, Maninfini, automation services" />
        <meta property="og:title" content="Terms of Service - Maninfini | Automation Solutions" />
        <meta property="og:description" content="Read Maninfini's terms of service to understand the rules and conditions for using our automation solutions and services." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maninfini.com/terms-of-service" />
        <meta name="twitter:title" content="Terms of Service - Maninfini" />
        <meta name="twitter:description" content="Read Maninfini's terms of service to understand the rules and conditions for using our automation solutions and services." />
        <link rel="canonical" href="https://maninfini.com/terms-of-service" />
      </Helmet>
      
      <LocalBusinessSchema />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-32">
          <Breadcrumb 
            items={[
              { name: "Home", url: "/" },
              { name: "Terms of Service", url: "/terms-of-service" }
            ]} 
          />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 mb-4">
                  By accessing and using the services provided by Maninfini ("we," "our," or "us"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
                </p>
                <p className="text-gray-700">
                  These Terms of Service ("Terms") govern your use of our website, services, and any related applications (collectively, the "Service").
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. Description of Service</h2>
                <p className="text-gray-700 mb-4">
                  Maninfini provides automation solutions, custom development, and intelligent systems services, including but not limited to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Web development and design services</li>
                  <li>E-commerce solutions</li>
                  <li>WhatsApp automation services</li>
                  <li>Custom software development</li>
                  <li>Offshore team services</li>
                  <li>Virtual office solutions</li>
                  <li>Consulting and advisory services</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. User Accounts and Registration</h2>
                <p className="text-gray-700 mb-4">
                  To access certain features of our Service, you may be required to create an account. You agree to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Provide accurate, current, and complete information</li>
                  <li>Maintain and update your account information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized use</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Payment Terms</h2>
                <p className="text-gray-700 mb-4">
                  Payment terms for our services are as follows:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>All fees are due upon receipt of invoice unless otherwise agreed</li>
                  <li>Payment methods accepted: bank transfer, credit card, digital payments</li>
                  <li>Late payments may result in service suspension</li>
                  <li>All fees are non-refundable unless otherwise specified</li>
                  <li>Prices are subject to change with 30 days notice</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. Intellectual Property Rights</h2>
                <p className="text-gray-700 mb-4">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of Maninfini and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                <p className="text-gray-700 mb-4">
                  For custom development projects:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Client retains ownership of their proprietary content</li>
                  <li>Maninfini retains rights to reusable components and frameworks</li>
                  <li>Source code ownership is specified in individual project agreements</li>
                  <li>Third-party components remain under their respective licenses</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Acceptable Use Policy</h2>
                <p className="text-gray-700 mb-4">
                  You agree not to use the Service to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe upon the rights of others</li>
                  <li>Transmit harmful, offensive, or inappropriate content</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Interfere with the proper functioning of the Service</li>
                  <li>Use the Service for any illegal or unauthorized purpose</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Service Level Agreement</h2>
                <p className="text-gray-700 mb-4">
                  Our service commitments include:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>99.9% uptime for hosted services (excluding scheduled maintenance)</li>
                  <li>24/7 technical support for critical issues</li>
                  <li>Response time of 4 hours for urgent matters</li>
                  <li>Regular security updates and patches</li>
                  <li>Data backup and disaster recovery procedures</li>
                </ul>
                <p className="text-gray-700">
                  Specific SLAs are detailed in individual service agreements.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Limitation of Liability</h2>
                <p className="text-gray-700 mb-4">
                  In no event shall Maninfini, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Your use or inability to use the Service</li>
                  <li>Any unauthorized access to or use of our servers</li>
                  <li>Any interruption or cessation of transmission to or from the Service</li>
                  <li>Any bugs, viruses, or other harmful code</li>
                  <li>Any errors or omissions in any content</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Indemnification</h2>
                <p className="text-gray-700 mb-4">
                  You agree to defend, indemnify, and hold harmless Maninfini and its affiliates from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Your use of the Service</li>
                  <li>Your violation of these Terms</li>
                  <li>Your violation of any third-party rights</li>
                  <li>Any content you submit or transmit through the Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">10. Termination</h2>
                <p className="text-gray-700 mb-4">
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever and without limitation, including but not limited to a breach of the Terms.
                </p>
                <p className="text-gray-700">
                  Upon termination, your right to use the Service will cease immediately. If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">11. Governing Law</h2>
                <p className="text-gray-700 mb-4">
                  These Terms shall be interpreted and governed by the laws of India, without regard to its conflict of law provisions. Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">12. Dispute Resolution</h2>
                <p className="text-gray-700 mb-4">
                  Any disputes arising from these Terms or the Service shall be resolved through:
                </p>
                <ol className="list-decimal list-inside text-gray-700 mb-4 ml-4">
                  <li>Direct negotiation between parties</li>
                  <li>Mediation if direct negotiation fails</li>
                  <li>Arbitration in accordance with Indian law</li>
                  <li>Legal proceedings in courts of Bengaluru, India</li>
                </ol>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">13. Changes to Terms</h2>
                <p className="text-gray-700 mb-4">
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will try to provide at least 30 days notice prior to any new terms taking effect.
                </p>
                <p className="text-gray-700">
                  What constitutes a material change will be determined at our sole discretion.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">14. Contact Information</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about these Terms of Service, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Maninfini</strong></p>
                  <p className="text-gray-700 mb-2">#20, Ground Floor, 12th Cross Cubbonpet</p>
                  <p className="text-gray-700 mb-2">Banappa Park Road, Bengaluru - 560002, India</p>
                  <p className="text-gray-700 mb-2">Email: legal@maninfini.com</p>
                  <p className="text-gray-700">Phone: +91 80 4112 5555</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TermsOfService; 