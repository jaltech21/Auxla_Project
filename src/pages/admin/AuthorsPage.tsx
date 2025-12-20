import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import {
  Users,
  Search,
  Loader2,
  Edit,
  CheckCircle,
  XCircle,
  Mail,
  Linkedin,
  Twitter,
  Globe,
} from 'lucide-react';
import { format } from 'date-fns';

interface Author {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  credentials: string | null;
  social_links: {
    twitter?: string;
    linkedin?: string;
    website?: string;
  } | null;
  is_active: boolean;
  created_at: string;
  post_count?: number;
}

export default function AuthorsPage() {
  const { author: currentAuthor } = useAuth();
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingAuthor, setEditingAuthor] = useState<Author | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    bio: '',
    avatar_url: '',
    email: '',
    credentials: '',
    is_active: true,
    social_links: {
      twitter: '',
      linkedin: '',
      website: '',
    },
  });

  useEffect(() => {
    loadAuthors();
  }, []);

  const loadAuthors = async () => {
    setLoading(true);
    try {
      // Fetch authors with post count
      const { data, error } = await supabase
        .from('authors')
        .select(`
          *,
          blog_posts(count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;

      const authorsWithCount = data?.map(author => ({
        ...author,
        post_count: author.blog_posts?.[0]?.count || 0,
        blog_posts: undefined,
      })) || [];

      setAuthors(authorsWithCount);
    } catch (err: any) {
      console.error('Error loading authors:', err);
      setError('Failed to load authors');
    } finally {
      setLoading(false);
    }
  };

  const openEditDialog = (author: Author) => {
    setEditingAuthor(author);
    setFormData({
      name: author.name,
      title: author.title || '',
      bio: author.bio || '',
      avatar_url: author.avatar_url || '',
      email: author.email || '',
      credentials: author.credentials || '',
      is_active: author.is_active,
      social_links: {
        twitter: author.social_links?.twitter || '',
        linkedin: author.social_links?.linkedin || '',
        website: author.social_links?.website || '',
      },
    });
    setError('');
    setSuccess('');
  };

  const closeDialog = () => {
    setEditingAuthor(null);
    setFormData({
      name: '',
      title: '',
      bio: '',
      avatar_url: '',
      email: '',
      credentials: '',
      is_active: true,
      social_links: {
        twitter: '',
        linkedin: '',
        website: '',
      },
    });
    setError('');
    setSuccess('');
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleSave = async () => {
    if (!editingAuthor) return;

    if (!formData.name.trim()) {
      setError('Name is required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const slug = generateSlug(formData.name);

      // Check if slug already exists (excluding current author)
      const { data: existingAuthor } = await supabase
        .from('authors')
        .select('id')
        .eq('slug', slug)
        .neq('id', editingAuthor.id)
        .single();

      if (existingAuthor) {
        setError('An author with this name already exists');
        setSaving(false);
        return;
      }

      // Clean social links (remove empty values)
      const cleanSocialLinks = {
        ...(formData.social_links.twitter && { twitter: formData.social_links.twitter }),
        ...(formData.social_links.linkedin && { linkedin: formData.social_links.linkedin }),
        ...(formData.social_links.website && { website: formData.social_links.website }),
      };

      const { error: updateError } = await supabase
        .from('authors')
        .update({
          name: formData.name,
          slug,
          title: formData.title || null,
          bio: formData.bio || null,
          avatar_url: formData.avatar_url || null,
          email: formData.email || null,
          credentials: formData.credentials || null,
          is_active: formData.is_active,
          social_links: Object.keys(cleanSocialLinks).length > 0 ? cleanSocialLinks : null,
        })
        .eq('id', editingAuthor.id);

      if (updateError) throw updateError;

      setSuccess('Author updated successfully');
      await loadAuthors();
      setTimeout(() => {
        closeDialog();
      }, 1000);
    } catch (err: any) {
      console.error('Error updating author:', err);
      setError(err.message || 'Failed to update author');
    } finally {
      setSaving(false);
    }
  };

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    author.email?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalAuthors = authors.length;
  const activeAuthors = authors.filter(a => a.is_active).length;
  const totalPosts = authors.reduce((sum, a) => sum + (a.post_count || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold mb-2">Authors</h1>
        <p className="text-muted-foreground">
          Manage author profiles and permissions
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Authors</CardDescription>
            <CardTitle className="text-3xl">{totalAuthors}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Authors</CardDescription>
            <CardTitle className="text-3xl">{activeAuthors}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Posts</CardDescription>
            <CardTitle className="text-3xl">{totalPosts}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Search */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : filteredAuthors.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium mb-2">No authors found</p>
              <p className="text-sm">
                {searchQuery ? 'Try adjusting your search' : 'Authors will appear here'}
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Author</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Posts</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAuthors.map((author) => (
                    <TableRow key={author.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          {author.avatar_url ? (
                            <img
                              src={author.avatar_url}
                              alt={author.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <Users className="h-5 w-5 text-primary" />
                            </div>
                          )}
                          <div>
                            <div className="font-medium">{author.name}</div>
                            {author.id === currentAuthor?.id && (
                              <Badge variant="secondary" className="text-xs">
                                You
                              </Badge>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          {author.email && (
                            <>
                              <Mail className="h-3 w-3" />
                              {author.email}
                            </>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {author.title || '-'}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">
                          {author.post_count || 0}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {author.is_active ? (
                          <Badge variant="default" className="gap-1">
                            <CheckCircle className="h-3 w-3" />
                            Active
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="gap-1">
                            <XCircle className="h-3 w-3" />
                            Inactive
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-sm text-muted-foreground">
                        {format(new Date(author.created_at), 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditDialog(author)}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={!!editingAuthor} onOpenChange={(open) => !open && closeDialog()}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Author Profile</DialogTitle>
            <DialogDescription>
              Update author information and settings
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
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

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Full name"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g., Senior Writer, Clinical Psychologist"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  placeholder="Brief bio about the author..."
                  rows={3}
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="credentials">Credentials</Label>
                <Input
                  id="credentials"
                  value={formData.credentials}
                  onChange={(e) => setFormData({ ...formData, credentials: e.target.value })}
                  placeholder="e.g., PhD, LCSW, MD"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="avatar_url">Avatar URL</Label>
                <Input
                  id="avatar_url"
                  value={formData.avatar_url}
                  onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })}
                  placeholder="https://example.com/avatar.jpg"
                />
                {formData.avatar_url && (
                  <div className="mt-2">
                    <img
                      src={formData.avatar_url}
                      alt="Avatar preview"
                      className="w-20 h-20 rounded-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  </div>
                )}
              </div>

              <div className="col-span-2">
                <Label className="text-base font-semibold">Social Links</Label>
              </div>

              <div className="col-span-2">
                <Label htmlFor="twitter" className="flex items-center gap-2">
                  <Twitter className="h-4 w-4" />
                  Twitter
                </Label>
                <Input
                  id="twitter"
                  value={formData.social_links.twitter}
                  onChange={(e) => setFormData({
                    ...formData,
                    social_links: { ...formData.social_links, twitter: e.target.value }
                  })}
                  placeholder="https://twitter.com/username"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="linkedin" className="flex items-center gap-2">
                  <Linkedin className="h-4 w-4" />
                  LinkedIn
                </Label>
                <Input
                  id="linkedin"
                  value={formData.social_links.linkedin}
                  onChange={(e) => setFormData({
                    ...formData,
                    social_links: { ...formData.social_links, linkedin: e.target.value }
                  })}
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div className="col-span-2">
                <Label htmlFor="website" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  Website
                </Label>
                <Input
                  id="website"
                  value={formData.social_links.website}
                  onChange={(e) => setFormData({
                    ...formData,
                    social_links: { ...formData.social_links, website: e.target.value }
                  })}
                  placeholder="https://example.com"
                />
              </div>

              <div className="col-span-2 flex items-center space-x-2">
                <Switch
                  id="is_active"
                  checked={formData.is_active}
                  onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
                />
                <Label htmlFor="is_active">Active (can publish posts)</Label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={closeDialog} disabled={saving}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save Changes'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
