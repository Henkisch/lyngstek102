import { Breadcrumbs } from "components/navigation/breadcrumbs";
import { TableOfContent } from "components/navigation/table-of-content";
import { RichText } from "components/richtext";
import { SanityImage } from "components/sanity-image";
import { client } from "lib/sanity/sanity.client";
import { sanityFetch } from "lib/sanity/sanity.live";
import {
  queryBlogPaths,
  queryBlogSlugPageData,
} from "lib/sanity/sanity.queries";
import { getMetaData } from "lib/seo";
import { notFound } from "next/navigation";

async function fetchBlogSlugPageData(slug: string) {
  return await sanityFetch({
    query: queryBlogSlugPageData,
    params: { slug: `/blog/${slug}` },
  });
}

async function fetchBlogPaths() {
  const slugs = await client.fetch(queryBlogPaths);
  const paths: { slug: string }[] = [];
  for (const slug of slugs) {
    if (!slug) continue;
    const [, , path] = slug.split("/");
    if (path) paths.push({ slug: path });
  }
  return paths;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchBlogSlugPageData(slug);
  if (!data) return getMetaData({});
  return getMetaData(data);
}

export async function generateStaticParams() {
  return await fetchBlogPaths();
}

export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { data } = await fetchBlogSlugPageData(slug);
  if (!data) return notFound();
  const { title, description, image, richText, breadcrumb } = data ?? {};

  return (
    <div>
      <Breadcrumbs breadcrumb={breadcrumb} />
      <div className="mx-auto max-w-screen-md px-4 md:px-6 py-12 lg:py-24">
        <div className="flex flex-col gap-8 w-full">
          <main className="w-full">
            <header className="">
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="mt-4 text-lg md:mt-6">{description}</p>
            </header>
            {image && (
              <div className="mt-4 md:mt-6">
                <SanityImage
                  asset={image}
                  alt={title}
                  width={1600}
                  loading="eager"
                  priority
                  height={900}
                  className="rounded h-auto w-full"
                />
              </div>
            )}
            <div className="my-4 md:my-6">
              <TableOfContent richText={richText} />
            </div>
            <RichText richText={richText ?? []} />
          </main>
        </div>
      </div>
    </div>
  );
}
