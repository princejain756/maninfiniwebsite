import { Helmet } from 'react-helmet-async';

interface BreadcrumbItem {
  name: string;
  url: string;
  description?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  showSchema?: boolean;
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  showSchema = true, 
  className = "py-2" 
}) => {
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
      ...(item.description && { "description": item.description })
    }))
  };

  return (
    <>
      {showSchema && (
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify(breadcrumbSchema)}
          </script>
        </Helmet>
      )}
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex items-center space-x-2 text-sm text-gray-600">
          {items.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <svg className="w-4 h-4 mx-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              )}
              {index === items.length - 1 ? (
                <span className="text-gray-900 font-medium" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <a 
                  href={item.url} 
                  className="hover:text-gray-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
                  title={item.description}
                >
                  {item.name}
                </a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

export default Breadcrumb; 