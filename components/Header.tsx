// import { User, Bell } from "lucide-react";
// import { Gamepad2, User, Bell, LogOut } from 'lucide-react';
// import { Button } from "@/components/ui/button";
// import { useToast } from '@/hooks/use-toast';
import { ClaimStats } from "./ClaimStats";
import { CountrySelector } from "./CountrySelector";
import { TempLogin } from "./TempLogin";
import { TempNotification } from "./TempNotification";
import Image from "next/image";
// import Link from 'next/link';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '@/contexts/AuthContext';
// import { supabase } from '@/integrations/supabase/client';

export const Header = () => {
  // const { toast } = useToast();
  // const { user } = useAuth();
  // const navigate = useNavigate();

  // const handleSignOut = async () => {
  //   await supabase.auth.signOut();
  //   toast({
  //     title: 'Signed Out',
  //     description: 'You have been successfully signed out.',
  //   });
  //   navigate('/');
  // };

  //   {/* {user ? (
  //   <Button variant="ghost" size="icon">
  //     <LogOut className="w-5 h-5" />
  //     <span className="sr-only">Sign Out</span>
  //   </Button>
  // ) : (
  //   <Button variant="ghost" size="icon" asChild>
  //     <Link to="/auth">
  //       <User className="w-5 h-5" />
  //       <span className="sr-only">Sign In</span>
  //     </Link>
  //   </Button> */}
  // {/* )} */}

  return (
    <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            {/* <Gamepad2Icon className="w-10 h-10 text-primary" /> */}
            <Image className="rounded-md" width={40} height={40} alt="gamepad"src={"/gamepad2.jpg"}></Image>
            <span className="text-3xl font-bold font-gaming text-foreground">Gamez24</span>
            <ClaimStats />
          </div>
          
          <div className="flex items-center gap-6">
            <CountrySelector />
            <TempNotification />
            <TempLogin />

          </div>
        </div>
      </div>
    </header>
  );
};
