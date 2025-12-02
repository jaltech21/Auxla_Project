import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ErrorFallbackProps {
  error: Error | null;
  onReset?: () => void;
}

export const ErrorFallback = ({ error, onReset }: ErrorFallbackProps) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
    onReset?.();
  };

  const handleRetry = () => {
    onReset?.();
    window.location.reload();
  };

  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-destructive/10 rounded-full w-fit">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
          <CardTitle className="text-2xl">Something went wrong</CardTitle>
          <CardDescription>
            We're sorry for the inconvenience. An unexpected error has occurred.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {isDevelopment && error && (
            <div className="p-4 bg-muted rounded-lg">
              <h3 className="font-semibold mb-2 text-sm text-muted-foreground">
                Error Details (Development Only):
              </h3>
              <pre className="text-xs overflow-auto max-h-48 text-destructive">
                {error.message}
                {error.stack && `\n\n${error.stack}`}
              </pre>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="default"
              className="flex-1"
              onClick={handleRetry}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleGoHome}
            >
              <Home className="h-4 w-4 mr-2" />
              Go Home
            </Button>
          </div>

          <div className="text-center pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-2">
              Need immediate support?
            </p>
            <a
              href="tel:988"
              className="text-primary hover:underline font-medium"
            >
              Call 988 for Crisis Support
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
