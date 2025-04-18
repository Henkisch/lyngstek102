import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@workspace/ui/components/breadcrumb";
import React from "react";
import Link from "next/link";

interface BreadcrumbItem {
  title: string;
  href: string;
  _type: string;
  _id: string;
}

interface BreadCrumbProps {
  breadcrumb: BreadcrumbItem[];
}

const parseIntermediateBreadcrumbs = (
  breadcrumb: BreadcrumbItem[],
): BreadcrumbItem[] => {
  if (breadcrumb.length !== 2) return breadcrumb;

  const [home, current] = breadcrumb;

  if (!home || !current || typeof current.href !== "string") {
    return breadcrumb;
  }

  // Check if current exists and has an href property
  if (!current || typeof current.href !== "string") {
    return breadcrumb;
  }

  const segments = current.href.split("/").filter(Boolean);

  const intermediateBreadcrumbs = segments
    .slice(0, -1)
    .map((segment, index) => {
      const href = "/" + segments.slice(0, index + 1).join("/");
      return {
        title: segment.charAt(0).toUpperCase() + segment.slice(1),
        href,
        _type: "intermediate",
        _id: `intermediate-${index}`,
      };
    });

  return [home, ...intermediateBreadcrumbs, current];
};

export const Breadcrumbs = ({ breadcrumb }: BreadCrumbProps) => {
  const expandedBreadcrumb = parseIntermediateBreadcrumbs(breadcrumb);

  return (
    <div className="container mx-auto mt-2">
      <Breadcrumb>
        <BreadcrumbList className="px-4 md:px-6">
          {expandedBreadcrumb.map((item, index) => {
            const isLast = index === expandedBreadcrumb.length - 1;

            if (isLast) {
              return (
                <BreadcrumbItem key={item._id}>
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                </BreadcrumbItem>
              );
            }

            return (
              <React.Fragment key={item._id}>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={item.href}>{item.title}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
