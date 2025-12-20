import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Plus, Edit, Trash2, Loader2, Tag } from 'lucide-react';
import { format } from 'date-fns';

interface TagType {
  id: string;
  name: string;
  slug: string;
  created_at: string;
  _count?: { post_tags: number };
}

export default function TagsPage() {
  const [tags, setTags] = useState<TagType[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingTag, setEditingTag] = useState<TagType | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  // Form state
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  useEffect(() => {
    loadTags();
  }, []);

  useEffect(() => {
    // Auto-generate slug from name
    if (!editingTag && name) {
      const generatedSlug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setSlug(generatedSlug);
    }
  }, [name, editingTag]);

  const loadTags = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*, post_tags(count)')
        .order('name');

      if (error) throw error;

      const tagsWithCount = data.map((tag: any) => ({
        ...tag,
        _count: { post_tags: tag.post_tags?.[0]?.count || 0 }
      }));

      setTags(tagsWithCount);
    } catch (err: any) {
      console.error('Error loading tags:', err);
      setError('Failed to load tags');
    } finally {
      setLoading(false);
    }
  };

  const openCreateDialog = () => {
    setEditingTag(null);
    setName('');
    setSlug('');
    setError('');
    setIsDialogOpen(true);
  };

  const openEditDialog = (tag: TagType) => {
    setEditingTag(tag);
    setName(tag.name);
    setSlug(tag.slug);
    setError('');
    setIsDialogOpen(true);
  };

  const handleSave = async () => {
    if (!name.trim() || !slug.trim()) {
      setError('Name and slug are required');
      return;
    }

    setSaving(true);
    setError('');

    try {
      const tagData = {
        name: name.trim(),
        slug: slug.trim(),
      };

      if (editingTag) {
        // Update existing tag
        const { error } = await supabase
          .from('tags')
          .update(tagData)
          .eq('id', editingTag.id);

        if (error) throw error;
      } else {
        // Create new tag
        const { error } = await supabase
          .from('tags')
          .insert([tagData]);

        if (error) throw error;
      }

      setIsDialogOpen(false);
      await loadTags();
    } catch (err: any) {
      console.error('Error saving tag:', err);
      setError(err.message || 'Failed to save tag');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;

    setDeleting(true);
    try {
      // Delete post_tags relationships first
      await supabase
        .from('post_tags')
        .delete()
        .eq('tag_id', deleteId);

      // Delete the tag
      const { error } = await supabase
        .from('tags')
        .delete()
        .eq('id', deleteId);

      if (error) throw error;

      setTags(tags.filter(t => t.id !== deleteId));
      setDeleteId(null);
    } catch (err: any) {
      console.error('Error deleting tag:', err);
      setError(err.message || 'Failed to delete tag');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tags</h1>
          <p className="text-muted-foreground mt-1">
            Create tags to help readers find related content
          </p>
        </div>
        <Button onClick={openCreateDialog}>
          <Plus className="h-4 w-4 mr-2" />
          New Tag
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Tags</div>
          <div className="text-2xl font-bold mt-1">{tags.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Usage</div>
          <div className="text-2xl font-bold mt-1">
            {tags.reduce((acc, tag) => acc + (tag._count?.post_tags || 0), 0)}
          </div>
        </Card>
      </div>

      {/* Error Alert */}
      {error && !isDialogOpen && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Tags Table */}
      <Card>
        {loading ? (
          <div className="flex items-center justify-center p-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : tags.length === 0 ? (
          <div className="text-center p-12">
            <Tag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No tags yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first tag to help organize content
            </p>
            <Button onClick={openCreateDialog}>
              <Plus className="h-4 w-4 mr-2" />
              Create Tag
            </Button>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Usage</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell className="font-medium">{tag.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{tag.slug}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge>{tag._count?.post_tags || 0} posts</Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(tag.created_at), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(tag)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setDeleteId(tag.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingTag ? 'Edit Tag' : 'Create Tag'}
            </DialogTitle>
            <DialogDescription>
              {editingTag
                ? 'Update the tag details below'
                : 'Add a new tag for categorizing your blog posts'}
            </DialogDescription>
          </DialogHeader>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Awareness"
              />
            </div>

            <div>
              <Label htmlFor="slug">Slug *</Label>
              <Input
                id="slug"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="awareness"
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              disabled={saving}
            >
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Tag</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this tag? This will remove it from all associated posts. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={deleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
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
