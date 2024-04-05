"use client";
import { useSession, signIn, signOut } from "next-auth/react";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

export function Header() {
  const session = useSession();
  return (
    <header data-testid="header">
      <div>
        {session.data ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in</Button>
        )}
        {session.data?.user && <span>Hi, {session.data.user?.name}</span>}
      </div>
      <ModeToggle />
    </header>
  );
}
