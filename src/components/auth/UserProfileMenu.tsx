"use client";

import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function UserProfileMenu() {
  const { user, logout } = useAuth();

  if (!user) return null;

  // Function to get user initials from name
  const getUserInitials = (name: string) => {
    if (!name) return "?";

    const nameParts = name.split(" ").filter((part) => part.length > 0);
    if (nameParts.length === 0) return "?";

    if (nameParts.length === 1) {
      return nameParts[0].charAt(0).toUpperCase();
    }

    // Get first letter of first name and first letter of last name
    return `${nameParts[0].charAt(0)}${nameParts[nameParts.length - 1].charAt(
      0
    )}`.toUpperCase();
  };

  // Generate a consistent background color based on the user's name
  const getAvatarColor = (name: string) => {
    if (!name) return "bg-faith-100";

    // Simple hash function to generate a number from a string
    const hash = name.split("").reduce((acc, char) => {
      return acc + char.charCodeAt(0);
    }, 0);

    // Array of tailwind color classes
    const colors = [
      "bg-red-100 text-red-800",
      "bg-orange-100 text-orange-800",
      "bg-amber-100 text-amber-800",
      "bg-yellow-100 text-yellow-800",
      "bg-lime-100 text-lime-800",
      "bg-green-100 text-green-800",
      "bg-emerald-100 text-emerald-800",
      "bg-teal-100 text-teal-800",
      "bg-cyan-100 text-cyan-800",
      "bg-sky-100 text-sky-800",
      "bg-blue-100 text-blue-800",
      "bg-indigo-100 text-indigo-800",
      "bg-violet-100 text-violet-800",
      "bg-purple-100 text-purple-800",
      "bg-fuchsia-100 text-fuchsia-800",
      "bg-pink-100 text-pink-800",
      "bg-rose-100 text-rose-800",
    ];

    // Use the hash to select a color
    return colors[hash % colors.length];
  };

  const initials = getUserInitials(user.name);
  const avatarColorClass = getAvatarColor(user.name);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full p-0"
          aria-label="User menu"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={user.profileImage}
              alt={user.name}
              style={{ objectFit: "cover" }}
            />
            <AvatarFallback className={avatarColorClass}>
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/profile" className="flex items-center">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/growth" className="flex items-center">
              <span>My Growth Track</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout} className="flex items-center">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
