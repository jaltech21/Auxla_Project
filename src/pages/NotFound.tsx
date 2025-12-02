import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, Search, ArrowLeft, Heart } from "lucide-react";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full text-center">
        <CardHeader>
          <div className="mx-auto mb-4 p-4 bg-primary-light rounded-full w-fit">
            <Search className="h-12 w-12 text-primary" />
          </div>
          <CardTitle className="text-6xl font-bold text-primary mb-4">404</CardTitle>
          <CardTitle className="text-2xl">Page Not Found</CardTitle>
          <CardDescription className="text-lg">
            The page you're looking for doesn't exist or has been moved.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button variant="default" size="lg" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                Go Home
              </Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link to="/resources">
                <Heart className="h-4 w-4 mr-2" />
                View Resources
              </Link>
            </Button>
          </div>

          <div className="pt-6 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              Need immediate support?
            </p>
            <a
              href="tel:988"
              className="text-primary hover:underline font-medium"
            >
              Call 988 for Crisis Support (24/7)
            </a>
          </div>

          <div className="pt-4">
            <Button variant="link" asChild>
              <Link to="/" className="text-muted-foreground">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to previous page
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
