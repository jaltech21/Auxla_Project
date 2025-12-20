import { createContext, useContext, useEffect, useState, useRef, useCallback } from 'react';
import { Session, User, AuthError } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

interface Author {
  id: string;
  user_id: string;
  name: string;
  slug: string;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  email: string | null;
  is_active: boolean;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  author: Author | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>;
  signOut: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [author, setAuthor] = useState<Author | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Use refs to track fetch state and prevent duplicate fetches
  const fetchingProfileRef = useRef(false);
  const lastFetchedUserIdRef = useRef<string | null>(null);

  const fetchAuthorProfile = useCallback(async (userId: string) => {
    // Skip if we're already fetching or if we already have this user's profile
    if (fetchingProfileRef.current || lastFetchedUserIdRef.current === userId) {
      return;
    }

    fetchingProfileRef.current = true;
    lastFetchedUserIdRef.current = userId;

    try {
      const { data, error } = await supabase
        .from('authors')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) {
        throw error;
      }
      
      setAuthor(data);
    } catch (error) {
      console.error('Failed to fetch author profile:', error);
      setAuthor(null);
    } finally {
      setLoading(false);
      fetchingProfileRef.current = false;
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAuthorProfile(session.user.id);
      } else {
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!mounted) return;
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchAuthorProfile(session.user.id);
      } else {
        setAuthor(null);
        lastFetchedUserIdRef.current = null;
        setLoading(false);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [fetchAuthorProfile]);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    
    if (error) {
      return { error };
    }
    
    // Wait for author profile to be fetched before returning
    if (data?.user) {
      await fetchAuthorProfile(data.user.id);
    }
    
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setUser(null);
    setAuthor(null);
  };

  const value = {
    session,
    user,
    author,
    loading,
    signIn,
    signOut,
    isAdmin: author?.is_active ?? false,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
