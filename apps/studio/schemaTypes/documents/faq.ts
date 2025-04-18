import { MessageCircleQuestion } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { parseRichTextToString } from "../../utils/helper";
import { richTextField } from "../common";

export const faq = defineType({
  name: "faq",
  type: "document",
  icon: MessageCircleQuestion,
  title: getLocalizedField("common", "faq"),
  fields: [
    defineField({
      name: "title",
      title: getLocalizedField("common", "question"),
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      ...richTextField,
      title: getLocalizedField("common", "answer"),
    }),
  ],
  preview: {
    select: {
      title: "title",
      richText: "richText",
    },
    prepare: ({ title, richText }) => ({
      title: title ?? getLocalizedField("common", "untitled"),
      subtitle: parseRichTextToString(richText, 20),
    }),
  },
});
