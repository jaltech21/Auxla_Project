import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, Send, ArrowLeft, Eye } from 'lucide-react';

export default function NewsletterComposerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditMode = !!id;

  const [subject, setSubject] = useState('');
  const [previewText, setPreviewText] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditMode);
  const [sending, setSending] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadSubscriberCount();
    if (isEditMode && id) {
      loadCampaign(id);
    }
  }, [id, isEditMode]);

  const loadSubscriberCount = async () => {
    try {
      const { count } = await supabase
        .from('subscribers')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'active');

      setSubscriberCount(count || 0);
    } catch (err) {
      console.error('Error loading subscriber count:', err);
    }
  };

  const loadCampaign = async (campaignId: string) => {
    setLoadingData(true);
    try {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .eq('id', campaignId)
        .single();

      if (error) throw error;

      if (data) {
        setSubject(data.subject);
        setPreviewText(data.preview_text || '');
        setContent(data.content);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load campaign');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSave = async () => {
    if (!subject.trim() || !content.trim()) {
      setError('Subject and content are required');
      return;
    }

    if (!user) {
      setError('User not authenticated');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const campaignData = {
        subject,
        preview_text: previewText || null,
        content,
        status: 'draft',
        total_recipients: subscriberCount,
        created_by: user.id,
      };

      if (isEditMode) {
        const { error: updateError } = await supabase
          .from('newsletter_campaigns')
          .update(campaignData)
          .eq('id', id);

        if (updateError) throw updateError;
        setSuccess('Campaign updated successfully');
      } else {
        const { data: newCampaign, error: insertError } = await supabase
          .from('newsletter_campaigns')
          .insert([campaignData])
          .select()
          .single();

        if (insertError) throw insertError;
        setSuccess('Campaign created successfully');
        setTimeout(() => navigate(`/admin/newsletters/${newCampaign.id}/edit`), 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save campaign');
    } finally {
      setLoading(false);
    }
  };

  const handleSend = async () => {
    if (!subject.trim() || !content.trim()) {
      setError('Subject and content are required');
      return;
    }

    if (subscriberCount === 0) {
      setError('No active subscribers to send to');
      return;
    }

    setSending(true);
    setError('');

    try {
      // First save as draft if not already saved
      if (!isEditMode) {
        await handleSave();
      }

      // Update status to sending
      const { error: updateError } = await supabase
        .from('newsletter_campaigns')
        .update({ status: 'sending' })
        .eq('id', id);

      if (updateError) throw updateError;

      // Call backend API to send emails
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:3000'}/api/newsletter/send`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          campaignId: id,
          subject,
          content,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to send newsletter');
      }

      setSuccess('Newsletter is being sent! This may take a few minutes.');
      setTimeout(() => navigate('/admin/newsletters'), 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to send newsletter');
      // Revert status back to draft
      if (id) {
        await supabase
          .from('newsletter_campaigns')
          .update({ status: 'draft' })
          .eq('id', id);
      }
    } finally {
      setSending(false);
    }
  };

  if (loadingData) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/admin/newsletters')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Campaigns
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditMode ? 'Edit Campaign' : 'New Campaign'}
          </h1>
        </div>
        <Badge variant="secondary">
          {subscriberCount} active subscribers
        </Badge>
      </div>

      {/* Alerts */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Campaign Content</CardTitle>
              <CardDescription>
                Compose your newsletter email
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="subject">Subject Line *</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Enter email subject..."
                  className="text-lg"
                />
              </div>

              <div>
                <Label htmlFor="previewText">Preview Text</Label>
                <Textarea
                  id="previewText"
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="Brief preview text shown in email inbox..."
                  rows={2}
                  maxLength={150}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {previewText.length}/150 characters
                </p>
              </div>

              <div>
                <Label>Email Content *</Label>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Write your newsletter content..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleSave}
                disabled={loading || sending}
                variant="outline"
                className="w-full"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                Save Draft
              </Button>

              <Button
                onClick={handleSend}
                disabled={loading || sending || !isEditMode}
                className="w-full"
              >
                {sending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Now
                  </>
                )}
              </Button>

              {!isEditMode && (
                <p className="text-xs text-muted-foreground text-center">
                  Save as draft first before sending
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Keep subject lines under 50 characters</p>
              <p>• Use preview text to entice readers</p>
              <p>• Include a clear call-to-action</p>
              <p>• Test your content before sending</p>
              <p>• Personalize when possible</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Delivery Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Active Subscribers:</span>
                <span className="font-medium">{subscriberCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Time:</span>
                <span className="font-medium">
                  {Math.ceil(subscriberCount / 100)} min
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
