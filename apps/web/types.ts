import type { QueryHomePageDataResult } from "./lib/sanity/sanity.types";

export type PageBuilderBlockTypes = NonNullable<
  NonNullable<QueryHomePageDataResult>["pageBuilder"]
>[number]["_type"];

export type PagebuilderType<T extends PageBuilderBlockTypes> = Extract<
  NonNullable<NonNullable<QueryHomePageDataResult>["pageBuilder"]>[number],
  { _type: T }
> & { index: number };

export type SanityButtonProps = NonNullable<
  NonNullable<PagebuilderType<"banner">>["buttons"]
>[number];

export type SanityImageProps = NonNullable<
  NonNullable<PagebuilderType<"banner">>["image"]
>;

export type SanityRichTextProps = NonNullable<
  NonNullable<PagebuilderType<"banner">>["richText"]
>;

export type SanityRichTextBlock = Extract<
  NonNullable<NonNullable<SanityRichTextProps>[number]>,
  { _type: "block" }
>;

export type Maybe<T> = T | null | undefined;
