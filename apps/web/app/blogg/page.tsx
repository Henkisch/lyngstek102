import { cn } from "@workspace/ui/lib/utils";
import { BlogCard, BlogHeader, FeaturedBlogCard } from "components/blog-card";
import { Breadcrumbs } from "components/navigation/breadcrumbs";
import { PageBuilder } from "components/sections/pagebuilder";
import { sanityFetch } from "lib/sanity/sanity.live";
import { queryBlogIndexPageData } from "lib/sanity/sanity.queries";
import { getMetaData } from "lib/seo";

async function fetchBlogPosts() {
  return await sanityFetch({
    query: queryBlogIndexPageData,
  });
}

export async function generateMetadata() {
  const { data } = await fetchBlogPosts();
  if (!data) return getMetaData({});
  return getMetaData(data);
}

export default async function BlogIndexPage() {
  const { data } = await fetchBlogPosts();
  if (!data) return null;
  const {
    featuredBlog,
    blogs = [],
    title,
    description,
    pageBuilder,
    _id,
    _type,
    breadcrumb,
  } = data ?? {};

  return (
    <main className="">
      {breadcrumb && <Breadcrumbs breadcrumb={breadcrumb} />}

      <div
        className={cn("container mx-auto px-4 md:px-6", {
          ["mb-12 lg:mb-24"]: !pageBuilder,
        })}
      >
        <div className="flex w-full flex-col gap-12 lg:gap-24">
          <div className="mt-12 lg:mt-24">
            <BlogHeader
              title={title}
              description={description}
              badge="Vad har hänt?"
            />
          </div>

          <div className="flex w-full flex-col gap-4 mx-auto lg:gap-8">
            {featuredBlog && (
              <div className="w-full">
                <FeaturedBlogCard blog={featuredBlog} />
              </div>
            )}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
              {blogs.map((blog: any, index: number) => (
                <BlogCard key={`${blog?._id}-${index}`} blog={blog} />
              ))}
            </div>
          </div>
        </div>
      </div>

      {pageBuilder && (
        <PageBuilder pageBuilder={pageBuilder ?? []} id={_id} type={_type} />
      )}
    </main>
  );
}
