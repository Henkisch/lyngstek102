import { sanityFetch } from "lib/sanity/sanity.live";
import { queryFooterData } from "lib/sanity/sanity.queries";
import type { QueryFooterDataResult } from "lib/sanity/sanity.types";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

import { Logo } from "./logo";
import { LinkedinIcon, XIcon, YoutubeIcon } from "./social-icons";

interface SocialLinksProps {
  data: NonNullable<QueryFooterDataResult>["socialLinks"];
}

interface FooterProps {
  data: NonNullable<QueryFooterDataResult>;
}

async function fetchFooterData() {
  const response = await sanityFetch({
    query: queryFooterData,
  });
  return response;
}

export async function FooterServer() {
  const footerData = await fetchFooterData();
  if (!footerData?.data) return <FooterSkeleton />;
  return <Footer data={footerData.data} />;
}

function SocialLinks({ data }: SocialLinksProps) {
  if (!data) return null;

  const { facebook, twitter, instagram, youtube, linkedin } = data;

  const socialLinks = [
    {
      url: instagram,
      Icon: Instagram,
      label: "Follow us on Instagram",
    },
    { url: facebook, Icon: Facebook, label: "Follow us on Facebook" },
    { url: twitter, Icon: XIcon, label: "Follow us on Twitter" },
    { url: linkedin, Icon: LinkedinIcon, label: "Follow us on LinkedIn" },
    {
      url: youtube,
      Icon: YoutubeIcon,
      label: "Subscribe to our YouTube channel",
    },
  ].filter((link) => link.url);

  return (
    <ul className="flex items-center gap-4 text-foreground">
      {socialLinks.map(({ url, Icon, label }, index) => (
        <li
          key={`social-link-${url}-${index.toString()}`}
          className="font-medium hover:text-primary"
        >
          <Link
            href={url ?? "#"}
            target="_blank"
            prefetch={false}
            rel="noopener noreferrer"
            aria-label={label}
            className="fill-current"
          >
            <Icon className="size-6" />
            <span className="sr-only">{label}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function FooterSkeleton() {
  return (
    <section className="">
      <div className="container mx-auto px-4 md:px-6">
        <footer className="">
          <div className="flex flex-col items-center justify-between gap-10 lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              <div>
                <span className="flex items-center justify-center gap-4 lg:justify-start">
                  <div className="h-[40px] w-[80px] bg-muted rounded animate-pulse" />
                </span>
                <div className="mt-6 h-16 w-full bg-muted rounded animate-pulse" />
              </div>
              <div className="flex items-center space-x-6">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="h-6 w-6 bg-muted rounded animate-pulse"
                  />
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {[1, 2, 3].map((col) => (
                <div key={col}>
                  <div className="mb-6 h-6 w-24 bg-muted rounded animate-pulse" />
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((item) => (
                      <div
                        key={item}
                        className="h-4 w-full bg-muted rounded animate-pulse"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t pt-8 lg:flex-row lg:items-center lg:text-left">
            <div className="h-4 w-48 bg-muted rounded animate-pulse" />
            <div className="flex justify-center gap-4 lg:justify-start">
              <div className="h-4 w-32 bg-muted rounded animate-pulse" />
              <div className="h-4 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}

function Footer({ data }: FooterProps) {
  const { logo, subtitle, columns, socialLinks, siteTitle } = data;
  const year = new Date().getFullYear();

  return (
    <section className="border-t pt-12 lg:pt-24">
      <div className="">
        <footer className="">
          <div className="flex container mx-auto flex-col items-start justify-between gap-12 px-4 md:px-6 lg:gap-16">
            <div className="flex w-full max-w-80 shrink flex-col items-start gap-4 lg:items-start">
              <div>
                <span className="flex items-start gap-4">
                  <Logo src={logo} alt={siteTitle} priority />
                </span>
                {subtitle && (
                  <p className="mt-4 text-sm text-muted-foreground">
                    {subtitle}
                  </p>
                )}
              </div>
              {socialLinks && <SocialLinks data={socialLinks} />}
            </div>
            {Array.isArray(columns) && columns?.length > 0 && (
              <div className="grid w-full grid-cols-2 gap-6 lg:grid-cols-3 lg:gap-12 xl:grid-cols-4">
                {columns.map((column, index) => (
                  <div key={`column-${column?._key}-${index}`}>
                    <h3 className="mb-4 font-semibold">{column?.title}</h3>
                    {column?.links && column?.links?.length > 0 && (
                      <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                        {column?.links?.map((link, index) => (
                          <li
                            key={`${link?._key}-${index}-column-${column?._key}`}
                            className="font-medium hover:text-primary"
                          >
                            <Link
                              href={link.href ?? "#"}
                              target={link.openInNewTab ? "_blank" : undefined}
                              rel={
                                link.openInNewTab
                                  ? "noopener noreferrer"
                                  : undefined
                              }
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-12 border-t lg:mt-24">
            <div className="container mx-auto px-4 md:px-6">
              <div className="flex py-2 flex-col justify-between items-center gap-4 text-xs font-normal text-muted-foreground lg:flex-row lg:items-center lg:text-left mx-auto">
                <p>
                  © {year} {siteTitle}. All rights reserved.
                </p>
                <p>
                  By{" "}
                  <Link
                    href={"https://larssonhenrik.com"}
                    target="_blank"
                    prefetch={false}
                    rel="noopener noreferrer"
                    aria-label={"Henrik Larsson - Frontend developer"}
                    className="fill-current transition underline-offset-2 decoration-transparent underline hover:text-primary hover:decoration-primary"
                  >
                    Henrik Larsson
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
