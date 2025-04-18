import { defineField, defineType } from "sanity";

import { PathnameFieldComponent } from "../../components/slug-field-component";
import { getLocalizedField } from "../../helpers/localization";
import { GROUP, GROUPS } from "../../utils/constant";
import { ogFields } from "../../utils/og-fields";
import { seoFields } from "../../utils/seo-fields";
import { createSlug, isUnique } from "../../utils/slug";
import { pageBuilderField } from "../common";

export const page = defineType({
  name: "page",
  title: getLocalizedField("common", "page"),
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
      name: "description",
      type: "text",
      title: getLocalizedField("common", "description"),
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
      name: "image",
      type: "image",
      title: getLocalizedField("common", "image"),
      group: GROUP.MAIN_CONTENT,
      fields: [
        defineField({
          name: "alt",
          title: getLocalizedField("image", "alt.title"),
          type: "string",
          description: getLocalizedField("image", "alt.description"),
        }),
      ],
    }),
    pageBuilderField,
    ...seoFields,
    ...ogFields,
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      slug: "slug.current",
      media: "image",
    },
    prepare: ({ title, description, slug, media }) => ({
      title,
      subtitle: slug,
      media,
    }),
  },
});
