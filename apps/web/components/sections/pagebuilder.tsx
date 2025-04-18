"use client";
import { useOptimistic } from "@sanity/visual-editing/react";
import { dataset, projectId, studioUrl } from "lib/sanity/sanity.api";
import type { QueryHomePageDataResult } from "lib/sanity/sanity.types";
import { createDataAttribute, type SanityDocument } from "next-sanity";
import type { ComponentType } from "react";
import type { PagebuilderType } from "types";

import { BannerBlock } from "./banner";
import { CTABlock } from "./cta";
import { FaqSection } from "./faq-section";
import { FeatureCardsWithIcon } from "./feature-cards-with-icon";
import { ImageLinkCards } from "./image-link-cards";
import { ImageWithText } from "./image-with-text";
import { LeadingText } from "./leading-text";
import { MediaBlock } from "./media";
import { PricingSection } from "./pricing";
import { RichTextSection } from "./rich-text-section";

type PageBlock = NonNullable<
  NonNullable<QueryHomePageDataResult>["pageBuilder"]
>[number];

export type PageBuilderProps = {
  pageBuilder: PageBlock[];
  id: string;
  type: string;
};

type PageData = {
  _id: string;
  _type: string;
  pageBuilder?: PageBlock[];
};

const BLOCK_COMPONENTS = {
  cta: CTABlock,
  faqSection: FaqSection,
  banner: BannerBlock,
  featureCardsIcon: FeatureCardsWithIcon,
  imageLinkCards: ImageLinkCards,
  leadingText: LeadingText,
  imageWithText: ImageWithText,
  pricingSection: PricingSection,
  richTextSection: RichTextSection,
  mediaBlock: MediaBlock,
} as const;

type BlockType = keyof typeof BLOCK_COMPONENTS;

export function PageBuilder({
  pageBuilder: initialPageBuilder = [],
  id,
  type,
}: PageBuilderProps) {
  const pageBuilder = useOptimistic<PageBlock[], SanityDocument<PageData>>(
    initialPageBuilder,
    (currentPageBuilder, action) => {
      if (action.id === id && action.document.pageBuilder) {
        return action.document.pageBuilder;
      }

      return currentPageBuilder;
    },
  );

  return (
    <main
      className="flex flex-col gap-12 mx-auto my-12 lg:my-24 lg:gap-24"
      data-sanity={createDataAttribute({
        id: id,
        baseUrl: studioUrl,
        projectId: projectId,
        dataset: dataset,
        type: type,
        path: "pageBuilder",
      }).toString()}
    >
      {pageBuilder.map((block, index) => {
        const Component = BLOCK_COMPONENTS[block._type] as ComponentType<
          PagebuilderType<BlockType>
        >;

        if (!Component) {
          return (
            <div
              key={`${block._type}-${block._key}`}
              className="flex items-center justify-center p-8 text-center text-muted-foreground bg-muted rounded-lg"
            >
              Component not found for block type: <code>{block._type}</code>
            </div>
          );
        }

        return (
          <div
            key={`${block._type}-${block._key}`}
            data-sanity={createDataAttribute({
              id: id,
              baseUrl: studioUrl,
              projectId: projectId,
              dataset: dataset,
              type: type,
              path: `pageBuilder[_key=="${block._key}"]`,
            }).toString()}
          >
            <Component index={index} {...block} />
          </div>
        );
      })}
    </main>
  );
}
