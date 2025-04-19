import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import type { PagebuilderType } from "types";

import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";

type BannerBlockProps = PagebuilderType<"banner">;

export function BannerBlock({
  title,
  buttons,
  badge,
  image,
  richText,
  index,
}: BannerBlockProps) {
  return (
    <section className="flex flex-col relative w-full overflow-clip">
      <div
        className={cn("w-full relative container mx-auto px-4 md:px-6", {
          ["pb-8 lg:pb-12"]: image,
        })}
      >
        <div
          className={cn("flex flex-col items-start gap-4 max-w-2xl", {
            // ["text-center items-center justify-center mx-auto"]: !image,
          })}
        >
          {badge && (
            <Badge variant="secondary" className="inline-flex">
              {badge}
            </Badge>
          )}

          {index === 0 ? (
            <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
              {title}
            </h1>
          ) : (
            <h2 className="text-3xl font-bold tracking-tight md:text-5xl">
              {title}
            </h2>
          )}

          <RichText
            richText={richText}
            className="text-base md:text-lg font-normal text-foreground/90"
          />
          <SanityButtons
            buttons={buttons}
            buttonClassName="w-full sm:w-auto mt-4"
            className="w-full sm:w-fit grid gap-2 sm:grid-flow-col sm:justify-center lg:justify-start"
          />
        </div>
      </div>
      {image && (
        <SanityImage
          asset={image}
          loading="eager"
          priority
          quality={100}
          sizes="100vw"
          className="object-cover aspect-video md:aspect-[3/1.5]"
          alt={image.alt || "Banner image"}
        />
      )}
    </section>
  );
}
