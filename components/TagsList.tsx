import { Badge } from "./ui/badge";

export function TagsList({ tags }: { tags: string[] }) {
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}
