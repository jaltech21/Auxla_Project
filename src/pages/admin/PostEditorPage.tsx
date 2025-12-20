import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { RichTextEditor } from '@/components/admin/RichTextEditor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { Loader2, Save, Eye, ArrowLeft, X, Upload } from 'lucide-react';
import { format } from 'date-fns';

interface Category {
  id: string;
  name: string;
  slug: string;
}

interface Tag {
  id: string;
  name: string;
  slug: string;
}

export default function PostEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, author } = useAuth();
  const isEditMode = !!id;
  const coverImageInputRef = useRef<HTMLInputElement>(null);

  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [content, setContent] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [status, setStatus] = useState<'draft' | 'published'>('draft');
  const [publishedAt, setPublishedAt] = useState<string>('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  
  // SEO fields
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
  
  // Auto-save
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [autoSaving, setAutoSaving] = useState(false);
  const autoSaveTimeoutRef = useRef<NodeJS.Timeout>();

  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(isEditMode);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Auto-generate slug from title
  useEffect(() => {
    if (!isEditMode && title) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
      setSlug(generatedSlug);
    }
  }, [title, isEditMode]);

  // Auto-save draft
  useEffect(() => {
    if (!title || !content || loading || !isEditMode) return;

    // Clear existing timeout
    if (autoSaveTimeoutRef.current) {
      clearTimeout(autoSaveTimeoutRef.current);
    }

    // Set new timeout for auto-save (3 seconds after last change)
    autoSaveTimeoutRef.current = setTimeout(() => {
      autoSaveDraft();
    }, 3000);

    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, [title, slug, excerpt, content, coverImage, categoryId, selectedTags, seoTitle, seoDescription, seoKeywords]);

  // Calculate reading time
  const calculateReadingTime = (htmlContent: string): number => {
    const text = htmlContent.replace(/<[^>]*>/g, '');
    const wordCount = text.split(/\s+/).filter(word => word.length > 0).length;
    return Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute
  };

  // Load categories and tags
  useEffect(() => {
    loadCategoriesAndTags();
  }, []);

  // Load post data if editing
  useEffect(() => {
    if (isEditMode && id) {
      loadPost(id);
    }
  }, [id, isEditMode]);

  const loadCategoriesAndTags = async () => {
    try {
      const [categoriesRes, tagsRes] = await Promise.all([
        supabase.from('categories').select('*').order('name'),
        supabase.from('tags').select('*').order('name'),
      ]);

      if (categoriesRes.data) setCategories(categoriesRes.data);
      if (tagsRes.data) setTags(tagsRes.data);
    } catch (err) {
      console.error('Error loading categories and tags:', err);
    }
  };

  const loadPost = async (postId: string) => {
    setLoadingData(true);
    try {
      const { data: post, error: postError } = await supabase
        .from('blog_posts')
        .select(`
          *,
          post_tags(tag_id)
        `)
        .eq('id', postId)
        .single();

      if (postError) throw postError;

      if (post) {
        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt || '');
        setContent(post.content);
        setCoverImage(post.cover_image || '');
        setCategoryId(post.category_id || '');
        setStatus(post.status);
        setPublishedAt(post.published_at || '');
        setSelectedTags(post.post_tags?.map((pt: any) => pt.tag_id) || []);
        setSeoTitle(post.seo_title || '');
        setSeoDescription(post.seo_description || '');
        setSeoKeywords(post.seo_keywords || '');
        
        // Parse schedule date/time if exists and not yet published
        if (post.published_at && post.status === 'draft') {
          const scheduledDate = new Date(post.published_at);
          setScheduleDate(scheduledDate.toISOString().split('T')[0]);
          setScheduleTime(scheduledDate.toTimeString().slice(0, 5));
        }
      }
    } catch (err: any) {
      setError(err.message || 'Failed to load post');
    } finally {
      setLoadingData(false);
    }
  };

  const handleSave = async (newStatus?: 'draft' | 'published') => {
    if (!title.trim() || !slug.trim() || !content.trim()) {
      setError('Title, slug, and content are required');
      return;
    }

    if (!author) {
      setError('Author information not available');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const postStatus = newStatus || status;
      
      // Calculate reading time
      const readingTime = calculateReadingTime(content);
      
      // Handle scheduled publishing
      let finalPublishedAt = publishedAt || null;
      if (postStatus === 'published') {
        if (scheduleDate && scheduleTime) {
          // Use scheduled date/time
          finalPublishedAt = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
        } else if (!publishedAt) {
          // Publish immediately
          finalPublishedAt = new Date().toISOString();
        }
      } else if (scheduleDate && scheduleTime) {
        // Save schedule for draft
        finalPublishedAt = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
      }
      
      const postData = {
        title,
        slug,
        excerpt,
        content,
        cover_image: coverImage || null,
        category_id: categoryId || null,
        author_id: author.id,
        status: postStatus,
        published_at: finalPublishedAt,
        reading_time: readingTime,
        seo_title: seoTitle || null,
        seo_description: seoDescription || null,
        seo_keywords: seoKeywords || null,
      };

      let postId = id;

      if (isEditMode) {
        // Update existing post
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update(postData)
          .eq('id', id);

        if (updateError) throw updateError;
      } else {
        // Create new post
        const { data: newPost, error: insertError } = await supabase
          .from('blog_posts')
          .insert([postData])
          .select()
          .single();

        if (insertError) throw insertError;
        postId = newPost.id;
      }

      // Update tags
      if (postId) {
        // Delete existing tags
        await supabase.from('post_tags').delete().eq('post_id', postId);

        // Insert new tags
        if (selectedTags.length > 0) {
          const tagInserts = selectedTags.map(tagId => ({
            post_id: postId,
            tag_id: tagId,
          }));
          await supabase.from('post_tags').insert(tagInserts);
        }
      }

      setSuccess(isEditMode ? 'Post updated successfully' : 'Post created successfully');
      setStatus(postStatus);
      setLastSaved(new Date());

      if (!isEditMode) {
        setTimeout(() => navigate('/admin/posts'), 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const autoSaveDraft = async () => {
    if (!isEditMode || !id || !author || status === 'published') return;

    setAutoSaving(true);
    
    try {
      const readingTime = calculateReadingTime(content);
      
      await supabase
        .from('blog_posts')
        .update({
          title,
          slug,
          excerpt,
          content,
          cover_image: coverImage || null,
          category_id: categoryId || null,
          reading_time: readingTime,
          seo_title: seoTitle || null,
          seo_description: seoDescription || null,
          seo_keywords: seoKeywords || null,
        })
        .eq('id', id);

      // Update tags
      await supabase.from('post_tags').delete().eq('post_id', id);
      if (selectedTags.length > 0) {
        const tagInserts = selectedTags.map(tagId => ({
          post_id: id,
          tag_id: tagId,
        }));
        await supabase.from('post_tags').insert(tagInserts);
      }

      setLastSaved(new Date());
    } catch (err) {
      console.error('Auto-save failed:', err);
    } finally {
      setAutoSaving(false);
    }
  };

  const handlePublish = () => {
    handleSave('published');
  };

  const toggleTag = (tagId: string) => {
    setSelectedTags(prev =>
      prev.includes(tagId)
        ? prev.filter(id => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleImageUpload = async (file: File) => {
    if (!user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size must be less than 5MB');
      return;
    }

    setUploadingImage(true);
    setError('');

    try {
      // Generate unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `cover-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;
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

      setCoverImage(publicUrl);
      setSuccess('Cover image uploaded successfully');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      console.error('Error uploading cover image:', err);
      setError(err.message || 'Failed to upload cover image');
    } finally {
      setUploadingImage(false);
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
            onClick={() => navigate('/admin/posts')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Posts
          </Button>
          <h1 className="text-3xl font-bold">
            {isEditMode ? 'Edit Post' : 'Create New Post'}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant={status === 'published' ? 'default' : 'secondary'}>
            {status === 'published' ? 'Published' : 'Draft'}
          </Badge>
          {publishedAt && (
            <span className="text-sm text-muted-foreground">
              {format(new Date(publishedAt), 'MMM d, yyyy')}
            </span>
          )}
          {autoSaving && (
            <span className="text-sm text-muted-foreground flex items-center gap-1">
              <Loader2 className="h-3 w-3 animate-spin" />
              Saving...
            </span>
          )}
          {lastSaved && !autoSaving && (
            <span className="text-sm text-muted-foreground">
              Saved {format(lastSaved, 'HH:mm:ss')}
            </span>
          )}
        </div>
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
              <CardTitle>Post Content</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter post title"
                  className="text-2xl font-bold"
                />
              </div>

              <div>
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="post-url-slug"
                />
              </div>

              <div>
                <Label htmlFor="excerpt">Excerpt</Label>
                <Textarea
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Brief summary of the post..."
                  rows={3}
                />
              </div>

              <div>
                <Label>Content *</Label>
                <RichTextEditor
                  content={content}
                  onChange={setContent}
                  placeholder="Start writing your post..."
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Publishing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Button
                  onClick={() => handleSave('draft')}
                  disabled={loading}
                  variant="outline"
                  className="flex-1"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Save className="h-4 w-4 mr-2" />
                  )}
                  Save Draft
                </Button>
                <Button
                  onClick={handlePublish}
                  disabled={loading}
                  className="flex-1"
                >
                  {loading ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Eye className="h-4 w-4 mr-2" />
                  )}
                  Publish
                </Button>
              </div>
              
              {/* Schedule Publishing */}
              <div className="space-y-2 pt-4 border-t">
                <Label className="text-sm font-medium">Schedule Publishing (Optional)</Label>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <Input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  <div>
                    <Input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </div>
                </div>
                {scheduleDate && scheduleTime && (
                  <p className="text-xs text-muted-foreground">
                    Will publish on {format(new Date(`${scheduleDate}T${scheduleTime}`), 'MMM d, yyyy \'at\' h:mm a')}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Cover Image</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <Label htmlFor="coverImage">Image URL</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      id="coverImage"
                      value={coverImage}
                      onChange={(e) => setCoverImage(e.target.value)}
                      placeholder="https://example.com/image.jpg or upload below"
                    />
                    <input
                      ref={coverImageInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleImageUpload(file);
                        e.target.value = '';
                      }}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => coverImageInputRef.current?.click()}
                      disabled={uploadingImage}
                    >
                      {uploadingImage ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Uploading
                        </>
                      ) : (
                        <>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                {coverImage && (
                  <div className="relative">
                    <img
                      src={coverImage}
                      alt="Cover preview"
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8"
                      onClick={() => setCoverImage('')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category</CardTitle>
            </CardHeader>
            <CardContent>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tags</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant={selectedTags.includes(tag.id) ? 'default' : 'outline'}
                    className="cursor-pointer"
                    onClick={() => toggleTag(tag.id)}
                  >
                    {tag.name}
                    {selectedTags.includes(tag.id) && (
                      <X className="h-3 w-3 ml-1" />
                    )}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SEO Settings */}
          <Card>
            <CardHeader>
              <CardTitle>SEO Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="seoTitle">SEO Title</Label>
                <Input
                  id="seoTitle"
                  value={seoTitle}
                  onChange={(e) => setSeoTitle(e.target.value)}
                  placeholder={title || 'SEO title for search engines'}
                  maxLength={60}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {seoTitle.length}/60 characters
                </p>
              </div>

              <div>
                <Label htmlFor="seoDescription">SEO Description</Label>
                <Textarea
                  id="seoDescription"
                  value={seoDescription}
                  onChange={(e) => setSeoDescription(e.target.value)}
                  placeholder={excerpt || 'Brief description for search results'}
                  rows={3}
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  {seoDescription.length}/160 characters
                </p>
              </div>

              <div>
                <Label htmlFor="seoKeywords">Keywords</Label>
                <Input
                  id="seoKeywords"
                  value={seoKeywords}
                  onChange={(e) => setSeoKeywords(e.target.value)}
                  placeholder="mental health, wellness, therapy"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Comma-separated keywords
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
