import { Badge } from "@workspace/ui/components/badge";
import type { PagebuilderType } from "types";

import { RichText } from "../richtext";
import { SanityButtons } from "../sanity-buttons";

export type CTABlockProps = PagebuilderType<"cta">;

export function CTABlock({
  richText,
  title,
  badge,
  buttons,
  index,
}: CTABlockProps) {
  return (
    <section className="">
      <div className="container mx-auto px-4 md:px-6">
        <div className="bg-muted py-16 rounded px-4 md:px-6">
          <div className="flex flex-col gap-4 items-center justify-start text-center max-w-3xl mx-auto">
            {badge && (
              <Badge
                variant="secondary"
                className="bg-background text-foreground dark:bg-foreground dark:text-background"
              >
                {badge}
              </Badge>
            )}

            {index === 0 ? (
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl text-balance">
                {title}
              </h1>
            ) : (
              <h2 className="text-3xl font-bold tracking-tight md:text-5xl text-balance">
                {title}
              </h2>
            )}

            <div className="text-lg text-muted-foreground">
              <RichText
                richText={richText}
                className="text-balance lg:prose-lg"
              />
            </div>
            <div className="flex justify-center mt-6 w-full">
              <SanityButtons
                buttons={buttons}
                buttonClassName="w-full sm:w-auto"
                className="w-full sm:w-fit grid gap-2 sm:grid-flow-col lg:justify-start"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
