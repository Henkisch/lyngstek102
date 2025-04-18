import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import type { PagebuilderType } from "types";

import { CTACard } from "../image-link-card";
import { RichText } from "../richtext";

export type ImageLinkCardsProps = PagebuilderType<"imageLinkCards">;

export function ImageLinkCards({
  richText,
  title,
  badge,
  cards,
  index,
}: ImageLinkCardsProps) {
  return (
    <section className="">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col">
          <div className="flex flex-col items-start gap-4 max-w-3xl">
            {badge && <Badge variant="secondary">{badge}</Badge>}

            {index === 0 ? (
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-balance">
                {title}
              </h1>
            ) : (
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-balance">
                {title}
              </h2>
            )}
            <RichText richText={richText} className="text-balance" />
          </div>

          {/* Social Media Grid */}
          {Array.isArray(cards) && cards.length > 0 && (
            <div className="grid items-start mt-6 w-full grid-cols-1 gap-4 md:mt-8 sm:grid-cols-2 lg:grid-cols-4">
              {cards?.map((card) => (
                <CTACard key={card._key} card={card} index={index} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
