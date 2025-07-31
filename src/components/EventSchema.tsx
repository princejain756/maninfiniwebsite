import { Helmet } from 'react-helmet-async';

interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  location?: {
    name: string;
    address?: string;
    url?: string;
  };
  organizer: {
    name: string;
    url: string;
  };
  eventType?: 'Webinar' | 'Workshop' | 'Conference' | 'Training';
  image?: string;
  url?: string;
  price?: string;
  offers?: {
    price: string;
    priceCurrency: string;
    availability: string;
    validFrom: string;
  };
}

const EventSchema: React.FC<EventSchemaProps> = ({
  name,
  description,
  startDate,
  endDate,
  location,
  organizer,
  eventType = 'Webinar',
  image,
  url,
  price,
  offers
}) => {
  const eventSchema = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": name,
    "description": description,
    "startDate": startDate,
    "endDate": endDate,
    "eventType": eventType,
    "organizer": {
      "@type": "Organization",
      "name": organizer.name,
      "url": organizer.url
    },
    "performer": {
      "@type": "Organization",
      "name": "Maninfini Automation",
      "url": "https://maninfini.com"
    },
    ...(location && {
      "location": {
        "@type": "Place",
        "name": location.name,
        ...(location.address && { "address": location.address }),
        ...(location.url && { "url": location.url })
      }
    }),
    ...(image && { "image": image }),
    ...(url && { "url": url }),
    ...(price && { "price": price }),
    ...(offers && {
      "offers": {
        "@type": "Offer",
        "price": offers.price,
        "priceCurrency": offers.priceCurrency,
        "availability": offers.availability,
        "validFrom": offers.validFrom,
        "url": url
      }
    })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(eventSchema)}
      </script>
    </Helmet>
  );
};

export default EventSchema; 