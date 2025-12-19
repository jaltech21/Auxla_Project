-- =====================================================
-- OCSLAA CMS - Row Level Security (RLS) Policies
-- Created: December 2025
-- Purpose: Secure database access with role-based permissions
-- =====================================================

-- =====================================================
-- ENABLE RLS ON ALL TABLES
-- =====================================================
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE post_views ENABLE ROW LEVEL SECURITY;

-- =====================================================
-- HELPER FUNCTION: Check if user is admin
-- =====================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM authors
    WHERE user_id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- AUTHORS TABLE POLICIES
-- =====================================================

-- Anyone can view active authors
CREATE POLICY "Authors are viewable by everyone"
  ON authors FOR SELECT
  USING (is_active = true);

-- Authenticated users can view their own profile
CREATE POLICY "Users can view own author profile"
  ON authors FOR SELECT
  USING (auth.uid() = user_id);

-- Only admins can insert authors
CREATE POLICY "Admins can insert authors"
  ON authors FOR INSERT
  WITH CHECK (is_admin());

-- Authors can update their own profile, admins can update any
CREATE POLICY "Authors can update own profile"
  ON authors FOR UPDATE
  USING (auth.uid() = user_id OR is_admin());

-- Only admins can delete authors
CREATE POLICY "Admins can delete authors"
  ON authors FOR DELETE
  USING (is_admin());

-- =====================================================
-- CATEGORIES TABLE POLICIES
-- =====================================================

-- Everyone can view categories
CREATE POLICY "Categories are viewable by everyone"
  ON categories FOR SELECT
  USING (true);

-- Only authenticated users (authors) can create/update/delete categories
CREATE POLICY "Authors can manage categories"
  ON categories FOR ALL
  USING (is_admin());

-- =====================================================
-- TAGS TABLE POLICIES
-- =====================================================

-- Everyone can view tags
CREATE POLICY "Tags are viewable by everyone"
  ON tags FOR SELECT
  USING (true);

-- Authenticated authors can create tags
CREATE POLICY "Authors can create tags"
  ON tags FOR INSERT
  WITH CHECK (is_admin());

-- Admins can update/delete tags
CREATE POLICY "Admins can manage tags"
  ON tags FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete tags"
  ON tags FOR DELETE
  USING (is_admin());

-- =====================================================
-- BLOG POSTS TABLE POLICIES
-- =====================================================

-- Everyone can view published posts
CREATE POLICY "Published posts are viewable by everyone"
  ON blog_posts FOR SELECT
  USING (status = 'published' OR is_admin());

-- Authors can view their own drafts
CREATE POLICY "Authors can view own drafts"
  ON blog_posts FOR SELECT
  USING (
    author_id IN (
      SELECT id FROM authors WHERE user_id = auth.uid()
    )
  );

-- Authors can create posts
CREATE POLICY "Authors can create posts"
  ON blog_posts FOR INSERT
  WITH CHECK (
    author_id IN (
      SELECT id FROM authors WHERE user_id = auth.uid()
    )
  );

-- Authors can update their own posts, admins can update any
CREATE POLICY "Authors can update own posts"
  ON blog_posts FOR UPDATE
  USING (
    author_id IN (
      SELECT id FROM authors WHERE user_id = auth.uid()
    )
    OR is_admin()
  );

-- Only admins can delete posts
CREATE POLICY "Admins can delete posts"
  ON blog_posts FOR DELETE
  USING (is_admin());

-- =====================================================
-- POST_TAGS JUNCTION TABLE POLICIES
-- =====================================================

-- Everyone can view post tags
CREATE POLICY "Post tags are viewable by everyone"
  ON post_tags FOR SELECT
  USING (true);

-- Authors can manage tags for their own posts
CREATE POLICY "Authors can manage own post tags"
  ON post_tags FOR ALL
  USING (
    post_id IN (
      SELECT id FROM blog_posts
      WHERE author_id IN (
        SELECT id FROM authors WHERE user_id = auth.uid()
      )
    )
    OR is_admin()
  );

-- =====================================================
-- MEDIA TABLE POLICIES
-- =====================================================

-- Everyone can view media
CREATE POLICY "Media is viewable by everyone"
  ON media FOR SELECT
  USING (true);

-- Authenticated users can upload media
CREATE POLICY "Authenticated users can upload media"
  ON media FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

-- Users can update their own media, admins can update any
CREATE POLICY "Users can update own media"
  ON media FOR UPDATE
  USING (auth.uid() = uploaded_by OR is_admin());

-- Users can delete their own media, admins can delete any
CREATE POLICY "Users can delete own media"
  ON media FOR DELETE
  USING (auth.uid() = uploaded_by OR is_admin());

-- =====================================================
-- POST VIEWS TABLE POLICIES
-- =====================================================

-- Anyone can insert view records (for analytics)
CREATE POLICY "Anyone can record post views"
  ON post_views FOR INSERT
  WITH CHECK (true);

-- Only admins can view analytics data
CREATE POLICY "Admins can view analytics"
  ON post_views FOR SELECT
  USING (is_admin());

-- =====================================================
-- STORAGE BUCKET POLICIES
-- =====================================================

-- Create storage bucket for blog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for blog images
CREATE POLICY "Anyone can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images'
    AND auth.uid() IS NOT NULL
  );

CREATE POLICY "Users can update own blog images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'blog-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

CREATE POLICY "Users can delete own blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images'
    AND auth.uid()::text = (storage.foldername(name))[1]
  );

-- =====================================================
-- SUCCESS MESSAGE
-- =====================================================
DO $$
BEGIN
  RAISE NOTICE '✅ Row Level Security policies created successfully!';
  RAISE NOTICE '🔐 All tables are now secured with RLS';
  RAISE NOTICE '📦 Storage bucket "blog-images" created';
  RAISE NOTICE '🎯 Next step: Create your first admin user';
END $$;
