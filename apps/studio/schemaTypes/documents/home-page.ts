import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug } from "../../utils/slug";
import { pageBuilderField } from "../common";

export const homePage = defineType({
  name: "homePage",
  type: "document",
  title: getLocalizedField("common", "homepage"),
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
      title: getLocalizedField("common", "description"),
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
      options: {
        source: "title",
        slugify: createSlug,
      },
      validation: (Rule) => Rule.required(),
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
      media: HomeIcon,
      subtitle: slug || getLocalizedField("common", "homepage"),
    }),
  },
});
