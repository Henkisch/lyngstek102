import { Breadcrumbs } from "components/navigation/breadcrumbs";
import { PageBuilder } from "components/sections/pagebuilder";
import { client } from "lib/sanity/sanity.client";
import { sanityFetch } from "lib/sanity/sanity.live";
import type { Metadata } from "next";
import {
  querySlugPageData,
  querySlugPagePaths,
} from "lib/sanity/sanity.queries";
import { getMetaData } from "lib/seo";
import { notFound } from "next/navigation";

async function fetchSlugPageData(slug: string) {
  return await sanityFetch({
    query: querySlugPageData,
    params: { slug: `/${slug}` },
  });
}

async function fetchSlugPagePaths() {
  const slugs = await client.fetch(querySlugPagePaths);
  const paths: { slug: string[] }[] = [];
  for (const slug of slugs) {
    if (!slug) continue;
    const parts = slug.split("/").filter(Boolean);
    paths.push({ slug: parts });
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string[] };
}): Promise<Metadata> {
  const { slug } = params;
  const slugString = slug.join("/");
  const { data: pageData } = await fetchSlugPageData(slugString);
  if (!pageData) {
    return getMetaData({});
  }
  return getMetaData(pageData);
}

export async function generateStaticParams() {
  return await fetchSlugPagePaths();
}

export default async function SlugPage({
  params,
}: {
  params: { slug: string[] };
}): Promise<JSX.Element> {
  const { slug } = params;
  const slugString = slug.join("/");
  const { data: pageData } = await fetchSlugPageData(slugString);

  if (!pageData) {
    return notFound();
  }

  const { title, pageBuilder, _id, _type, breadcrumb } = pageData ?? {};

  return !Array.isArray(pageBuilder) || pageBuilder?.length === 0 ? (
    <div className="flex flex-col items-start">
      <Breadcrumbs breadcrumb={breadcrumb} />
      <div className="container mx-auto px-4 py-12 md:px-6 lg:py-24">
        <h1 className="text-2xl font-semibold capitalize">{title}</h1>
        <p className="text-muted-foreground">
          This page has no content blocks yet.
        </p>
      </div>
    </div>
  ) : (
    <>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <PageBuilder pageBuilder={pageBuilder} id={_id} type={_type} />
    </>
  );
}
