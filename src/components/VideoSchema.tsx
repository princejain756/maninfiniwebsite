import { Helmet } from 'react-helmet-async';

interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration: string;
  contentUrl: string;
  embedUrl?: string;
  publisher: {
    name: string;
    logo: string;
  };
  author?: {
    name: string;
    url?: string;
  };
  keywords?: string[];
  genre?: string;
  inLanguage?: string;
}

const VideoSchema: React.FC<VideoSchemaProps> = ({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  duration,
  contentUrl,
  embedUrl,
  publisher,
  author,
  keywords = [],
  genre,
  inLanguage = "en"
}) => {
  const videoSchema = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    "name": name,
    "description": description,
    "thumbnailUrl": thumbnailUrl,
    "uploadDate": uploadDate,
    "duration": duration,
    "contentUrl": contentUrl,
    ...(embedUrl && { "embedUrl": embedUrl }),
    "publisher": {
      "@type": "Organization",
      "name": publisher.name,
      "logo": {
        "@type": "ImageObject",
        "url": publisher.logo
      }
    },
    ...(author && {
      "author": {
        "@type": "Person",
        "name": author.name,
        ...(author.url && { "url": author.url })
      }
    }),
    ...(keywords.length > 0 && { "keywords": keywords.join(", ") }),
    ...(genre && { "genre": genre }),
    "inLanguage": inLanguage
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(videoSchema)}
      </script>
    </Helmet>
  );
};

export default VideoSchema; 