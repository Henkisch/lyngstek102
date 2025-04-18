import Link from "next/link";

import type { QueryBlogIndexPageDataResult } from "lib/sanity/sanity.types";

import { SanityImage } from "./sanity-image";
import { Badge } from "@workspace/ui/components/badge";

type Blog = NonNullable<
  NonNullable<QueryBlogIndexPageDataResult>["featuredBlog"]
>;

interface BlogImageProps {
  image: Blog["image"];
  title?: string | null;
}

function BlogImage({ image, title }: BlogImageProps) {
  if (!image?.asset) return null;

  return (
    <SanityImage
      asset={image}
      width={800}
      height={400}
      alt={title ?? "Blog post image"}
      className="aspect-[16/9] w-full rounded bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2]"
    />
  );
}

interface AuthorImageProps {
  author: Blog["authors"];
}

function AuthorImage({ author }: AuthorImageProps) {
  if (!author?.image) return null;

  return (
    <SanityImage
      asset={author.image}
      width={40}
      height={40}
      alt={author.name ?? "Author image"}
      className="size-8 flex-none rounded-full bg-gray-50"
    />
  );
}

interface BlogAuthorProps {
  author: Blog["authors"];
}

export function BlogAuthor({ author }: BlogAuthorProps) {
  if (!author) return null;

  return (
    <div className="flex items-center gap-x-2.5 text-sm/6 font-semibold text-gray-900">
      <AuthorImage author={author} />
      {author.name}
    </div>
  );
}

interface BlogCardProps {
  blog: Blog;
}

function BlogMeta({ publishedAt }: { publishedAt: string | null }) {
  return (
    <div className="flex items-center gap-x-4">
      <Badge variant="secondary">
        <time dateTime={publishedAt ?? ""}>{publishedAt}</time>
      </Badge>
    </div>
  );
}

function BlogContent({
  title,
  slug,
  description,
  isFeatured,
}: {
  title: string | null;
  slug: string | null;
  description: string | null;
  isFeatured?: boolean;
}) {
  const HeadingTag = isFeatured ? "h2" : "h3";
  const headingClasses = isFeatured
    ? "text-3xl font-semibold leading-tight"
    : "mt-3 text-lg font-semibold leading-6";

  return (
    <div className="group relative">
      <HeadingTag className={headingClasses}>
        <Link
          href={slug ?? "#"}
          className="underline underline-offset-2 decoration-transparent hover:decoration-primary transition"
        >
          <span className="absolute inset-0" />
          {title}
        </Link>
      </HeadingTag>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function AuthorSection({ authors }: { authors: Blog["authors"] }) {
  if (!authors) return null;

  return (
    <div className="flex">
      <div className="relative flex items-center gap-x-2">
        <AuthorImage author={authors} />
        <div className="text-sm leading-6">
          <p className="font-semibold">
            <span className="absolute inset-0" />
            {authors.name}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FeaturedBlogCard({ blog }: BlogCardProps) {
  const { title, publishedAt, slug, authors, description, image } = blog ?? {};

  return (
    <article className="flex flex-col items-start gap-x-8 lg:flex-row lg:items-center">
      <div className="relative w-full lg:w-1/2">
        <BlogImage image={image} title={title} />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="flex flex-col gap-4 w-full lg:w-1/2 mt-4 lg:mt-0">
        <BlogMeta publishedAt={publishedAt} />
        <BlogContent
          title={title}
          slug={slug}
          description={description}
          isFeatured={true}
        />
        <div className="flex flex-col">
          <AuthorSection authors={authors} />
        </div>
      </div>
    </article>
  );
}

export function BlogCard({ blog }: BlogCardProps) {
  const { title, publishedAt, slug, authors, description, image } = blog;

  return (
    <article className="flex flex-col items-start w-full">
      <div className="relative w-full">
        <BlogImage image={image} title={title} />
        <div className="absolute inset-0 rounded ring-1 ring-inset ring-gray-900/10" />
      </div>
      <div className="w-full mt-4 sm:max-w-xl">
        <BlogMeta publishedAt={publishedAt} />
        <BlogContent title={title} slug={slug} description={description} />
        <div className="flex flex-col mt-4">
          <AuthorSection authors={authors} />
        </div>
      </div>
    </article>
  );
}

export function BlogHeader({
  title,
  description,
  badge,
}: {
  title: string | null;
  description: string | null;
  badge?: string | null;
}) {
  return (
    <div className="">
      <div className="max-w-screen-md">
        {badge && (
          <Badge variant="secondary" className="mb-4">
            {badge}
          </Badge>
        )}
        <h1 className="text-3xl font-bold tracking-tight md:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
