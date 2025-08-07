import { Helmet } from 'react-helmet-async';

interface LocalBusinessSchemaProps {
  name?: string;
  description?: string;
  url?: string;
  telephone?: string;
  email?: string;
  address?: {
    streetAddress?: string;
    addressLocality?: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry?: string;
  };
  geo?: {
    latitude?: number;
    longitude?: number;
  };
  openingHours?: string[];
  priceRange?: string;
  image?: string;
  logo?: string;
}

const LocalBusinessSchema: React.FC<LocalBusinessSchemaProps> = ({
  name = "Maninfini Automation",
  description = "Leading provider of digital transformation and business automation services since 2008",
  url = "https://maninfini.com",
  telephone = "+91-XXXXXXXXXX",
  email = "info@maninfini.com",
  address = {
    streetAddress: "Your Street Address",
    addressLocality: "Your City",
    addressRegion: "Your State",
    postalCode: "Your Postal Code",
    addressCountry: "IN"
  },
  geo = {
    latitude: 28.6139,
    longitude: 77.2090
  },
  openingHours = ["Mo-Fr 09:00-18:00", "Sa 09:00-14:00"],
  priceRange = "$$",
  image = "https://maninfini.com/manlogo.png",
  logo = "https://maninfini.com/manlogo.png"
}) => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": name,
    "description": description,
    "url": url,
    "telephone": telephone,
    "email": email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": address.streetAddress,
      "addressLocality": address.addressLocality,
      "addressRegion": address.addressRegion,
      "postalCode": address.postalCode,
      "addressCountry": address.addressCountry
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": geo.latitude,
      "longitude": geo.longitude
    },
    "openingHoursSpecification": openingHours.map(hours => ({
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": hours.split(" ")[0].split("-").map(day => {
        const dayMap: { [key: string]: string } = {
          "Mo": "Monday",
          "Tu": "Tuesday", 
          "We": "Wednesday",
          "Th": "Thursday",
          "Fr": "Friday",
          "Sa": "Saturday",
          "Su": "Sunday"
        };
        return dayMap[day] || day;
      }),
      "opens": hours.split(" ")[1].split("-")[0],
      "closes": hours.split(" ")[1].split("-")[1]
    })),
    "priceRange": priceRange,
    "image": image,
    "logo": logo,
    "sameAs": [
      "https://twitter.com/maninfini",
      "https://www.linkedin.com/company/maninfini-automation?originalSubdomain=in",
      "https://www.facebook.com/maninfini",
      "https://instagram.com/maninfini.automation"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Automation Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Process Automation",
            "description": "Automate repetitive business processes to improve efficiency and reduce costs"
          }
        },
        {
          "@type": "Offer", 
          "itemOffered": {
            "@type": "Service",
            "name": "Custom Software Development",
            "description": "Tailored software solutions designed to meet your specific business needs"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service", 
            "name": "AI & Machine Learning Solutions",
            "description": "Intelligent automation and data-driven insights for business growth"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Transformation Consulting",
            "description": "Strategic guidance for modernizing your business operations and technology stack"
          }
        }
      ]
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
    </Helmet>
  );
};

export default LocalBusinessSchema; 