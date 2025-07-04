import { sanityFetch } from "lib/sanity/sanity.live";
import { queryNavbarData } from "lib/sanity/sanity.queries";
import type { QueryNavbarDataResult } from "lib/sanity/sanity.types";

import { Logo } from "../logo";
import { NavbarClient, NavbarSkeletonResponsive } from "./navbar-client";

export async function NavbarServer() {
  const navbarData = await sanityFetch({ query: queryNavbarData });
  return <Navbar navbarData={navbarData.data} />;
}

export function Navbar({ navbarData }: { navbarData: QueryNavbarDataResult }) {
  const { logo, siteTitle } = navbarData ?? {};

  return (
    <header className="py-4 border-b border-black">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="grid grid-cols-[auto_1fr] items-center gap-4">
          <Logo src={logo} alt={siteTitle} priority />

          <NavbarClient navbarData={navbarData} />
        </nav>
      </div>
    </header>
  );
}

export function NavbarSkeleton() {
  return (
    <header className="h-[75px] py-4 md:border-b">
      <div className="container mx-auto px-4 md:px-6">
        <nav className="grid grid-cols-[auto_1fr] items-center gap-4">
          <div className="h-[40px] w-[170px] rounded animate-pulse bg-muted" />
          <NavbarSkeletonResponsive />
        </nav>
      </div>
    </header>
  );
}
