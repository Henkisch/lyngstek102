import { MessageCircleQuestion } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";

export const faqSection = defineType({
  name: "faqSection",
  type: "object",
  icon: MessageCircleQuestion,
  title: getLocalizedField("sections", "faq.name"),
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
    defineField({
      name: "subtitle",
      type: "string",
      title: getLocalizedField("subtitle", "title"),
      description: getLocalizedField("subtitle", "description"),
    }),
    defineField({
      name: "link",
      title: getLocalizedField("common", "link"),
      type: "object",
      description: getLocalizedField("sections", "faq.linkDescription"),
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: getLocalizedField("sections", "faq.link.text.title"),
          description: getLocalizedField(
            "sections",
            "faq.link.text.description",
          ),
        }),
        defineField({
          name: "description",
          type: "string",
          title: getLocalizedField("sections", "faq.link.description.title"),
          description: getLocalizedField(
            "sections",
            "faq.link.description.description",
          ),
        }),
      ],
    }),
    defineField({
      name: "faqs",
      type: "array",
      title: getLocalizedField("sections", "faq.faqs.title"),
      description: getLocalizedField("sections", "faq.faqs.description"),
      of: [
        {
          type: "reference",
          to: [{ type: "faq" }],
          options: { disableNew: true },
        },
      ],
      validation: (Rule) => [Rule.required(), Rule.unique()],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title: title ?? getLocalizedField("common", "untitled"),
      subtitle: getLocalizedField("sections", "faq.name"),
    }),
  },
});
