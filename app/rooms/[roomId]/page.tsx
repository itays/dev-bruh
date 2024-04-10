import { TagsList } from "@/components/TagsList";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getRoom } from "@/data-access/rooms";
import { Github } from "lucide-react";
import Link from "next/link";
import { DevBruhPlayer } from "../video-player";

export default async function RoomPage({
  params,
}: {
  params: { roomId: string };
}) {
  const room = await getRoom(params.roomId);
  const technologies = room.technologies.split(",");
  return (
    <div>
      <div className="container grid grid-cols-4 px-0 py-4  gap-4">
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Video Player</CardTitle>
            {/* <CardDescription></CardDescription> */}
          </CardHeader>
          <CardContent>
            <DevBruhPlayer room={room} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{room?.name}</CardTitle>
            <CardDescription>{room?.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <TagsList tags={technologies} />

            {room?.githubRepo && (
              <Link
                href={room.githubRepo}
                className="flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github /> {room.githubRepo}
              </Link>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
