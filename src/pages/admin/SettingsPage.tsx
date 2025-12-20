import { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Settings,
  Loader2,
  CheckCircle,
  Globe,
  Mail,
  Share2,
  Info,
  Upload,
  X,
} from 'lucide-react';

interface SiteSettings {
  site_name: string;
  site_description: string;
  site_url: string;
  contact_email: string;
  social_twitter: string;
  social_facebook: string;
  social_instagram: string;
  social_linkedin: string;
  logo_url: string;
  favicon_url: string;
  ga_tracking_id: string;
  meta_keywords: string;
}

export default function SettingsPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<'logo' | 'favicon' | null>(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const logoInputRef = useRef<HTMLInputElement>(null);
  const faviconInputRef = useRef<HTMLInputElement>(null);

  const [settings, setSettings] = useState<SiteSettings>({
    site_name: 'OCSLAA Mental Health Blog',
    site_description: 'Resources and insights on mental health and wellness',
    site_url: 'https://ocslaa.org',
    contact_email: 'contact@ocslaa.org',
    social_twitter: '',
    social_facebook: '',
    social_instagram: '',
    social_linkedin: '',
    logo_url: '',
    favicon_url: '',
    ga_tracking_id: '',
    meta_keywords: 'mental health, wellness, therapy, counseling',
  });

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setLoading(true);
    try {
      // In a real implementation, you would fetch from a settings table
      // For now, we'll use localStorage or environment variables
      const savedSettings = localStorage.getItem('site_settings');
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (err: any) {
      console.error('Error loading settings:', err);
      setError('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      // In a real implementation, you would save to a database table
      // For now, we'll use localStorage
      localStorage.setItem('site_settings', JSON.stringify(settings));
      
      setSuccess('Settings saved successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error saving settings:', err);
      setError(err.message || 'Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  const updateSetting = (key: keyof SiteSettings, value: string) => {
    setSettings({ ...settings, [key]: value });
  };

  const handleFileUpload = async (file: File, type: 'logo' | 'favicon') => {
    if (!user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(type);
    setError('');

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${type}-${Date.now()}.${fileExt}`;
      const filePath = `blog-images/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      // Update settings
      const key = type === 'logo' ? 'logo_url' : 'favicon_url';
      updateSetting(key, publicUrl);

      setSuccess(`${type === 'logo' ? 'Logo' : 'Favicon'} uploaded successfully`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error(`Error uploading ${type}:`, err);
      setError(err.message || `Failed to upload ${type}`);
    } finally {
      setUploading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Settings</h1>
        <p className="text-muted-foreground">
          Manage your site configuration and preferences
        </p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList>
          <TabsTrigger value="general">
            <Info className="h-4 w-4 mr-2" />
            General
          </TabsTrigger>
          <TabsTrigger value="contact">
            <Mail className="h-4 w-4 mr-2" />
            Contact
          </TabsTrigger>
          <TabsTrigger value="social">
            <Share2 className="h-4 w-4 mr-2" />
            Social Media
          </TabsTrigger>
          <TabsTrigger value="seo">
            <Globe className="h-4 w-4 mr-2" />
            SEO
          </TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Site Information</CardTitle>
              <CardDescription>
                Basic information about your website
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="site_name">Site Name</Label>
                <Input
                  id="site_name"
                  value={settings.site_name}
                  onChange={(e) => updateSetting('site_name', e.target.value)}
                  placeholder="Your site name"
                />
              </div>

              <div>
                <Label htmlFor="site_description">Site Description</Label>
                <Textarea
                  id="site_description"
                  value={settings.site_description}
                  onChange={(e) => updateSetting('site_description', e.target.value)}
                  placeholder="A brief description of your site"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="site_url">Site URL</Label>
                <Input
                  id="site_url"
                  value={settings.site_url}
                  onChange={(e) => updateSetting('site_url', e.target.value)}
                  placeholder="https://example.com"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Branding</CardTitle>
              <CardDescription>
                Upload your logo and favicon
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="logo_url">Logo</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="logo_url"
                      value={settings.logo_url}
                      onChange={(e) => updateSetting('logo_url', e.target.value)}
                      placeholder="https://example.com/logo.png or upload below"
                    />
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'logo');
                        e.target.value = '';
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => logoInputRef.current?.click()}
                      disabled={uploading === 'logo'}
                    >
                      {uploading === 'logo' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </>
                      )}
                    </Button>
                  </div>
                  {settings.logo_url && (
                    <div className="relative inline-block">
                      <img
                        src={settings.logo_url}
                        alt="Logo preview"
                        className="h-12 object-contain border rounded p-2"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => updateSetting('logo_url', '')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="favicon_url">Favicon</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      id="favicon_url"
                      value={settings.favicon_url}
                      onChange={(e) => updateSetting('favicon_url', e.target.value)}
                      placeholder="https://example.com/favicon.ico or upload below"
                    />
                    <input
                      ref={faviconInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileUpload(file, 'favicon');
                        e.target.value = '';
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => faviconInputRef.current?.click()}
                      disabled={uploading === 'favicon'}
                    >
                      {uploading === 'favicon' ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading...
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </>
                      )}
                    </Button>
                  </div>
                  {settings.favicon_url && (
                    <div className="relative inline-block">
                      <img
                        src={settings.favicon_url}
                        alt="Favicon preview"
                        className="h-8 w-8 object-contain border rounded"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={() => updateSetting('favicon_url', '')}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Settings */}
        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Contact Information</CardTitle>
              <CardDescription>
                How users can reach you
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="contact_email">Contact Email</Label>
                <Input
                  id="contact_email"
                  type="email"
                  value={settings.contact_email}
                  onChange={(e) => updateSetting('contact_email', e.target.value)}
                  placeholder="contact@example.com"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Settings */}
        <TabsContent value="social" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Social Media Links</CardTitle>
              <CardDescription>
                Connect your social media profiles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="social_twitter">Twitter</Label>
                <Input
                  id="social_twitter"
                  value={settings.social_twitter}
                  onChange={(e) => updateSetting('social_twitter', e.target.value)}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>

              <div>
                <Label htmlFor="social_facebook">Facebook</Label>
                <Input
                  id="social_facebook"
                  value={settings.social_facebook}
                  onChange={(e) => updateSetting('social_facebook', e.target.value)}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>

              <div>
                <Label htmlFor="social_instagram">Instagram</Label>
                <Input
                  id="social_instagram"
                  value={settings.social_instagram}
                  onChange={(e) => updateSetting('social_instagram', e.target.value)}
                  placeholder="https://instagram.com/yourusername"
                />
              </div>

              <div>
                <Label htmlFor="social_linkedin">LinkedIn</Label>
                <Input
                  id="social_linkedin"
                  value={settings.social_linkedin}
                  onChange={(e) => updateSetting('social_linkedin', e.target.value)}
                  placeholder="https://linkedin.com/company/yourcompany"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Settings */}
        <TabsContent value="seo" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Engine Optimization</CardTitle>
              <CardDescription>
                Improve your site's visibility in search engines
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="meta_keywords">Meta Keywords</Label>
                <Textarea
                  id="meta_keywords"
                  value={settings.meta_keywords}
                  onChange={(e) => updateSetting('meta_keywords', e.target.value)}
                  placeholder="mental health, wellness, therapy"
                  rows={2}
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Comma-separated keywords describing your site
                </p>
              </div>

              <div>
                <Label htmlFor="ga_tracking_id">Google Analytics Tracking ID</Label>
                <Input
                  id="ga_tracking_id"
                  value={settings.ga_tracking_id}
                  onChange={(e) => updateSetting('ga_tracking_id', e.target.value)}
                  placeholder="G-XXXXXXXXXX"
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Your Google Analytics measurement ID
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Save Button */}
      <div className="flex justify-end gap-4 sticky bottom-4 bg-background/80 backdrop-blur-sm py-4 border-t">
        <Button onClick={handleSave} disabled={saving} size="lg">
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <CheckCircle className="mr-2 h-4 w-4" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
