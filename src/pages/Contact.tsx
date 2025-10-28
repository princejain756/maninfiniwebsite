import Contact from "@/components/Contact";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

const ContactPage = () => {
  return (
    <>
      <SEO 
        title="Contact Us | Get in Touch with ManInfini"
        description="Contact ManInfini for web development, cloud solutions, AI services, and digital transformation. Reach out to our team for inquiries and support."
        canonicalUrl="https://maninfini.com/contact"
      />
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;
