import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";

export const author = defineType({
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: getLocalizedField("common", "name"),
    }),
    defineField({
      name: "position",
      type: "string",
      title: getLocalizedField("common", "position"),
    }),
    defineField({
      name: "image",
      type: "image",
      title: getLocalizedField("image", "title"),
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
      name: "bio",
      type: "text",
      title: getLocalizedField("common", "bio"),
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "position",
      media: "image",
    },
    prepare: ({ title, subtitle, media }) => ({
      title,
      subtitle,
      media,
    }),
  },
});
