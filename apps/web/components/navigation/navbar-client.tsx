"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@workspace/ui/components/accordion";
import { Button, buttonVariants } from "@workspace/ui/components/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@workspace/ui/components/navigation-menu";
import {
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@workspace/ui/components/sheet";
import { Sheet, SheetTrigger } from "@workspace/ui/components/sheet";
import { cn } from "@workspace/ui/lib/utils";
import { useIsMobile } from "hooks/use-is-mobile";
import type { QueryNavbarDataResult } from "lib/sanity/sanity.types";
import { Menu } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Logo } from "../logo";
import { SanityButtons } from "../sanity-buttons";
import { SanityIcon } from "../sanity-icon";
import { ModeToggle } from "./mode-toggle";

interface MenuItem {
  title: string;
  description: string;
  icon: JSX.Element;
  href?: string;
}

function MenuItemLink({
  item,
  setIsOpen,
}: {
  item: MenuItem;
  setIsOpen?: (isOpen: boolean) => void;
}) {
  return (
    <Link
      className={cn(
        "flex select-none gap-4 rounded p-3 leading-none outline-none transition-colors hover:bg-accent hover:text-accent-foreground items-center focus:bg-accent focus:text-accent-foreground",
      )}
      aria-label={`Link to ${item.title ?? item.href}`}
      onClick={() => setIsOpen?.(false)}
      href={item.href ?? "/"}
    >
      {item.icon}
      <div className="">
        <div className="text-sm font-semibold">{item.title}</div>
        <p className="text-sm leading-snug text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
    </Link>
  );
}

function MobileNavbarAccordionColumn({
  column,
  setIsOpen,
}: {
  column: NonNullable<NonNullable<QueryNavbarDataResult>["columns"]>[number];
  setIsOpen: (isOpen: boolean) => void;
}) {
  if (column.type !== "column") return null;
  return (
    <AccordionItem value={column.title ?? column._key} className="border-b-0">
      <AccordionTrigger className="mb-4 py-0 font-semibold hover:no-underline hover:bg-accent hover:text-accent-foreground pr-2 rounded-md">
        <div
          className={cn(buttonVariants({ variant: "ghost" }), "justify-start")}
        >
          {column.title}
        </div>
      </AccordionTrigger>
      <AccordionContent className="mt-2">
        {column.links?.map((item) => (
          <MenuItemLink
            key={item._key}
            setIsOpen={setIsOpen}
            item={{
              description: item.description ?? "",
              href: item.href ?? "",
              icon: <SanityIcon icon={item.icon} className="size-5 shrink-0" />,
              title: item.name ?? "",
            }}
          />
        ))}
      </AccordionContent>
    </AccordionItem>
  );
}

function MobileNavbar({ navbarData }: { navbarData: QueryNavbarDataResult }) {
  const { logo, siteTitle, columns, buttons } = navbarData ?? {};
  const [isOpen, setIsOpen] = useState(false);

  const path = usePathname();

  // biome-ignore lint/correctness/useExhaustiveDependencies: This is intentional
  useEffect(() => {
    setIsOpen(false);
  }, [path]);
  return (
    <div className="flex justify-self-end items-center gap-2">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <div className="flex justify-end">
          <SheetTrigger asChild>
            <Button className="" variant="outline" size="icon">
              <Menu className="!size-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
        </div>
        <SheetContent className="overflow-y-auto">
          <SheetHeader>
            <SheetTitle className="items-start">
              <Logo src={logo} alt={siteTitle} />
            </SheetTitle>
          </SheetHeader>

          <div className="mb-8 mt-8 flex flex-col gap-4">
            {columns?.map((column) => {
              if (column.type === "link") {
                return (
                  <Link
                    key={`column-link-${column.name}-${column._key}`}
                    href={column.href ?? ""}
                    onClick={() => setIsOpen(false)}
                    // className={cn(
                    //   buttonVariants({ variant: "ghost" }),
                    //   "justify-start",
                    // )}
                  >
                    {column.name}
                  </Link>
                );
              }
              return (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full"
                  key={column._key}
                >
                  <MobileNavbarAccordionColumn
                    column={column}
                    setIsOpen={setIsOpen}
                  />
                </Accordion>
              );
            })}
          </div>
          <SanityButtons
            buttons={buttons ?? []}
            buttonClassName="w-full"
            className="flex mt-2 flex-col gap-3"
          />
        </SheetContent>
      </Sheet>
    </div>
  );
}

