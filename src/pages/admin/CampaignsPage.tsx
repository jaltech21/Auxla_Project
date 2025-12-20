import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Plus,
  Loader2,
  Edit,
  Trash2,
  Send,
  Eye,
  BarChart3,
} from 'lucide-react';
import { format } from 'date-fns';

interface Campaign {
  id: string;
  subject: string;
  preview_text: string | null;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed';
  scheduled_at: string | null;
  sent_at: string | null;
  total_recipients: number;
  total_sent: number;
  total_opened: number;
  total_clicked: number;
  created_at: string;
}

export default function CampaignsPage() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('newsletter_campaigns')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCampaigns(data || []);
    } catch (err: any) {
      console.error('Error loading campaigns:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    try {
      const { error } = await supabase
        .from('newsletter_campaigns')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setCampaigns(campaigns.filter(c => c.id !== deleteId));
      setDeleteId(null);
    } catch (err: any) {
      console.error('Error deleting campaign:', err);
    } finally {
      setDeleting(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      draft: 'secondary',
      scheduled: 'default',
      sending: 'default',
      sent: 'default',
      failed: 'destructive',
    };

    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  const getOpenRate = (campaign: Campaign) => {
    if (campaign.total_sent === 0) return '0%';
    return `${Math.round((campaign.total_opened / campaign.total_sent) * 100)}%`;
  };

  const getClickRate = (campaign: Campaign) => {
    if (campaign.total_sent === 0) return '0%';
    return `${Math.round((campaign.total_clicked / campaign.total_sent) * 100)}%`;
  };

  const stats = {
    total: campaigns.length,
    sent: campaigns.filter(c => c.status === 'sent').length,
    drafts: campaigns.filter(c => c.status === 'draft').length,
    scheduled: campaigns.filter(c => c.status === 'scheduled').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Newsletter Campaigns</h1>
          <p className="text-muted-foreground mt-1">
            Create and manage your email campaigns
          </p>
        </div>
        <Button onClick={() => navigate('/admin/newsletters/new')}>
          <Plus className="h-4 w-4 mr-2" />
          New Campaign
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Campaigns</div>
          <div className="text-2xl font-bold mt-1">{stats.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Sent</div>
          <div className="text-2xl font-bold mt-1 text-green-600">{stats.sent}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Drafts</div>
          <div className="text-2xl font-bold mt-1 text-gray-600">{stats.drafts}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Scheduled</div>
          <div className="text-2xl font-bold mt-1 text-blue-600">{stats.scheduled}</div>
        </Card>
      </div>

      {/* Campaigns Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Campaigns</CardTitle>
          <CardDescription>Manage your newsletter campaigns</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : campaigns.length === 0 ? (
            <div className="text-center p-12">
              <Send className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-semibold mb-2">No campaigns yet</h3>
              <p className="text-muted-foreground mb-4">
                Create your first newsletter campaign to get started
              </p>
              <Button onClick={() => navigate('/admin/newsletters/new')}>
                <Plus className="h-4 w-4 mr-2" />
                Create Campaign
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Subject</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Open Rate</TableHead>
                    <TableHead>Click Rate</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div>
                          <div className="font-medium">{campaign.subject}</div>
                          {campaign.preview_text && (
                            <div className="text-sm text-muted-foreground truncate max-w-md">
                              {campaign.preview_text}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <div>{campaign.total_sent} / {campaign.total_recipients}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Eye className="h-4 w-4 text-muted-foreground" />
                          <span>{getOpenRate(campaign)}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <BarChart3 className="h-4 w-4 text-muted-foreground" />
                          <span>{getClickRate(campaign)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {campaign.sent_at
                          ? format(new Date(campaign.sent_at), 'MMM d, yyyy')
                          : format(new Date(campaign.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          {campaign.status === 'draft' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/admin/newsletters/${campaign.id}/edit`)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {campaign.status === 'sent' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => navigate(`/admin/newsletters/${campaign.id}/stats`)}
                            >
                              <BarChart3 className="h-4 w-4" />
                            </Button>
                          )}
                          {campaign.status === 'draft' && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setDeleteId(campaign.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Campaign?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete this campaign. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
              {deleting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
