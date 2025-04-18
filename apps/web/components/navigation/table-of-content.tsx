import { buttonVariants } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import type { PortableTextBlock } from "next-sanity";
import { convertToSlug } from "utils";

interface TableOfContentProps<T> {
  richText?: T | null;
}

interface ProcessedHeading {
  href: string;
  text: string;
}

function filterHeadings(
  richText?: PortableTextBlock[] | null,
): ProcessedHeading[] {
  if (!Array.isArray(richText)) return [];

  return richText.reduce<ProcessedHeading[]>((headings, block) => {
    if (block._type !== "block" || !block.style?.startsWith("h")) {
      return headings;
    }
    const text = block.children
      ?.map((child) => child.text)
      .join("")
      .trim();
    if (!text) return headings;
    const slug = convertToSlug(text);
    headings.push({ href: `#${slug}`, text });
    return headings;
  }, []);
}

function TableOfContentLink({ heading }: { heading: ProcessedHeading }) {
  return (
    <li>
      <Link
        href={heading.href}
        className={cn("text-sm justify-start truncate")}
      >
        {heading.text}
      </Link>
    </li>
  );
}

export function TableOfContent<T>({ richText }: TableOfContentProps<T>) {
  const headings = filterHeadings(richText as PortableTextBlock[]);
  if (!headings.length) return null;

  return (
    <div className="flex flex-col">
      <details className="group rounded bg-accent">
        <summary className="flex appearance-none cursor-pointer p-4 items-center justify-between text-sm font-semibold">
          <span>Table of Contents</span>
          <ChevronDown
            className="h-4 w-4 transform transition-transform duration-200 group-open:rotate-180"
            aria-hidden="true"
          />
        </summary>
        <nav className=" px-4 pb-4" aria-label="Table of contents">
          <ul className="flex flex-col font-medium gap-2">
            {headings.map((heading) => (
              <TableOfContentLink
                key={`${heading.href}-${heading.text}-heading`}
                heading={heading}
              />
            ))}
          </ul>
        </nav>
      </details>
    </div>
  );
}
