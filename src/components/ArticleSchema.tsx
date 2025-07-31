import { Helmet } from 'react-helmet-async';

interface ArticleSchemaProps {
  title: string;
  description: string;
  content: string;
  author: string;
  publishedDate: string;
  updatedDate?: string;
  image: string;
  url: string;
  category: string;
  tags: string[];
  readTime: number;
  publisherName?: string;
  publisherLogo?: string;
}

const ArticleSchema: React.FC<ArticleSchemaProps> = ({
  title,
  description,
  content,
  author,
  publishedDate,
  updatedDate,
  image,
  url,
  category,
  tags,
  readTime,
  publisherName = "Maninfini Automation",
  publisherLogo = "https://maninfini.com/manlogo.png"
}) => {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": title,
    "description": description,
    "image": image,
    "author": {
      "@type": "Organization",
      "name": author
    },
    "publisher": {
      "@type": "Organization",
      "name": publisherName,
      "logo": {
        "@type": "ImageObject",
        "url": publisherLogo
      }
    },
    "datePublished": publishedDate,
    "dateModified": updatedDate || publishedDate,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "articleSection": category,
    "keywords": tags.join(", "),
    "wordCount": content.split(' ').length,
    "timeRequired": `PT${readTime}M`,
    "inLanguage": "en-US",
    "isAccessibleForFree": true,
    "isPartOf": {
      "@type": "Blog",
      "name": "Maninfini Automation Blog",
      "url": "https://maninfini.com/blog"
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(articleSchema)}
      </script>
    </Helmet>
  );
};

export default ArticleSchema; 