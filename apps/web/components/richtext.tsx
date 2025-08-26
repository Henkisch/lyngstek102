import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import {
  PortableText,
  type PortableTextBlock,
  type PortableTextReactComponents,
} from "next-sanity";
import { parseChildrenToSlug } from "utils";

import { SanityImage } from "./sanity-image";

const components: Partial<PortableTextReactComponents> = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h2: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h2 id={slug} className="scroll-m-8 text-3xl font-bold tracking-tight">
          {children}
        </h2>
      );
    },
    h3: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h3 id={slug} className="scroll-m-8 text-2xl font-bold tracking-tight">
          {children}
        </h3>
      );
    },
    h4: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h4 id={slug} className="scroll-m-20 text-xl font-bold tracking-tight">
          {children}
        </h4>
      );
    },
    h5: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h5 id={slug} className="scroll-m-20 text-lg font-bold tracking-tight">
          {children}
        </h5>
      );
    },
    h6: ({ children, value }) => {
      const slug = parseChildrenToSlug(value.children);
      return (
        <h6 id={slug} className="scroll-m-20 text-base font-semibold">
          {children}
        </h6>
      );
    },
    inline: ({ children }) => <span>{children}</span>,
  },
  marks: {
    code: ({ children }) => (
      <code className="rounded-md border border-white border-opacity-10  bg-opacity-5 p-1 text-sm  lg:whitespace-nowrap">
        {children}
      </code>
    ),
    customLink: ({ children, value }) => {
      if (!value.href || value.href === "#") {
        console.warn("🚀 link is not set", value);
        return (
          <span className="underline decoration-dotted underline-offset-2">
            Link Broken
          </span>
        );
      }
      return (
        <Link
          className="underline decoration-dotted underline-offset-2"
          href={value.href}
          prefetch={false}
          aria-label={`Link to ${value?.href}`}
          target={value.openInNewTab ? "_blank" : "_self"}
        >
          {children}
        </Link>
      );
    },
  },
  list: {
    bullet: ({ children }) => <ul className="list-disc">{children}</ul>,
    number: ({ children }) => <ol className="list-decimal">{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li className="">{children}</li>,
    number: ({ children }) => <li className="">{children}</li>,
  },
  types: {
    image: ({ value }) => {
      return (
        <div className="my-4">
          <SanityImage
            asset={value}
            className="w-full h-auto rounded-lg"
            width={1600}
            height={900}
            // priority
          />
        </div>
      );
    },
  },
  hardBreak: () => <br />,
};

export function RichText<T>({
  richText,
  className,
}: {
  richText?: T | null;
  className?: string;
}) {
  if (!richText) return null;

  return (
    <div
      className={cn("prose prose-headings:scroll-m-24 max-w-none", className)}
    >
      <PortableText
        value={richText as unknown as PortableTextBlock[]}
        components={components}
        onMissingComponent={(_, { nodeType, type }) =>
          console.log("missing component", nodeType, type)
        }
      />
    </div>
  );
}
