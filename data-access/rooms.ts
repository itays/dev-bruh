import { db } from "@/lib/db/db";
import { unstable_noStore } from "next/cache";

export async function getRooms() {
  unstable_noStore();
  return await db.query.room.findMany();
}
