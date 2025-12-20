import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Search, Download, Mail, DollarSign } from 'lucide-react';
import { format } from 'date-fns';
import { toast } from '@/hooks/use-toast';

interface Donor {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  total_donated: number;
  donation_count: number;
  first_donation_at: string;
  last_donation_at: string;
  is_subscriber: boolean;
  created_at: string;
}

export default function DonorsPage() {
  const [donors, setDonors] = useState<Donor[]>([]);
  const [filteredDonors, setFilteredDonors] = useState<Donor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDonors();
  }, []);

  useEffect(() => {
    filterDonors();
  }, [donors, searchTerm]);

  const fetchDonors = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('donors')
        .select('*')
        .order('total_donated', { ascending: false });

      if (error) throw error;

      setDonors(data || []);
    } catch (error: any) {
      console.error('Error fetching donors:', error);
      toast({
        title: 'Error',
        description: 'Failed to load donors',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const filterDonors = () => {
    if (!searchTerm) {
      setFilteredDonors(donors);
      return;
    }

    const filtered = donors.filter(
      (donor) =>
        donor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.first_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donor.last_name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredDonors(filtered);
  };

  const exportToCSV = () => {
    const headers = ['Name', 'Email', 'Phone', 'Total Donated', 'Donation Count', 'First Donation', 'Last Donation', 'Newsletter Subscriber'];
    const rows = filteredDonors.map((d) => [
      `${d.first_name} ${d.last_name}`,
      d.email,
      d.phone || '',
      d.total_donated,
      d.donation_count,
      d.first_donation_at ? format(new Date(d.first_donation_at), 'yyyy-MM-dd') : '',
      d.last_donation_at ? format(new Date(d.last_donation_at), 'yyyy-MM-dd') : '',
      d.is_subscriber ? 'Yes' : 'No',
    ]);

    const csv = [headers, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `donors-${format(new Date(), 'yyyy-MM-dd')}.csv`;
    a.click();
  };

  const totalDonations = donors.reduce((sum, d) => sum + parseFloat(d.total_donated.toString()), 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading donors...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Donors</h1>
        <p className="text-muted-foreground">View and manage donor information</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Donors</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{donors.length}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Raised</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalDonations.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From all donors</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Newsletter Subscribers</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {donors.filter((d) => d.is_subscriber).length}
            </div>
            <p className="text-xs text-muted-foreground">Also subscribed</p>
          </CardContent>
        </Card>
      </div>

      {/* Donors Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex-1 w-full sm:w-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Button variant="outline" onClick={exportToCSV}>
              <Download className="mr-2 h-4 w-4" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Total Donated</TableHead>
                  <TableHead>Donations</TableHead>
                  <TableHead>First Donation</TableHead>
                  <TableHead>Last Donation</TableHead>
                  <TableHead>Newsletter</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDonors.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                      No donors found
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDonors.map((donor) => (
                    <TableRow key={donor.id}>
                      <TableCell className="font-medium">
                        {donor.first_name} {donor.last_name}
                      </TableCell>
                      <TableCell>{donor.email}</TableCell>
                      <TableCell>{donor.phone || '-'}</TableCell>
                      <TableCell className="font-mono font-medium">
                        ${parseFloat(donor.total_donated.toString()).toFixed(2)}
                      </TableCell>
                      <TableCell>{donor.donation_count}</TableCell>
                      <TableCell>
                        {donor.first_donation_at
                          ? format(new Date(donor.first_donation_at), 'MMM dd, yyyy')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {donor.last_donation_at
                          ? format(new Date(donor.last_donation_at), 'MMM dd, yyyy')
                          : '-'}
                      </TableCell>
                      <TableCell>
                        {donor.is_subscriber ? (
                          <span className="text-green-600">✓</span>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
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
