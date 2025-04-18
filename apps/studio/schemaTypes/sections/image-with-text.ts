import { Image } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { createRadioListLayout } from "../../utils/helper";
import { buttonsField, richTextField } from "../common";

const layoutVariants = ["imageFirst", "textFirst"];

export const imageWithText = defineType({
  name: "imageWithText",
  title: getLocalizedField("sections", "imageWithText.name"),
  icon: Image,
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
      validation: (Rule) => Rule.required(),
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
    defineField({
      name: "layout",
      type: "string",
      title: getLocalizedField("common", "layout"),
      initialValue: () => "imageFirst",
      options: createRadioListLayout(layoutVariants, {
        direction: "horizontal",
      }),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: getLocalizedField("sections", "imageWithText.name"),
    }),
  },
});