function NavbarColumnLink({
  column,
}: {
  column: NonNullable<NonNullable<QueryNavbarDataResult>["columns"]>[number];
}) {
  if (column.type !== "link") return null;
  return (
    <Link
      className={cn(
        "text-sm px-4 py-2 font-medium rounded text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
      aria-label={`Link to ${column.name ?? column.href}`}
      href={column.href ?? ""}
    >
      {column.name}
    </Link>
  );
}

function NavbarColumn({
  column,
}: {
  column: NonNullable<NonNullable<QueryNavbarDataResult>["columns"]>[number];
}) {
  if (column.type !== "column") return null;
  return (
    <NavigationMenuList>
      <NavigationMenuItem className="text-muted-foreground">
        <NavigationMenuTrigger>{column.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            {column.links?.map((item) => (
              <li key={item._key}>
                <MenuItemLink
                  item={{
                    description: item.description ?? "",
                    href: item.href ?? "",
                    icon: (
                      <SanityIcon
                        icon={item.icon}
                        className="size-5 shrink-0"
                      />
                    ),
                    title: item.name ?? "",
                  }}
                />
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  );
}

export function DesktopNavbar({
  navbarData,
}: {
  navbarData: QueryNavbarDataResult;
}) {
  const { columns, buttons } = navbarData ?? {};

  return (
    <div className="grid w-full items-center gap-8">
      <div className="justify-self-end flex items-center gap-4">
        <NavigationMenu className="">
          {columns?.map((column) =>
            column.type === "column" ? (
              <NavbarColumn key={`nav-${column._key}`} column={column} />
            ) : (
              <NavbarColumnLink key={`nav-${column._key}`} column={column} />
            ),
          )}
        </NavigationMenu>
        <SanityButtons
          buttons={buttons ?? []}
          className="flex items-center gap-4"
          buttonClassName="rounded"
        />
      </div>
    </div>
  );
}

const ClientSideNavbar = ({
  navbarData,
}: {
  navbarData: QueryNavbarDataResult;
}) => {
  const isMobile = useIsMobile();

  if (isMobile === undefined) {
    return null; // Return null on initial render to avoid hydration mismatch
  }

  return isMobile ? (
    <MobileNavbar navbarData={navbarData} />
  ) : (
    <DesktopNavbar navbarData={navbarData} />
  );
};

function SkeletonMobileNavbar() {
  return (
    <div className="md:hidden">
      <div className="flex justify-end">
        <div className="h-12 w-12 rounded-md bg-muted animate-pulse" />
      </div>
    </div>
  );
}

function SkeletonDesktopNavbar() {
  return (
    <div className="hidden md:grid grid-cols-[1fr_auto] items-center gap-8 w-full">
      <div className="justify-center flex max-w-max flex-1 items-center gap-2">
        {Array.from({ length: 2 }).map((_, index) => (
          <div
            key={`nav-item-skeleton-${index.toString()}`}
            className="h-12 w-32 rounded bg-muted animate-pulse"
          />
        ))}
      </div>

      <div className="justify-self-end">
        <div className="flex items-center gap-4">
          {Array.from({ length: 2 }).map((_, index) => (
            <div
              key={`nav-button-skeleton-${index.toString()}`}
              className="h-12 w-32 rounded bg-muted animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function NavbarSkeletonResponsive() {
  return (
    <>
      <SkeletonMobileNavbar />
      <SkeletonDesktopNavbar />
    </>
  );
}

// Dynamically import the navbar with no SSR to avoid hydration issues
export const NavbarClient = dynamic(() => Promise.resolve(ClientSideNavbar), {
  ssr: false,
  loading: () => <NavbarSkeletonResponsive />,
});
