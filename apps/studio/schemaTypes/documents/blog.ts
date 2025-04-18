import { defineArrayMember, defineField, defineType } from "sanity";

import { PathnameFieldComponent } from "../../components/slug-field-component";
import { getLocalizedField } from "../../helpers/localization";
import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";

export const blog = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: getLocalizedField("common", "title"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      title: getLocalizedField("common", "description"),
      name: "description",
      type: "text",
      rows: 3,
      group: GROUP.MAIN_CONTENT,
      validation: (rule) => [
        rule
          .min(140)
          .warning(getLocalizedField("seo", "description.warning.minLength")),
        rule
          .max(160)
          .warning(getLocalizedField("seo", "description.warning.maxLength")),
      ],
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: getLocalizedField("common", "url"),
      group: GROUP.MAIN_CONTENT,
      components: {
        field: PathnameFieldComponent,
      },
      options: {
        source: "title",
        slugify: createSlug,
        isUnique,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authors",
      type: "array",
      title: getLocalizedField("common", "authors"),
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            {
              type: "author",
              options: {
                disableNew: true,
              },
            },
          ],
          options: {
            disableNew: true,
          },
        }),
      ],
      validation: (Rule) => [
        Rule.required(),
        Rule.max(1),
        Rule.min(1),
        Rule.unique(),
      ],
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "publishedAt",
      type: "date",
      initialValue: () => new Date().toISOString().split("T")[0],
      title: getLocalizedField("common", "publishedAt"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "image",
      title: getLocalizedField("common", "image"),
      type: "image",
      group: GROUP.MAIN_CONTENT,
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: "alt",
          title: getLocalizedField("image", "alt.title"),
          type: "string",
          description: getLocalizedField("image", "alt.description"),
        }),
      ],
    }),
    defineField({
      name: "richText",
      type: "richText",
      group: GROUP.MAIN_CONTENT,
    }),
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
      isPrivate: "seoNoIndex",
      slug: "slug.current",
    },
    prepare: ({ title, media, slug, isPrivate }) => ({
      title,
      media,
      subtitle: `${isPrivate ? getLocalizedField("common", "private") : getLocalizedField("common", "public")}: ${slug}`,
    }),
  },
});
