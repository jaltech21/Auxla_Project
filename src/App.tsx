import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryProvider } from "@/lib/query-client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
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

// Admin Pages
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import PostsListPage from "./pages/admin/PostsListPage";
import PostEditorPage from "./pages/admin/PostEditorPage";
import MediaLibraryPage from "./pages/admin/MediaLibraryPage";
import CategoriesPage from "./pages/admin/CategoriesPage";
import TagsPage from "./pages/admin/TagsPage";
import AuthorsPage from "./pages/admin/AuthorsPage";
import SettingsPage from "./pages/admin/SettingsPage";
import SubscribersPage from "./pages/admin/SubscribersPage";
import CampaignsPage from "./pages/admin/CampaignsPage";
import NewsletterComposerPage from "./pages/admin/NewsletterComposerPage";
import DonationsPage from "./pages/admin/DonationsPage";
import DonorsPage from "./pages/admin/DonorsPage";

const App = () => (
  <ErrorBoundary>
    <HelmetProvider>
      <QueryProvider>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter basename="/Auxla_Project">
              <Routes>
                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLoginPage />} />
                <Route path="/admin" element={<ProtectedRoute />}>
                  <Route element={<AdminLayout />}>
                    <Route index element={<AdminDashboardPage />} />
                    <Route path="posts" element={<PostsListPage />} />
                    <Route path="posts/new" element={<PostEditorPage />} />
                    <Route path="posts/:id/edit" element={<PostEditorPage />} />
                    <Route path="media" element={<MediaLibraryPage />} />
                    <Route path="categories" element={<CategoriesPage />} />
                    <Route path="tags" element={<TagsPage />} />
                    <Route path="authors" element={<AuthorsPage />} />
                    <Route path="settings" element={<SettingsPage />} />
                    <Route path="newsletters" element={<CampaignsPage />} />
                    <Route path="newsletters/new" element={<NewsletterComposerPage />} />
                    <Route path="newsletters/:id/edit" element={<NewsletterComposerPage />} />
                    <Route path="subscribers" element={<SubscribersPage />} />
                    <Route path="donations" element={<DonationsPage />} />
                    <Route path="donors" element={<DonorsPage />} />
                  </Route>
                </Route>

                {/* Public Routes */}
                <Route path="/*" element={
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
                } />
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryProvider>
    </HelmetProvider>
  </ErrorBoundary>
);

export default App;
