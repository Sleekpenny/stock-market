"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import NavItems from "./nav-items";

const DropDown = () => {
  const user = {
    firstName: "Courage",
    lastName: "Asemokhe",
    email: "macphantomsoft@gmail.com",
  };

  const router = useRouter();
  const handleSignOut = async () => {
    router.push("/sign-out");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-3 text-gray-4 hover:text-yellow-400">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="bg-yellow-400 text-yellow-900 text-md font-bold">
            {user.firstName[0]} {user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="hidden md:block">
          <span className="text-base font-medium text-gray-400">
            {user.firstName}
          </span>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuGroup>        
        <DropdownMenuLabel>
          <div className="flex relative items-center gap-3 py-2">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback className="bg-yellow-400 text-yellow-900 text-md font-bold">
                {user.firstName[0]} {user.lastName[0]}
              </AvatarFallback>
            </Avatar>

            <div className="flex flex-col">
              <span className="text-base font-medium text-gray-400">
                {user.firstName}
              </span>
              <span className="text-sm text-gray-500">{user.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
          </DropdownMenuGroup> 

        <DropdownMenuSeparator className="bg-gray-600" />
        <DropdownMenuItem
          onClick={handleSignOut}
          className="cursor-pointer text-gray-100 text-md font-medium focus:bg-transparent focus:text-yellow-500 transition-colors"
        >
          <LogOut className="h-4 w-4 mr-2 hidden sm:block" />
          Logout
        </DropdownMenuItem>
        <DropdownMenuSeparator className="hidden sm:block bg-gray-60" />
        <nav className="md:hidden">
          <NavItems />
        </nav>
     
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
