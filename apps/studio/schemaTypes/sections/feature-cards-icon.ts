import { LayoutGrid } from "lucide-react";
import { defineField } from "sanity";
import { defineType } from "sanity";
import { preview } from "sanity-plugin-icon-picker";

import { getLocalizedField } from "../../helpers/localization";
import { iconField } from "../common";
import { customRichText } from "../definitions/rich-text";

const featureCardIcon = defineField({
  name: "featureCardIcon",
  type: "object",
  title: getLocalizedField("sections", "featureCardIcon.card"),
  fields: [
    iconField,
    defineField({
      name: "title",
      type: "string",
    }),
    customRichText(["block"]),
  ],
  preview: {
    select: {
      title: "title",
      icon: "icon",
    },
    prepare: ({ title, icon }) => {
      return {
        title: `${title ?? getLocalizedField("common", "untitled")}`,
        media: icon ? preview(icon) : null,
      };
    },
  },
});

export const featureCardsIcon = defineType({
  name: "featureCardsIcon",
  type: "object",
  title: getLocalizedField("sections", "featureCardIcon.name"),
  icon: LayoutGrid,
  fields: [
    defineField({
      name: "badge",
      type: "string",
      title: getLocalizedField("badge", "title"),
      description: getLocalizedField("badge", "Description"),
    }),
    defineField({
      name: "title",
      type: "string",
      title: getLocalizedField("title", "title"),
      description: getLocalizedField("title", "Description"),
    }),
    customRichText(["block"]),
    defineField({
      name: "cards",
      type: "array",
      title: getLocalizedField("sections", "featureCardIcon.cards.title"),
      description: getLocalizedField(
        "sections",
        "featureCardIcon.cards.description",
      ),
      of: [featureCardIcon],
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: getLocalizedField("sections", "featureCardIcon.name"),
    }),
  },
});
