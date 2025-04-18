import { PhoneIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { buttonsField, richTextField } from "../common";

export const cta = defineType({
  name: "cta",
  type: "object",
  icon: PhoneIcon,
  title: getLocalizedField("sections", "cta.name"),
  fields: [
    defineField({
      name: "badge",
      title: getLocalizedField("badge", "title"),
      type: "string",
      description: getLocalizedField("badge", "description"),
    }),
    defineField({
      name: "title",
      title: getLocalizedField("title", "title"),
      type: "string",
      description: getLocalizedField("title", "description"),
    }),
    richTextField,
    buttonsField,
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare: ({ title }) => ({
      title,
      subtitle: getLocalizedField("sections", "cta.name"),
    }),
  },
});
