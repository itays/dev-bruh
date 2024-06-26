"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogIn, LogOut } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";
import Link from "next/link";

function AccountDropdown() {
  const session = useSession();

  // generate two character initials from the user's name
  function getUserInitials() {
    if (session.data?.user.name) {
      const [firstName, lastName] = session.data.user.name.split(" ");
      return `${firstName[0]}${lastName[0]}`;
    }
    return "";
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <Avatar className="mr-2">
            <AvatarImage src={session.data?.user.image || ""} />
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOut /> Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const session = useSession();
  return (
    <header
      data-testid="header"
      className="py-2 dark:bg-gray-900 bg-gray-100 container mx-auto"
    >
      <div className="flex justify-between items-center">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl hover:underline"
        >
          <Image src="logo.svg" width="50" height="40" alt="logo" />
          Dev Bruh
        </Link>

        <div className="flex items-center gap-4">
          {session.data?.user ? (
            <AccountDropdown />
          ) : (
            <Button onClick={() => signIn("google")}>Sign in</Button>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
