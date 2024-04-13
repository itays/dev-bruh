"use client";
import { useRouter } from "next/navigation";
import { Badge } from "./ui/badge";
import { type MouseEvent } from "react";

export function TagsList({ tags }: { tags: string[] }) {
  const router = useRouter();

  function onBadgeClick(
    event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) {
    router.push(`/?search=${event.currentTarget.dataset.tag?.trim()}`);
  }
  return (
    <div className="flex gap-2">
      {tags.map((tag) => (
        <Badge
          onClick={onBadgeClick}
          key={tag}
          data-tag={tag}
          className="cursor-pointer"
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
