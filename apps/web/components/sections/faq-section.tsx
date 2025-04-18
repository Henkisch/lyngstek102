import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Badge } from "@workspace/ui/components/badge";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { PagebuilderType } from "types";

import { RichText } from "../richtext";
import { cn } from "@workspace/ui/lib/utils";

type FaqSectionProps = PagebuilderType<"faqSection">;

export function FaqSection({
  badge,
  title,
  subtitle,
  faqs,
  link,
  index,
}: FaqSectionProps) {
  return (
    <section className="">
      <div className="container mx-auto px-4 md:px-6">
        <div className="">
          <div className="flex flex-col items-start gap-4 mx-auto md:gap-6">
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

            {subtitle && index === 0 ? (
              <h2 className="text-lg text-balance">{subtitle}</h2>
            ) : (
              <h3 className="text-lg text-balance">{subtitle}</h3>
            )}
          </div>
        </div>
        <div
          className={cn("", {
            ["mt-4 md:mt-6"]: subtitle,
          })}
        >
          <Accordion
            type="single"
            collapsible
            className="w-full"
            defaultValue="3"
          >
            {faqs?.map((faq, index) => (
              <AccordionItem
                value={faq?._id}
                key={`AccordionItem-${faq?._id}-${index}`}
                className="py-2"
              >
                <AccordionTrigger className="py-2 text-[15px] leading-6 hover:no-underline group">
                  {faq?.title}
                </AccordionTrigger>
                <AccordionContent className="pb-2 text-muted-foreground">
                  <RichText
                    richText={faq?.richText ?? []}
                    className="text-sm md:text-base"
                  />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {link?.href && (
            <div className="w-full py-6">
              <p className="mb-1 text-xs">{link?.title}</p>
              <Link
                href={link.href ?? "#"}
                target={link.openInNewTab ? "_blank" : "_self"}
                className="flex items-center gap-2"
              >
                <p className="text-[15px] font-[500] leading-6">
                  {link?.description}
                </p>
                <span className="rounded-full border p-1">
                  <ArrowUpRight size={16} className="text-[#374151]" />
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
