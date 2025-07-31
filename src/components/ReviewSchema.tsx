import { Helmet } from 'react-helmet-async';

interface Review {
  author: string;
  rating: number;
  reviewBody: string;
  datePublished: string;
  reviewTitle?: string;
}

interface ReviewSchemaProps {
  reviews: Review[];
  itemReviewed: {
    name: string;
    description?: string;
    url?: string;
  };
}

const ReviewSchema: React.FC<ReviewSchemaProps> = ({ reviews, itemReviewed }) => {
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": itemReviewed.name,
    "description": itemReviewed.description,
    "url": itemReviewed.url,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length,
      "reviewCount": reviews.length,
      "bestRating": 5,
      "worstRating": 1
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.author
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating,
        "bestRating": 5,
        "worstRating": 1
      },
      "reviewBody": review.reviewBody,
      "datePublished": review.datePublished,
      "name": review.reviewTitle || `${review.author}'s review of ${itemReviewed.name}`
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(reviewSchema)}
      </script>
    </Helmet>
  );
};

export default ReviewSchema; 