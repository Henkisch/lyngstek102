import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import type { PagebuilderType } from "types";

import { SanityImage } from "./sanity-image";

export type CTACardProps = {
  card: NonNullable<PagebuilderType<"imageLinkCards">["cards"]>[number];
  className?: string;
  index?: number;
};

export function CTACard({ card, className, index }: CTACardProps) {
  const { image, description, title, href } = card ?? {};

  return (
    <Link
      href={href ?? "#"}
      className={cn(
        "rounded transition-colors relative overflow-hidden group flex flex-col gap-2 justify-end",
        className,
      )}
    >
      {image?.asset && (
        <div className="aspect-square rounded overflow-hidden">
          <SanityImage
            asset={image}
            quality={100}
            width={400}
            height={400}
            className="object-cover"
          />
        </div>
      )}
      <div className="flex flex-col gap-1">
        {index === 0 ? (
          <h2 className="text-xl font-bold tracking-tight">{title}</h2>
        ) : (
          <h3 className="text-xl font-bold tracking-tight">{title}</h3>
        )}

        <p className="text-sm">{description}</p>
      </div>
    </Link>
  );
}
