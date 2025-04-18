"use client";

import { cn } from "@workspace/ui/lib/utils";
import { SanityImage } from "components/sanity-image";
import { stegaClean } from "next-sanity";
import type { PagebuilderType } from "types";

type MediaBlockProps = PagebuilderType<"mediaBlock">;

export function MediaBlock({
  mediaType,
  mediaWidth,
  image,
  videoUrl,
}: MediaBlockProps) {
  return (
    <section
      className={cn("relative", {
        "container mx-auto px-4 md:px-6":
          stegaClean(mediaWidth) === "contained",
      })}
    >
      <div className={cn("relative")}>
        {image && (
          <SanityImage
            asset={image}
            quality={100}
            className={cn("w-full rounded object-cover", {
              ["rounded overflow-hidden"]:
                stegaClean(mediaWidth) === "contained",
            })}
          />
        )}
      </div>
    </section>
  );
}
