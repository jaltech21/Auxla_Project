import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Users, Calendar, Search, Download } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface Donation {
  id: string;
  amount: number;
  currency: string;
  payment_status: string;
  payment_method: string;
  designation: string;
  is_anonymous: boolean;
  message: string;
  created_at: string;
  processed_at: string;
  donor_id: string;
  donors?: {
    first_name: string;
    last_name: string;
    email: string;
  };
}

export default function DonationsPage() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [filteredDonations, setFilteredDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [stats, setStats] = useState({
    totalAmount: 0,
    donationCount: 0,
    averageDonation: 0,
    thisMonth: 0,
  });

  useEffect(() => {
    fetchDonations();
  }, []);

  useEffect(() => {
    filterDonations();
  }, [donations, searchTerm, statusFilter]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('donations')
        .select(`
          *,
          donors (
            first_name,
            last_name,
            email
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setDonations(data || []);
      calculateStats(data || []);
    } catch (error: any) {
      console.error('Error fetching donations:', error);
      toast({
        title: 'Error',
        description: 'Failed to load donations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (donations: Donation[]) => {
    const completed = donations.filter((d) => d.payment_status === 'completed');
    const totalAmount = completed.reduce((sum, d) => sum + parseFloat(d.amount.toString()), 0);
    const donationCount = completed.length;
    const averageDonation = donationCount > 0 ? totalAmount / donationCount : 0;

    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const thisMonth = completed
      .filter((d) => new Date(d.created_at) >= thisMonthStart)
      .reduce((sum, d) => sum + parseFloat(d.amount.toString()), 0);

    setStats({ totalAmount, donationCount, averageDonation, thisMonth });
  };

  const filterDonations = () => {
    let filtered = [...donations];

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter((d) => d.payment_status === statusFilter);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (d) =>
          d.donors?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.donors?.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.donors?.last_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          d.designation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredDonations(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Date', 'Donor Name', 'Email', 'Amount', 'Status', 'Designation', 'Payment Method'];
    const rows = filteredDonations.map((d) => [
      format(new Date(d.created_at), 'yyyy-MM-dd HH:mm'),
      d.is_anonymous ? 'Anonymous' : `${d.donors?.first_name || ''} ${d.donors?.last_name || ''}`,
      d.is_anonymous ? '' : d.donors?.email || '',
      `${d.currency} ${d.amount}`,
      d.payment_status,
      d.designation || 'general',
      d.payment_method || 'card',
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donations-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive'> = {
      completed: 'default',
      pending: 'secondary',
      failed: 'destructive',
      refunded: 'destructive',
    };
    return <Badge variant={variants[status] || 'secondary'}>{status}</Badge>;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading donations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Donations</h1>
        <p className="text-muted-foreground">Manage and track all donation transactions</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donations</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalAmount.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Month</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.thisMonth.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              {format(new Date(), 'MMMM yyyy')}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.donationCount}</div>
            <p className="text-xs text-muted-foreground">Completed donations</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Donation</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.averageDonation.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Per donation</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by donor name, email, or designation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" onClick={exportToCSV}>
                <Download className="mr-2 h-4 w-4" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Donor</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Designation</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Message</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                      No donations found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDonations.map((donation) => (
                    <TableRow key={donation.id}>
                      <TableCell className="whitespace-nowrap">
                        {format(new Date(donation.created_at), 'MMM dd, yyyy HH:mm')}
                      </TableCell>
                      <TableCell>
                        {donation.is_anonymous ? (
                          <span className="text-muted-foreground italic">Anonymous</span>
                        ) : (
                          <div>
                            <div className="font-medium">
                              {donation.donors?.first_name} {donation.donors?.last_name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {donation.donors?.email}
                            </div>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="font-mono font-medium">
                        {donation.currency} ${parseFloat(donation.amount.toString()).toFixed(2)}
                      </TableCell>
                      <TableCell>{getStatusBadge(donation.payment_status)}</TableCell>
                      <TableCell className="capitalize">
                        {donation.designation?.replace(/-/g, ' ') || 'General'}
                      </TableCell>
                      <TableCell className="capitalize">{donation.payment_method || 'Card'}</TableCell>
                      <TableCell className="max-w-xs truncate">
                        {donation.message || '-'}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
