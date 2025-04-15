"use client";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useGetMe, useLogout } from "@/React-Query/Queries/authQueries";


export function DashboardNavbar() {
  const router = useRouter();
  const { data: user } = useGetMe();
  const { mutate: logOut, isPending } = useLogout();

  const handleLogout = async () => { 
    
    logOut();

  };

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 ml-64">
      <div className="flex-1">
        <h1 className="text-lg font-semibold">
          {user?.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
        </h1>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user?.image} alt={user?.name} />
              <AvatarFallback>
                {user?.name?.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuItem 
            className="flex items-center gap-2"
            onClick={() => router.push('/dashboard/profile')}
          >
            <User className="h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center gap-2"
            onClick={() => router.push('/dashboard/settings')}
          >
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            className="flex items-center gap-2 text-red-600"
            onClick={handleLogout}
            disabled={isPending}

          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
            {isPending && <Loader2 className="animate-spin h-4 w-4" />}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  );
}