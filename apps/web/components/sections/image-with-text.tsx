import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import type { PagebuilderType } from "types";

import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";
import { SanityImage } from "../sanity-image";

type ImageWithTextProps = PagebuilderType<"imageWithText">;

export function ImageWithText({
  title,
  buttons,
  badge,
  image,
  richText,
  index,
  layout,
}: ImageWithTextProps) {
  return (
    <section className="">
      <div className="container mx-auto px-4 md:px-6">
        <div
          className={cn("grid gap-8 lg:grid-cols-12 lg:items-center lg:gap-12")}
        >
          <div className="flex flex-col gap-4 h-full items-start lg:justify-center lg:col-span-6 lg:gap-6">
            {badge && <Badge variant="secondary">{badge}</Badge>}

            <div className="flex flex-col gap-4">
              {index === 0 ? (
                <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-balance">
                  {title}
                </h1>
              ) : (
                <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-balance">
                  {title}
                </h2>
              )}

              <RichText
                richText={richText}
                className="text-base md:text-lg font-normal"
              />
            </div>

            <div className="w-full">
              <SanityButtons
                buttons={buttons}
                buttonClassName="w-full sm:w-auto"
                className="w-full sm:w-fit grid gap-2 sm:grid-flow-col lg:justify-start"
              />
            </div>
          </div>

          {image && (
            <div
              className={cn("aspect-[3/2] w-full lg:col-span-6", {
                "lg:order-first": layout === "imageFirst",
                "lg:order-last": layout === "textFirst",
              })}
            >
              <SanityImage
                asset={image}
                width={1200}
                height={800}
                quality={100}
                className="w-full rounded object-cover"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
