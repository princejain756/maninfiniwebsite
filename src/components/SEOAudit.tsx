import { useEffect, useState } from 'react';

interface SEOAuditResult {
  title: string;
  status: 'pass' | 'fail' | 'warning';
  message: string;
  score: number;
}

const SEOAudit: React.FC = () => {
  const [auditResults, setAuditResults] = useState<SEOAuditResult[]>([]);
  const [overallScore, setOverallScore] = useState(0);

  useEffect(() => {
    const runSEOAudit = () => {
      const results: SEOAuditResult[] = [];

      // Check meta tags
      const title = document.title;
      if (title && title.length > 10 && title.length < 60) {
        results.push({
          title: 'Page Title',
          status: 'pass',
          message: `Title is ${title.length} characters (optimal: 50-60)`,
          score: 100
        });
      } else {
        results.push({
          title: 'Page Title',
          status: 'fail',
          message: `Title is ${title.length} characters (should be 50-60)`,
          score: 0
        });
      }

      // Check meta description
      const metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        const desc = metaDescription.getAttribute('content') || '';
        if (desc.length > 120 && desc.length < 160) {
          results.push({
            title: 'Meta Description',
            status: 'pass',
            message: `Description is ${desc.length} characters (optimal: 150-160)`,
            score: 100
          });
        } else {
          results.push({
            title: 'Meta Description',
            status: 'warning',
            message: `Description is ${desc.length} characters (should be 150-160)`,
            score: 50
          });
        }
      } else {
        results.push({
          title: 'Meta Description',
          status: 'fail',
          message: 'No meta description found',
          score: 0
        });
      }

      // Check canonical URL
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        results.push({
          title: 'Canonical URL',
          status: 'pass',
          message: 'Canonical URL is present',
          score: 100
        });
      } else {
        results.push({
          title: 'Canonical URL',
          status: 'fail',
          message: 'No canonical URL found',
          score: 0
        });
      }

      // Check Open Graph tags
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector('meta[property="og:description"]');
      const ogImage = document.querySelector('meta[property="og:image"]');
      
      if (ogTitle && ogDescription && ogImage) {
        results.push({
          title: 'Open Graph Tags',
          status: 'pass',
          message: 'All Open Graph tags are present',
          score: 100
        });
      } else {
        results.push({
          title: 'Open Graph Tags',
          status: 'warning',
          message: 'Some Open Graph tags are missing',
          score: 50
        });
      }

      // Check Twitter Card tags
      const twitterCard = document.querySelector('meta[name="twitter:card"]');
      const twitterTitle = document.querySelector('meta[name="twitter:title"]');
      const twitterDescription = document.querySelector('meta[name="twitter:description"]');
      
      if (twitterCard && twitterTitle && twitterDescription) {
        results.push({
          title: 'Twitter Card Tags',
          status: 'pass',
          message: 'All Twitter Card tags are present',
          score: 100
        });
      } else {
        results.push({
          title: 'Twitter Card Tags',
          status: 'warning',
          message: 'Some Twitter Card tags are missing',
          score: 50
        });
      }

      // Check structured data
      const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
      if (structuredData.length > 0) {
        results.push({
          title: 'Structured Data',
          status: 'pass',
          message: `${structuredData.length} structured data blocks found`,
          score: 100
        });
      } else {
        results.push({
          title: 'Structured Data',
          status: 'fail',
          message: 'No structured data found',
          score: 0
        });
      }

      // Check images for alt text
      const images = document.querySelectorAll('img');
      const imagesWithAlt = Array.from(images).filter(img => img.alt && img.alt.trim() !== '');
      const altTextPercentage = images.length > 0 ? (imagesWithAlt.length / images.length) * 100 : 100;
      
      if (altTextPercentage >= 90) {
        results.push({
          title: 'Image Alt Text',
          status: 'pass',
          message: `${Math.round(altTextPercentage)}% of images have alt text`,
          score: 100
        });
      } else if (altTextPercentage >= 70) {
        results.push({
          title: 'Image Alt Text',
          status: 'warning',
          message: `${Math.round(altTextPercentage)}% of images have alt text`,
          score: 50
        });
      } else {
        results.push({
          title: 'Image Alt Text',
          status: 'fail',
          message: `${Math.round(altTextPercentage)}% of images have alt text`,
          score: 0
        });
      }

      // Check heading structure
      const h1s = document.querySelectorAll('h1');
      const h2s = document.querySelectorAll('h2');
      const h3s = document.querySelectorAll('h3');
      
      if (h1s.length === 1) {
        results.push({
          title: 'Heading Structure',
          status: 'pass',
          message: 'Proper heading structure with one H1',
          score: 100
        });
      } else {
        results.push({
          title: 'Heading Structure',
          status: 'warning',
          message: `${h1s.length} H1 tags found (should be 1)`,
          score: 50
        });
      }

      // Calculate overall score
      const totalScore = results.reduce((sum, result) => sum + result.score, 0);
      const averageScore = Math.round(totalScore / results.length);
      
      setAuditResults(results);
      setOverallScore(averageScore);
    };

    // Run audit after a short delay to ensure page is loaded
    const timer = setTimeout(runSEOAudit, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  if (auditResults.length === 0) {
    return <div className="p-4">Running SEO audit...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">SEO Audit Results</h2>
      
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold">Overall Score:</span>
          <div className={`text-2xl font-bold ${
            overallScore >= 80 ? 'text-green-600' : 
            overallScore >= 60 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {overallScore}/100
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div 
            className={`h-2 rounded-full ${
              overallScore >= 80 ? 'bg-green-600' : 
              overallScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'
            }`}
            style={{ width: `${overallScore}%` }}
          ></div>
        </div>
      </div>

      <div className="space-y-3">
        {auditResults.map((result, index) => (
          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${
                result.status === 'pass' ? 'bg-green-500' :
                result.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <div>
                <div className="font-semibold">{result.title}</div>
                <div className="text-sm text-gray-600">{result.message}</div>
              </div>
            </div>
            <div className="text-sm font-semibold">{result.score}/100</div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold mb-2">Recommendations:</h3>
        <ul className="text-sm space-y-1">
          {auditResults.filter(r => r.status !== 'pass').map((result, index) => (
            <li key={index} className="flex items-start space-x-2">
              <span className="text-red-500 mt-1">•</span>
              <span>Fix {result.title}: {result.message}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SEOAudit; 