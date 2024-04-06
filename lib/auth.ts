import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db/db";
import type { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import { AuthOptions, DefaultSession, getServerSession } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
    } & DefaultSession["user"];
  }
}

export const authConfig = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: (users, { eq }) => eq(users.email, token.email!),
      });
      if (!dbUser) {
        throw new Error("no user found");
      }
      return {
        id: dbUser.id,
        email: dbUser.email,
        name: dbUser.name,
        picture: dbUser.image,
      };
    },
    async session({ token, session }) {
      if (token) {
        session.user = {
          id: token.id as string,
          email: token.email,
          name: token.name,
          image: token.picture,
        };
      }
      return session;
    },
  },
} satisfies AuthOptions;

export function getSession() {
  return getServerSession(authConfig);
}
