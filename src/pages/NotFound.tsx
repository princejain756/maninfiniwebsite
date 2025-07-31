import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Home, Search, Mail } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <>
      <SEO 
        title="404 - Page Not Found | Maninfini Automation"
        description="The page you're looking for doesn't exist. Explore our business automation services and digital transformation solutions."
        noindex={true}
        nofollow={true}
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 px-4">
        <Card className="w-full max-w-md text-center shadow-lg">
          <CardHeader>
            <div className="mx-auto mb-4 text-6xl font-bold text-gray-300">404</div>
            <CardTitle className="text-2xl font-bold text-gray-800">
              Page Not Found
            </CardTitle>
            <CardDescription className="text-gray-600">
              The page you're looking for doesn't exist or has been moved.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-500">
              You tried to access: <code className="bg-gray-100 px-2 py-1 rounded text-xs">{location.pathname}</code>
            </p>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <a href="/">
                  <Home className="mr-2 h-4 w-4" />
                  Return to Home
                </a>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <a href="/blog">
                  <Search className="mr-2 h-4 w-4" />
                  Browse Our Blog
                </a>
              </Button>
              
              <Button variant="outline" asChild className="w-full">
                <a href="/#contact">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Support
                </a>
              </Button>
            </div>
            
            <div className="pt-4 border-t">
              <p className="text-xs text-gray-400">
                Need help? Our automation experts are here to assist you.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default NotFound;
