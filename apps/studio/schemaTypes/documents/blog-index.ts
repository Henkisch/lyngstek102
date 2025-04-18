import { defineArrayMember, defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { pageBuilderField } from "../common";

export const blogIndex = defineType({
  name: "blogIndex",
  type: "document",
  title: getLocalizedField("blog", "index.title"),
  groups: GROUPS,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: getLocalizedField("common", "title"),
      group: GROUP.MAIN_CONTENT,
    }),
    defineField({
      name: "description",
      type: "text",
      group: GROUP.MAIN_CONTENT,
      title: getLocalizedField("common", "description"),
    }),
    defineField({
      name: "slug",
      type: "slug",
      title: getLocalizedField("common", "url"),
      group: GROUP.MAIN_CONTENT,
      options: {
        source: "title",
        slugify: createSlug,
        isUnique: isUnique,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featured",
      title: getLocalizedField("blog", "featuredBlogs.title"),
      description: getLocalizedField("blog", "featuredBlogs.description"),
      type: "array",
      of: [
        defineArrayMember({
          type: "reference",
          to: [
            {
              type: "blog",
              options: { disableNew: true },
            },
          ],
          validation: (rule) => [rule.required()],
        }),
      ],
      validation: (rule) => [rule.max(1), rule.unique()],
      group: GROUP.MAIN_CONTENT,
    }),
    pageBuilderField,
    ...seoFields.filter(
      (field) => !["seoNoIndex", "seoHideFromLists"].includes(field.name),
    ),
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      slug: "slug.current",
    },
    prepare: ({ title, description, slug }) => ({
      title: title || getLocalizedField("common", "untitled"),
      subtitle: description || slug || "Blog Index",
    }),
  },
});
