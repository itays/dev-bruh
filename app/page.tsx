import { Button } from "@/components/ui/button";
import { db } from "@/lib/db/db";

export default async function Home() {
  const rooms = await db.query.room.findMany();
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {rooms.map(({ name, description, language, githubRepo, id }, index) => (
        <div key={id}>
          <h2>{name}</h2>
          <p>{description}</p>
          <p>{language}</p>
          <p>{githubRepo}</p>
          <Button>Join</Button>
        </div>
      ))}
    </main>
  );
}
