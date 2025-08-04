import { Helmet } from 'react-helmet-async';

// Utility function to validate meta description length
const validateMetaDescription = (description: string): string => {
  const maxLength = 160;
  const minLength = 150;
  
  if (description.length > maxLength) {
    // Truncate to maxLength and add ellipsis if needed
    return description.length > maxLength + 3 
      ? description.substring(0, maxLength - 3) + '...'
      : description.substring(0, maxLength);
  }
  
  if (description.length < minLength) {
    // Description is too short, but we'll keep it as is
  }
  
  return description;
};

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
  noindex?: boolean;
  nofollow?: boolean;
  // Advanced SEO props
  language?: string;
  alternateLanguages?: { [key: string]: string };
  structuredData?: object;
  twitterHandle?: string;
  facebookAppId?: string;
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  bingWebmasterTools?: string;
  yandexVerification?: string;
  baiduVerification?: string;
  hreflang?: { [key: string]: string };
}

const SEO: React.FC<SEOProps> = ({
  title = "Maninfini Automation - Leading Digital Transformation & Business Automation Services",
  description = "Transform your business with cutting-edge automation and custom software development. Trusted automation partner since 2008. Expert in AI, RPA, and digital transformation.",
  keywords = "business automation, digital transformation, custom software development, process automation, AI solutions, machine learning, workflow automation, enterprise software, business intelligence, data analytics, cloud solutions, API development, web applications, mobile apps, system integration, legacy modernization, digital consulting, IT services, technology solutions, automation consulting, RPA, artificial intelligence, machine learning, cloud computing, digital transformation services",
  image = "https://maninfini.com/manlogo.png",
  url = "https://maninfini.com",
  type = "website",
  author = "Maninfini Automation",
  publishedTime,
  modifiedTime,
  section,
  tags = [],
  noindex = false,
  nofollow = false,
  // Advanced SEO props
  language = "en",
  alternateLanguages = {},
  structuredData,
  twitterHandle = "@maninfini",
  facebookAppId,
  googleAnalyticsId = "G-XXXXXXXXXX", // Replace with actual GA4 ID
  googleTagManagerId = "GTM-XXXXXXX", // Replace with actual GTM ID
  bingWebmasterTools,
  yandexVerification,
  baiduVerification,
  hreflang = {}
}) => {
  const robots = noindex || nofollow 
    ? `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`
    : 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';

  // Validate and potentially truncate the description
  const validatedDescription = validateMetaDescription(description);

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={validatedDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={validatedDescription} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Maninfini Automation" />
      <meta property="og:locale" content="en_US" />
      
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {section && <meta property="article:section" content={section} />}
      {tags.map((tag, index) => (
        <meta key={index} property="article:tag" content={tag} />
      ))}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={validatedDescription} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:creator" content={twitterHandle} />

      {/* Advanced Meta Tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Maninfini Automation" />
      
      {/* Performance and Security */}
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />
      
      {/* Additional SEO Meta Tags */}
      <meta name="author" content="Maninfini Automation" />
      <meta name="copyright" content="Maninfini Automation" />
      <meta name="coverage" content="Worldwide" />
      <meta name="distribution" content="Global" />
      <meta name="rating" content="General" />
      <meta name="revisit-after" content="7 days" />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      
      {/* Preconnect to external domains for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      
      {/* Language and Internationalization */}
      <html lang={language} />
      {Object.entries(hreflang).map(([lang, href]) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}
      
      {/* Webmaster Tools */}
      {bingWebmasterTools && <meta name="msvalidate.01" content={bingWebmasterTools} />}
      {yandexVerification && <meta name="yandex-verification" content={yandexVerification} />}
      {baiduVerification && <meta name="baidu-site-verification" content={baiduVerification} />}
      
      {/* Facebook App ID */}
      {facebookAppId && <meta property="fb:app_id" content={facebookAppId} />}
      
      {/* Google Analytics */}
      {googleAnalyticsId && (
        <>
          <script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}></script>
          <script dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${googleAnalyticsId}');
            `
          }} />
        </>
      )}
      
      {/* Google Tag Manager */}
      {googleTagManagerId && (
        <>
          <script dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${googleTagManagerId}');
            `
          }} />
        </>
      )}
      
      {/* Structured Data - Article (if type is article) */}
      {type === 'article' && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": title,
            "description": validatedDescription,
            "image": image,
            "author": {
              "@type": "Organization",
              "name": author
            },
            "publisher": {
              "@type": "Organization",
              "name": "Maninfini Automation",
              "logo": {
                "@type": "ImageObject",
                "url": "https://maninfini.com/manlogo.png"
              }
            },
            "datePublished": publishedTime,
            "dateModified": modifiedTime,
            "mainEntityOfPage": {
              "@type": "WebPage",
              "@id": url
            }
          })}
        </script>
      )}

      {/* Structured Data - WebPage (default) */}
      {type !== 'article' && !structuredData && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": title,
            "description": validatedDescription,
            "url": url,
            "mainEntity": {
              "@type": "Organization",
              "name": "Maninfini Automation",
              "url": "https://maninfini.com",
              "logo": "https://maninfini.com/manlogo.png",
              "description": "Leading provider of digital transformation and business automation services since 2008",
              "foundingDate": "2008",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "availableLanguage": "English"
              },
              "sameAs": [
                "https://www.linkedin.com/company/maninfini-automation?originalSubdomain=in",
                "https://twitter.com/maninfini"
              ]
            },
            "breadcrumb": {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://maninfini.com"
                }
              ]
            }
          })}
        </script>
      )}
      
      {/* Custom Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO; 