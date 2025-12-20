import { useState, useEffect, useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
  Upload,
  Search,
  Loader2,
  Image as ImageIcon,
  Trash2,
  Copy,
  Check,
  X,
} from 'lucide-react';
import { format } from 'date-fns';

interface MediaFile {
  id: string;
  filename: string;
  original_filename: string;
  url: string;
  storage_path: string;
  file_size: number;
  mime_type: string;
  alt_text: string | null;
  caption: string | null;
  uploaded_by: string;
  created_at: string;
}

export default function MediaLibraryPage() {
  const { user, author } = useAuth();
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [deleteFileId, setDeleteFileId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadFiles();
  }, []);

  const loadFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('media')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFiles(data || []);
    } catch (err: any) {
      console.error('Error loading media files:', err);
      setError('Failed to load media files');
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files;
    if (!uploadedFiles || uploadedFiles.length === 0 || !user) return;

    setUploading(true);
    setError('');

    try {
      for (let i = 0; i < uploadedFiles.length; i++) {
        const file = uploadedFiles[i];

        // Validate file type
        if (!file.type.startsWith('image/')) {
          setError(`${file.name} is not an image file`);
          continue;
        }

        // Generate unique filename
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
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

        // Save to database
        const { error: dbError } = await supabase
          .from('media')
          .insert([
            {
              filename: fileName,
              original_filename: file.name,
              url: publicUrl,
              storage_path: filePath,
              file_size: file.size,
              mime_type: file.type,
              uploaded_by: user.id,
            },
          ]);

        if (dbError) throw dbError;
      }

      // Reload files
      await loadFiles();
    } catch (err: any) {
      console.error('Error uploading files:', err);
      setError(err.message || 'Failed to upload files');
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  const handleDelete = async () => {
    if (!deleteFileId) return;

    setDeleting(true);
    try {
      const fileToDelete = files.find(f => f.id === deleteFileId);
      if (!fileToDelete) return;

      // Delete from storage using storage_path
      if (fileToDelete.storage_path) {
        await supabase.storage
          .from('blog-images')
          .remove([fileToDelete.storage_path]);
      }

      // Delete from database
      const { error } = await supabase
        .from('media')
        .delete()
        .eq('id', deleteFileId);

      if (error) throw error;

      setFiles(files.filter(f => f.id !== deleteFileId));
      setDeleteFileId(null);
      setSelectedFile(null);
    } catch (err: any) {
      console.error('Error deleting file:', err);
      setError(err.message || 'Failed to delete file');
    } finally {
      setDeleting(false);
    }
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const filteredFiles = files.filter(file =>
    file.original_filename.toLowerCase().includes(searchQuery.toLowerCase()) ||
    file.alt_text?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Library</h1>
          <p className="text-muted-foreground mt-1">
            Upload and manage images for your blog posts
          </p>
        </div>
        <div>
          <input
            type="file"
            id="file-upload"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={uploading}
          />
          <label htmlFor="file-upload">
            <Button disabled={uploading} asChild>
              <span className="cursor-pointer">
                {uploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </>
                )}
              </span>
            </Button>
          </label>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Images</div>
          <div className="text-2xl font-bold mt-1">{files.length}</div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Total Size</div>
          <div className="text-2xl font-bold mt-1">
            {formatFileSize(files.reduce((acc, f) => acc + f.file_size, 0))}
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-sm text-muted-foreground">Uploaded This Month</div>
          <div className="text-2xl font-bold mt-1">
            {files.filter(f => {
              const fileDate = new Date(f.created_at);
              const now = new Date();
              return fileDate.getMonth() === now.getMonth() && 
                     fileDate.getFullYear() === now.getFullYear();
            }).length}
          </div>
        </Card>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Search */}
      <Card className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </Card>

      {/* Images Grid */}
      {loading ? (
        <div className="flex items-center justify-center p-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : filteredFiles.length === 0 ? (
        <Card className="p-12">
          <div className="text-center">
            <ImageIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No images found</h3>
            <p className="text-muted-foreground mb-4">
              {searchQuery
                ? 'Try adjusting your search'
                : 'Upload your first image to get started'}
            </p>
            {!searchQuery && (
              <label htmlFor="file-upload">
                <Button asChild>
                  <span className="cursor-pointer">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Images
                  </span>
                </Button>
              </label>
            )}
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredFiles.map((file) => (
            <Card
              key={file.id}
              className="group relative overflow-hidden cursor-pointer hover:ring-2 hover:ring-primary transition-all"
              onClick={() => setSelectedFile(file)}
            >
              <div className="aspect-square relative">
                <img
                  src={file.url}
                  alt={file.alt_text || file.original_filename}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={(e) => {
                      e.stopPropagation();
                      copyToClipboard(file.url);
                    }}
                  >
                    {copiedUrl === file.url ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteFileId(file.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium truncate">{file.original_filename}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.file_size)}
                </p>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* File Details Dialog */}
      <Dialog open={!!selectedFile} onOpenChange={() => setSelectedFile(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Image Details</DialogTitle>
            <DialogDescription>View and copy image information</DialogDescription>
          </DialogHeader>
          {selectedFile && (
            <div className="space-y-4">
              <img
                src={selectedFile.url}
                alt={selectedFile.alt_text || selectedFile.original_filename}
                className="w-full rounded-lg"
              />
              <div className="space-y-2">
                <div>
                  <label className="text-sm font-medium">File Name</label>
                  <p className="text-sm text-muted-foreground">{selectedFile.original_filename}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Size</label>
                  <p className="text-sm text-muted-foreground">
                    {formatFileSize(selectedFile.file_size)}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">Uploaded</label>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(selectedFile.created_at), 'PPP')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium">URL</label>
                  <div className="flex gap-2">
                    <Input value={selectedFile.url} readOnly />
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(selectedFile.url)}
                    >
                      {copiedUrl === selectedFile.url ? (
                        <Check className="h-4 w-4" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteFileId} onOpenChange={() => setDeleteFileId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Image</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this image? This action cannot be undone.
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
