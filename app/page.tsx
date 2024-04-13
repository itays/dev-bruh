import { Button } from "@/components/ui/button";
import { db } from "@/lib/db/db";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/lib/db/schema";
import { Github } from "lucide-react";
import { getRooms } from "@/data-access/rooms";
import { SearchBar } from "./SearchBar";
import { TagsList } from "@/components/TagsList";

function RoomCard({
  room: { id, name, description, githubRepo, technologies },
}: {
  room: Room;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <TagsList tags={technologies.split(",")} />
        {githubRepo && (
          <Link
            href={githubRepo}
            className="flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github /> Github Repo
          </Link>
        )}
      </CardContent>
      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${id}`}>Join Room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default async function Home(props: {
  searchParams: { search?: string };
}) {
  console.log(props.searchParams.search);
  const rooms = await getRooms(props.searchParams.search);
  return (
    <main className="min-h-screen py-16 container">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create Room</Link>
        </Button>
      </div>

      <SearchBar />

      <div className="grid grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
