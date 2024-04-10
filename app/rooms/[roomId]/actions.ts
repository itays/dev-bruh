"use server";
import { getSession } from "@/lib/auth";
import { StreamChat } from "stream-chat";

export async function generateTokenAction() {
  const session = await getSession();
  if (!session) {
    throw new Error("No session found");
  }
  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const secret = process.env.NEXT_PUBLIC_GET_STREAM_API_SECRET!;
  const serverClient = StreamChat.getInstance(apiKey, secret);
  const token = serverClient.createToken(session.user.id);
  return token;
}
