import { db } from "@/lib/db/db";
import { eq, ilike } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { room } from "@/lib/db/schema";

export async function getRooms(search?: string) {
  unstable_noStore();
  const where = search ? ilike(room.technologies, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({ where });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore();
  const res = await db.query.room.findFirst({ where: eq(room.id, roomId) });
  if (!res) {
    throw new Error(`Room with id ${roomId} not found`);
  }
  return res;
}
