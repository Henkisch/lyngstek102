import { Text } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";

export const richTextSection = defineType({
  name: "richTextSection",
  title: getLocalizedField("sections", "richText.name"),
  type: "object",
  icon: Text,
  fields: [
    defineField({
      name: "badge",
      title: getLocalizedField("badge", "title"),
      type: "string",
      description: getLocalizedField("badge", "description"),
    }),
    defineField({
      name: "richText",
      type: "richText",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "richText",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title:
          title && title[0]?.children[0]?.text
            ? title[0].children[0].text
            : getLocalizedField("common", "noContent"),
        subtitle: getLocalizedField("sections", "richText.name"),
      };
    },
  },
});
