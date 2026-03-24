import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { User, Session } from '@supabase/supabase-js';
import { withTimeout } from '@/lib/supabase-utils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  isAdmin: boolean;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    console.log('[AuthContext] Initializing...');
    let mounted = true;

    const getInitialSession = async () => {
      try {
        console.log('[AuthContext] Fetching session...');
        // Fast session check - timeout after 3s
        const { data: { session }, error: sessionError } = await withTimeout(supabase.auth.getSession(), 3000);
        if (sessionError) throw sessionError;

        if (mounted) {
          console.log('[AuthContext] Session found:', !!session);
          setSession(session);
          setUser(session?.user ?? null);
          
          // CRITICAL OPTIMIZATION: Set loading to false immediately for non-admin check
          // If there is no user, we are definitely not an admin.
          // If there IS a user, we fetch role in background.
          if (!session?.user) {
            setLoading(false);
          } else {
            // Check admin in background without blocking initial render
            checkAdminRole(session.user.id);
          }
        }
      } catch (error: any) {
        console.error('[AuthContext] Error checking auth session:', error.message || error);
        if (mounted) setLoading(false);
      }
    };

    const checkAdminRole = async (userId: string) => {
      try {
        console.log('[AuthContext] Checking admin role (background)...');
        const { data, error: rpcError } = await withTimeout(supabase.rpc('has_role', { 
          _user_id: userId, 
          _role: 'admin' 
        }), 3000);
        
        if (mounted) {
          if (rpcError) throw rpcError;
          console.log('[AuthContext] Is admin:', !!data);
          setIsAdmin(!!data);
        }
      } catch (error: any) {
        console.error('[AuthContext] Admin role check failed:', error.message || error);
      } finally {
        if (mounted) setLoading(false);
      }
    };

    getInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('[AuthContext] Auth state changed:', event);
      if (!mounted) return;
      
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        try {
          // Timeout for role check on state change
          const { data, error: rpcError } = await withTimeout(supabase.rpc('has_role', { 
            _user_id: session.user.id, 
            _role: 'admin' 
          }), 5000);
          
          if (rpcError) throw rpcError;
          setIsAdmin(!!data);
        } catch (error: any) {
          console.error('[AuthContext] Error checking admin role on change:', error.message || error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{ user, session, loading, isAdmin, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
