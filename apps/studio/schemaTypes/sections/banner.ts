import { Star } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { buttonsField, richTextField } from "../common";

export const banner = defineType({
  name: "banner",
  title: getLocalizedField("sections", "banner.name"),
  icon: Star,
  type: "object",
  fields: [
    defineField({
      name: "badge",
      type: "string",
      title: getLocalizedField("badge", "title"),
      description: getLocalizedField("badge", "description"),
    }),
    defineField({
      name: "title",
      type: "string",
      title: getLocalizedField("title", "title"),
      description: getLocalizedField("title", "description"),
    }),
    richTextField,
    defineField({
      name: "image",
      type: "image",
      title: getLocalizedField("common", "image"),
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
    buttonsField,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: getLocalizedField("sections", "banner.name"),
    }),
  },
});
