"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

type RepoAvatarProps = {
  src: string;
  alt: string;
  label: string;
  className?: string;
};

export function RepoAvatar({ src, alt, label, className }: RepoAvatarProps) {
  const [failed, setFailed] = useState(false);

  return (
    <span
      role="img"
      aria-label={alt}
      className={cn(
        "grid size-6 shrink-0 place-items-center overflow-hidden rounded-full border border-rule bg-surface-2 sm:size-7",
        className,
      )}
    >
      {failed ? (
        <span
          aria-hidden="true"
          className="font-mono text-[0.6rem] uppercase leading-none text-mute"
        >
          {label.slice(0, 1)}
        </span>
      ) : (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img
          src={src}
          alt=""
          width={28}
          height={28}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          className="size-full object-cover"
          onError={() => setFailed(true)}
        />
      )}
    </span>
  );
}
