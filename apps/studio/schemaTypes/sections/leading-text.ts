import { LetterText } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { buttonsField } from "../common";

export const leadingText = defineType({
  name: "leadingText",
  title: getLocalizedField("sections", "leadingText.name"),
  type: "object",
  icon: LetterText,
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
      title: getLocalizedField("common", "richText"),
      validation: (Rule) => Rule.required(),
    }),
    buttonsField,
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
        subtitle: getLocalizedField("sections", "leadingText.name"),
      };
    },
  },
});
