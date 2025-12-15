import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/lib/query-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

// Pages
import HomePage from "./pages/HomePage";
import ServicesPage from "./pages/ServicesPage";
import ServiceDetailPage from "./pages/ServiceDetailPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import AuthorPage from "./pages/AuthorPage";
import AboutPage from "./pages/AboutPage";
import DonatePage from "./pages/DonatePage";
import DonationPage from "./pages/DonationPage";
import DonationSuccessPage from "./pages/DonationSuccessPage";
import ContactPage from "./pages/ContactPage";
import ContactSuccessPage from "./pages/ContactSuccessPage";
import SupportFinderPage from "./pages/SupportFinderPage";
import ConfirmSubscriptionPage from "./pages/ConfirmSubscriptionPage";
import UnsubscribePage from "./pages/UnsubscribePage";
import PreferencesPage from "./pages/PreferencesPage";
import NotFound from "./pages/NotFound";

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <div className="min-h-screen bg-background flex flex-col">
              <Header />
              <main className="flex-1">
                <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/services/:id" element={<ServiceDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:slug" element={<BlogDetailPage />} />
                <Route path="/blog/author/:authorId" element={<AuthorPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/donate" element={<DonationPage />} />
                <Route path="/donation/success" element={<DonationSuccessPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/contact/success" element={<ContactSuccessPage />} />
                <Route path="/support-finder" element={<SupportFinderPage />} />
                <Route path="/newsletter/confirm" element={<ConfirmSubscriptionPage />} />
                <Route path="/newsletter/unsubscribe" element={<UnsubscribePage />} />
                <Route path="/newsletter/preferences" element={<PreferencesPage />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
