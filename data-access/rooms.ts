import { db } from "@/lib/db/db";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { room } from "@/lib/db/schema";

export async function getRooms() {
  unstable_noStore();
  return await db.query.room.findMany();
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  const res = await db.query.room.findFirst({ where: eq(room.id, roomId) });
  if (!res) {
    throw new Error(`Room with id ${roomId} not found`);
  }
  return res;
}
