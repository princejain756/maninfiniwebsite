import { Helmet } from 'react-helmet-async';

interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

interface HowToSchemaProps {
  name: string;
  description: string;
  image?: string;
  url?: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
  steps: HowToStep[];
  tool?: string[];
  supply?: string[];
}

const HowToSchema: React.FC<HowToSchemaProps> = ({
  name,
  description,
  image,
  url,
  totalTime,
  estimatedCost,
  steps,
  tool = [],
  supply = []
}) => {
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "image": image,
    "url": url,
    ...(totalTime && { "totalTime": totalTime }),
    ...(estimatedCost && {
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": estimatedCost.currency,
        "value": estimatedCost.value
      }
    }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.image && { "image": step.image }),
      ...(step.url && { "url": step.url })
    })),
    ...(tool.length > 0 && { "tool": tool }),
    ...(supply.length > 0 && { "supply": supply })
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
      </script>
    </Helmet>
  );
};

export default HowToSchema; 