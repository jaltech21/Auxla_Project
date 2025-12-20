import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
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
  Search,
  Loader2,
  UserX,
  Download,
  Mail,
} from 'lucide-react';
import { format } from 'date-fns';

interface Subscriber {
  id: string;
  email: string;
  name: string | null;
  status: 'active' | 'unsubscribed' | 'bounced';
  subscribed_at: string;
  unsubscribed_at: string | null;
  email_count: number;
  last_email_sent_at: string | null;
  preferences: {
    frequency?: string;
    topics?: string[];
  };
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [unsubscribeId, setUnsubscribeId] = useState<string | null>(null);
  const [unsubscribing, setUnsubscribing] = useState(false);

  useEffect(() => {
    loadSubscribers();
  }, [statusFilter]);

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      let query = supabase
        .from('subscribers')
        .select('*')
        .order('subscribed_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setSubscribers(data || []);
    } catch (err: any) {
      console.error('Error loading subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleUnsubscribe = async () => {
    if (!unsubscribeId) return;

    setUnsubscribing(true);
    try {
      const { error } = await supabase
        .from('subscribers')
        .update({
          status: 'unsubscribed',
          unsubscribed_at: new Date().toISOString(),
        })
        .eq('id', unsubscribeId);

      if (error) throw error;

      setSubscribers(subscribers.map(s =>
        s.id === unsubscribeId
          ? { ...s, status: 'unsubscribed', unsubscribed_at: new Date().toISOString() }
          : s
      ));
      setUnsubscribeId(null);
    } catch (err: any) {
      console.error('Error unsubscribing:', err);
    } finally {
      setUnsubscribing(false);
    }
  };

  const exportSubscribers = () => {
    const csv = [
      ['Email', 'Name', 'Status', 'Subscribed Date', 'Emails Received'].join(','),
      ...filteredSubscribers.map(s => [
        s.email,
        s.name || '',
        s.status,
        format(new Date(s.subscribed_at), 'yyyy-MM-dd'),
        s.email_count
      ].join(','))
    ].join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `subscribers-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredSubscribers = subscribers.filter(subscriber =>
    subscriber.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    subscriber.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = {
    total: subscribers.length,
    active: subscribers.filter(s => s.status === 'active').length,
    unsubscribed: subscribers.filter(s => s.status === 'unsubscribed').length,
    bounced: subscribers.filter(s => s.status === 'bounced').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Newsletter Subscribers</h1>
          <p className="text-muted-foreground mt-1">
            Manage your email subscribers and mailing list
          </p>
        </div>
        <Button onClick={exportSubscribers} variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Export CSV
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Subscribers</div>
          <div className="text-2xl font-bold mt-1">{stats.total}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Active</div>
          <div className="text-2xl font-bold mt-1 text-green-600">{stats.active}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Unsubscribed</div>
          <div className="text-2xl font-bold mt-1 text-gray-600">{stats.unsubscribed}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Bounced</div>
          <div className="text-2xl font-bold mt-1 text-red-600">{stats.bounced}</div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by email or name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subscribers</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
                <SelectItem value="bounced">Bounced</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center p-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredSubscribers.length === 0 ? (
            <div className="text-center p-12">
              <Mail className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <h3 className="text-lg font-semibold mb-2">No subscribers found</h3>
              <p className="text-muted-foreground">
                {searchQuery
                  ? 'Try adjusting your search criteria'
                  : 'Subscribers will appear here as people sign up'}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Email</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Subscribed</TableHead>
                    <TableHead>Emails Received</TableHead>
                    <TableHead>Last Email</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredSubscribers.map((subscriber) => (
                    <TableRow key={subscriber.id}>
                      <TableCell className="font-medium">{subscriber.email}</TableCell>
                      <TableCell>{subscriber.name || '-'}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            subscriber.status === 'active'
                              ? 'default'
                              : subscriber.status === 'bounced'
                              ? 'destructive'
                              : 'secondary'
                          }
                        >
                          {subscriber.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(subscriber.subscribed_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{subscriber.email_count}</Badge>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {subscriber.last_email_sent_at
                          ? format(new Date(subscriber.last_email_sent_at), 'MMM d, yyyy')
                          : 'Never'}
                      </TableCell>
                      <TableCell className="text-right">
                        {subscriber.status === 'active' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setUnsubscribeId(subscriber.id)}
                          >
                            <UserX className="h-4 w-4 mr-1" />
                            Unsubscribe
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Unsubscribe Confirmation Dialog */}
      <AlertDialog open={!!unsubscribeId} onOpenChange={() => setUnsubscribeId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Unsubscribe Subscriber?</AlertDialogTitle>
            <AlertDialogDescription>
              This will mark the subscriber as unsubscribed. They won't receive any more newsletters
              unless they re-subscribe.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={unsubscribing}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUnsubscribe} disabled={unsubscribing}>
              {unsubscribing ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Unsubscribing...
                </>
              ) : (
                'Unsubscribe'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
