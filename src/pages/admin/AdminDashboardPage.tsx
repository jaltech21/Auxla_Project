import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  Eye,
  ThumbsUp,
  TrendingUp,
  Plus,
  Image,
  Users,
  FolderOpen,
  Loader2,
} from 'lucide-react';
import { format } from 'date-fns';

interface DashboardStats {
  totalPosts: number;
  publishedPosts: number;
  draftPosts: number;
  totalViews: number;
}

interface RecentPost {
  id: string;
  title: string;
  slug: string;
  status: string;
  view_count: number;
  created_at: string;
  category: {
    name: string;
  } | null;
}

export default function AdminDashboardPage() {
  const { author } = useAuth();
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    publishedPosts: 0,
    draftPosts: 0,
    totalViews: 0,
  });
  const [recentPosts, setRecentPosts] = useState<RecentPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch statistics
      const { data: posts, error: postsError } = await supabase
        .from('blog_posts')
        .select('status, view_count');

      if (postsError) throw postsError;

      const totalPosts = posts?.length || 0;
      const publishedPosts = posts?.filter(p => p.status === 'published').length || 0;
      const draftPosts = posts?.filter(p => p.status === 'draft').length || 0;
      const totalViews = posts?.reduce((sum, p) => sum + (p.view_count || 0), 0) || 0;

      setStats({
        totalPosts,
        publishedPosts,
        draftPosts,
        totalViews,
      });

      // Fetch recent posts
      const { data: recent, error: recentError } = await supabase
        .from('blog_posts')
        .select(`
          id,
          title,
          slug,
          status,
          view_count,
          created_at,
          category:categories(name)
        `)
        .order('created_at', { ascending: false })
        .limit(5);

      if (recentError) throw recentError;
      setRecentPosts(recent || []);
    } catch (err) {
      console.error('Error loading dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  const statsDisplay = [
    {
      name: 'Total Posts',
      value: stats.totalPosts.toString(),
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      name: 'Published',
      value: stats.publishedPosts.toString(),
      icon: Eye,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      name: 'Drafts',
      value: stats.draftPosts.toString(),
      icon: FileText,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      name: 'Total Views',
      value: stats.totalViews.toLocaleString(),
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
  ];

  const quickActions = [
    {
      name: 'New Post',
      description: 'Create a new blog post',
      href: '/admin/posts/new',
      icon: FileText,
      color: 'bg-blue-500',
    },
    {
      name: 'Media Library',
      description: 'Upload and manage images',
      href: '/admin/media',
      icon: Image,
      color: 'bg-green-500',
    },
    {
      name: 'Categories',
      description: 'Manage post categories',
      href: '/admin/categories',
      icon: FolderOpen,
      color: 'bg-purple-500',
    },
    {
      name: 'Authors',
      description: 'Manage author profiles',
      href: '/admin/authors',
      icon: Users,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold mb-2">
          Welcome back, {author?.name?.split(' ')[0] || 'Admin'}!
        </h1>
        <p className="text-muted-foreground">
          Here's what's happening with your blog today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {loading ? (
          <div className="col-span-4 flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
          </div>
        ) : (
          statsDisplay.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.name}>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.name}
                  </CardTitle>
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`h-4 w-4 ${stat.color}`} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Card
                key={action.name}
                className="hover:shadow-md transition-shadow cursor-pointer"
                asChild
              >
                <Link to={action.href}>
                  <CardHeader>
                    <div className={`w-10 h-10 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <CardTitle className="text-base">{action.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {action.description}
                    </CardDescription>
                  </CardHeader>
                </Link>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Recent Posts */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>Your recently created or edited blog posts</CardDescription>
          </div>
          <Button asChild size="sm">
            <Link to="/admin/posts">View All</Link>
          </Button>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : recentPosts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-20" />
              <p className="text-lg font-medium mb-2">No posts yet</p>
              <p className="text-sm mb-4">Get started by creating your first blog post</p>
              <Button asChild>
                <Link to="/admin/posts/new">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Post
                </Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentPosts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <Link
                        to={`/admin/posts/${post.id}/edit`}
                        className="font-medium hover:underline truncate"
                      >
                        {post.title}
                      </Link>
                      <Badge
                        variant={post.status === 'published' ? 'default' : 'secondary'}
                        className="shrink-0"
                      >
                        {post.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      {post.category && (
                        <span className="flex items-center gap-1">
                          <FolderOpen className="h-3 w-3" />
                          {post.category.name}
                        </span>
                      )}
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {post.view_count || 0} views
                      </span>
                      <span>{format(new Date(post.created_at), 'MMM d, yyyy')}</span>
                    </div>
                  </div>
                  <Button asChild variant="ghost" size="sm">
                    <Link to={`/admin/posts/${post.id}/edit`}>Edit</Link>
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Getting Started */}
      {!loading && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>🚀 Getting Started</CardTitle>
            <CardDescription>Complete these steps to set up your blog</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">
                ✓
              </div>
              <span>Create your admin account</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                stats.totalPosts > 0
                  ? 'bg-green-500 text-white'
                  : 'border-2 border-muted text-muted-foreground'
              }`}>
                {stats.totalPosts > 0 ? '✓' : '1'}
              </div>
              <span className={stats.totalPosts > 0 ? '' : 'text-muted-foreground'}>
                Create your first blog post
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${
                stats.publishedPosts > 0
                  ? 'bg-green-500 text-white'
                  : 'border-2 border-muted text-muted-foreground'
              }`}>
                {stats.publishedPosts > 0 ? '✓' : '2'}
              </div>
              <span className={stats.publishedPosts > 0 ? '' : 'text-muted-foreground'}>
                Publish your first post
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <div className="w-5 h-5 rounded-full border-2 border-muted flex items-center justify-center text-xs">
                3
              </div>
              <span>Customize categories and tags</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
