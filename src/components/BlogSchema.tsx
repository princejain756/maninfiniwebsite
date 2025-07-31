import { Helmet } from 'react-helmet-async';

interface BlogPost {
  title: string;
  description: string;
  url: string;
  publishedDate: string;
  author: string;
  image: string;
}

interface BlogSchemaProps {
  posts: BlogPost[];
}

const BlogSchema: React.FC<BlogSchemaProps> = ({ posts }) => {
  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Maninfini Automation Blog",
    "description": "Expert insights on business automation, AI solutions, and digital transformation strategies",
    "url": "https://maninfini.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Maninfini Automation",
      "logo": {
        "@type": "ImageObject",
        "url": "https://maninfini.com/manlogo.png"
      }
    },
    "blogPost": posts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.description,
      "url": post.url,
      "datePublished": post.publishedDate,
      "author": {
        "@type": "Organization",
        "name": post.author
      },
      "image": post.image,
      "publisher": {
        "@type": "Organization",
        "name": "Maninfini Automation"
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(blogSchema)}
      </script>
    </Helmet>
  );
};

export default BlogSchema; 