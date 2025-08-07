import { Helmet } from "react-helmet-async";
import Breadcrumb from "@/components/Breadcrumb";
import LocalBusinessSchema from "@/components/LocalBusinessSchema";
import Header from "@/components/Header";

const CookiePolicy = () => {
  return (
    <>
      <Helmet>
        <title>Cookie Policy - Maninfini | Automation</title>
        <meta name="description" content="Learn about how Maninfini uses cookies and similar technologies to enhance your browsing experience and provide personalized services." />
        <meta name="keywords" content="cookie policy, cookies, tracking technologies, data collection, Maninfini" />
        <meta property="og:title" content="Cookie Policy - Maninfini | Automation" />
        <meta property="og:description" content="Learn about how Maninfini uses cookies and similar technologies to enhance your browsing experience." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://maninfini.com/cookie-policy" />
        <meta name="twitter:title" content="Cookie Policy - Maninfini" />
        <meta name="twitter:description" content="Learn about how Maninfini uses cookies and similar technologies to enhance your browsing experience." />
        <link rel="canonical" href="https://maninfini.com/cookie-policy" />
      </Helmet>
      
      <LocalBusinessSchema />
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <Header />
        <div className="container mx-auto px-4 py-8 pt-32">
          <Breadcrumb 
            items={[
              { name: "Home", url: "/" },
              { name: "Cookie Policy", url: "/cookie-policy" }
            ]} 
          />
          
          <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 mt-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
            <p className="text-gray-600 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
            
            <div className="prose prose-lg max-w-none">
              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">1. Introduction</h2>
                <p className="text-gray-700 mb-4">
                  This Cookie Policy explains how Maninfini ("we," "our," or "us") uses cookies and similar technologies when you visit our website, use our services, or interact with us online.
                </p>
                <p className="text-gray-700">
                  By using our website, you consent to the use of cookies in accordance with this policy. If you do not agree to our use of cookies, you should set your browser settings accordingly or refrain from using our website.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">2. What Are Cookies?</h2>
                <p className="text-gray-700 mb-4">
                  Cookies are small text files that are stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners.
                </p>
                <p className="text-gray-700">
                  Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your device for a set period or until you delete them, while session cookies are deleted when you close your browser.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">3. Types of Cookies We Use</h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">3.1 Essential Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation, access to secure areas, and form submissions. The website cannot function properly without these cookies.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Authentication cookies to keep you logged in</li>
                  <li>Security cookies to protect against fraud</li>
                  <li>Session cookies to maintain your preferences during your visit</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3">3.2 Performance Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Google Analytics cookies to analyze website traffic</li>
                  <li>Error tracking cookies to identify and fix issues</li>
                  <li>Performance monitoring cookies to optimize website speed</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3">3.3 Functionality Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies allow the website to remember choices you make and provide enhanced, more personal features.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Language preference cookies</li>
                  <li>Theme and layout preference cookies</li>
                  <li>Form data cookies to remember your inputs</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3">3.4 Marketing Cookies</h3>
                <p className="text-gray-700 mb-4">
                  These cookies are used to track visitors across websites to display relevant and engaging advertisements.
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Social media cookies for sharing content</li>
                  <li>Advertising cookies for personalized ads</li>
                  <li>Retargeting cookies to show relevant content</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">4. Third-Party Cookies</h2>
                <p className="text-gray-700 mb-4">
                  We may use third-party services that place cookies on your device. These services include:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                  <li><strong>Google Ads:</strong> For advertising and remarketing purposes</li>
                  <li><strong>Social Media Platforms:</strong> For social sharing and integration</li>
                  <li><strong>Payment Processors:</strong> For secure payment processing</li>
                </ul>
                <p className="text-gray-700">
                  These third-party services have their own privacy policies and cookie policies. We encourage you to review their policies to understand how they use your information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">5. How We Use Cookies</h2>
                <p className="text-gray-700 mb-4">
                  We use cookies for the following purposes:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>To provide and maintain our website functionality</li>
                  <li>To analyze how our website is used and improve user experience</li>
                  <li>To remember your preferences and settings</li>
                  <li>To provide personalized content and advertisements</li>
                  <li>To ensure security and prevent fraud</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">6. Managing Your Cookie Preferences</h2>
                
                <h3 className="text-xl font-medium text-gray-800 mb-3">6.1 Browser Settings</h3>
                <p className="text-gray-700 mb-4">
                  You can control and manage cookies through your browser settings. Most browsers allow you to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>View and delete existing cookies</li>
                  <li>Block cookies from being set</li>
                  <li>Set preferences for different types of cookies</li>
                  <li>Receive notifications when cookies are being set</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3">6.2 Cookie Consent</h3>
                <p className="text-gray-700 mb-4">
                  When you first visit our website, you will see a cookie consent banner that allows you to:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Accept all cookies</li>
                  <li>Reject non-essential cookies</li>
                  <li>Customize your cookie preferences</li>
                </ul>

                <h3 className="text-xl font-medium text-gray-800 mb-3">6.3 Opt-Out Options</h3>
                <p className="text-gray-700 mb-4">
                  You can opt out of certain types of cookies:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Google Analytics:</strong> Use the Google Analytics Opt-out Browser Add-on</li>
                  <li><strong>Advertising:</strong> Visit the Digital Advertising Alliance or Network Advertising Initiative</li>
                  <li><strong>Social Media:</strong> Adjust your privacy settings on social media platforms</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">7. Data Retention</h2>
                <p className="text-gray-700 mb-4">
                  The length of time cookies remain on your device depends on their type:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                  <li><strong>Persistent cookies:</strong> Remain until they expire or you delete them</li>
                  <li><strong>Third-party cookies:</strong> Subject to the third-party's retention policy</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">8. Updates to This Policy</h2>
                <p className="text-gray-700 mb-4">
                  We may update this Cookie Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We will notify you of any material changes by:
                </p>
                <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
                  <li>Posting the updated policy on our website</li>
                  <li>Updating the "Last updated" date at the top of this policy</li>
                  <li>Sending you an email notification (if required by law)</li>
                </ul>
                <p className="text-gray-700">
                  Your continued use of our website after any changes indicates your acceptance of the updated policy.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">9. Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  If you have any questions about this Cookie Policy or our use of cookies, please contact us:
                </p>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-gray-700 mb-2"><strong>Email:</strong> privacy@maninfini.com</p>
                                     <p className="text-gray-700 mb-2"><strong>Phone:</strong> +91 83105 16955</p>
                  <p className="text-gray-700 mb-2"><strong>Address:</strong> #20, Ground Floor, 12th Cross, Cubbonpet, Banappa Park Road, Bengaluru - 560002</p>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookiePolicy; 