import { Badge } from "@workspace/ui/components/badge";
import type { PagebuilderType } from "types";

import { RichText } from "../richtext";
import { SanityIcon } from "../sanity-icon";

type FeatureCardsWithIconProps = PagebuilderType<"featureCardsIcon">;

type FeatureCardProps = {
  card: NonNullable<FeatureCardsWithIconProps["cards"]>[number];
  index?: number;
};

function FeatureCard({ card, index }: FeatureCardProps) {
  const { icon, title, richText } = card ?? {};
  return (
    <div className="flex flex-col gap-8 rounded bg-accent p-6 md:min-h-[300px]">
      {icon && (
        <span className="flex w-fit p-3 items-center justify-center rounded-full bg-background">
          <SanityIcon icon={icon} />
        </span>
      )}

      <div className="flex flex-col gap-2">
        {index === 0 ? (
          <h2 className="text-lg font-bold tracking-tight md:text-2xl">
            {title}
          </h2>
        ) : (
          <h3 className="text-lg font-bold tracking-tight md:text-2xl">
            {title}
          </h3>
        )}
        <RichText
          richText={richText}
          className="font-normal text-sm md:text-[16px] text-foreground/90 leading-7 text-balance"
        />
      </div>
    </div>
  );
}

export function FeatureCardsWithIcon({
  badge,
  title,
  richText,
  cards,
  index,
}: FeatureCardsWithIconProps) {
  return (
    <section className="">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex w-full flex-col items-start">
          <div className="flex flex-col gap-4 items-start">
            {badge && <Badge variant="secondary">{badge}</Badge>}
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
              className="text-base md:text-lg text-balance max-w-3xl"
            />
          </div>
        </div>
        <div className="mx-auto mt-6 grid gap-6 md:mt-8 lg:grid-cols-3">
          {cards?.map((card, index) => (
            <FeatureCard
              key={`FeatureCard-${card?._key}-${index}`}
              card={card}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
