"use client";
import "@stream-io/video-react-sdk/dist/css/styles.css";
import { Room } from "@/lib/db/schema";
import {
  Call,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
  StreamTheme,
  SpeakerLayout,
  CallControls,
  CallParticipantsList,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { generateTokenAction } from "./[roomId]/actions";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;

export function DevBruhPlayer({ room }: { room: Room }) {
  const session = useSession();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  useEffect(() => {
    if (!room.id) {
      return;
    }
    if (!session.data) {
      return;
    }
    const userId = session.data?.user.id;
    const c = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
        name: session.data.user.name ?? "Unknown",
        image: session.data.user.image ?? undefined,
      },
      tokenProvider: () => generateTokenAction(),
    });
    setClient(c);
    const call = c.call("default", room.id);
    call.join({ create: true });
    setCall(call);
    return () => {
      call.leave();
      c.disconnectUser();
    };
  }, [session.data, room.id]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls />
            <CallParticipantsList onClose={() => {}} />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
}
