
import { Gamepad2, User, Bell, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ClaimStats } from './ClaimStats';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

export const Header = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: 'Signed Out',
      description: 'You have been successfully signed out.',
    });
    navigate('/');
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Gamepad2 className="w-8 h-8 text-primary" />
            <span className="text-2xl font-bold text-foreground">Freebies</span>
            <ClaimStats />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/subscribe">
                <Bell className="w-5 h-5" />
                <span className="sr-only">Subscribe to alerts</span>
              </Link>
            </Button>
            {user ? (
              <Button variant="ghost" size="icon" onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
                <span className="sr-only">Sign Out</span>
              </Button>
            ) : (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/auth">
                  <User className="w-5 h-5" />
                  <span className="sr-only">Sign In</span>
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
