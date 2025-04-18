import { CircleDollarSign } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";

export const pricingSection = defineType({
  name: "pricingSection",
  title: getLocalizedField("sections", "pricing.name"),
  type: "object",
  icon: CircleDollarSign,
  fields: [
    defineField({
      name: "badge",
      title: getLocalizedField("badge", "title"),
      type: "string",
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
      name: "description",
      title: getLocalizedField("common", "description"),
      type: "text",
      description: getLocalizedField("sections", "pricing.description"),
    }),
    defineField({
      name: "plans",
      title: getLocalizedField("sections", "pricing.plans.title"),
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "name",
              title: getLocalizedField(
                "sections",
                "pricing.plans.planName.title",
              ),
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "price",
              title: getLocalizedField(
                "sections",
                "pricing.plans.planPrice.title",
              ),
              type: "string",
              description: getLocalizedField(
                "sections",
                "pricing.plans.planPrice.description",
              ),
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "period",
              title: getLocalizedField(
                "sections",
                "pricing.plans.planBillingPeriod.title",
              ),
              type: "string",
              description: getLocalizedField(
                "sections",
                "pricing.plans.planBillingPeriod.description",
              ),
            }),
            defineField({
              name: "description",
              title: getLocalizedField(
                "sections",
                "pricing.plans.planDescription.title",
              ),
              type: "text",
              description: getLocalizedField(
                "sections",
                "pricing.plans.planDescription.description",
              ),
            }),
            defineField({
              name: "features",
              title: getLocalizedField(
                "sections",
                "pricing.plans.planFeatures.title",
              ),
              type: "array",
              of: [{ type: "string" }],
              description: getLocalizedField(
                "sections",
                "pricing.plans.planFeatures.description",
              ),
            }),
            defineField({
              name: "isPopular",
              title: getLocalizedField(
                "sections",
                "pricing.plans.planIsPopular.title",
              ),
              type: "boolean",
              description: getLocalizedField(
                "sections",
                "pricing.plans.planIsPopular.description",
              ),
              initialValue: false,
            }),
          ],
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: {
      title: "title",
    },
    prepare({ title }) {
      return {
        title: title,
        subtitle: getLocalizedField("sections", "pricing.name"),
      };
    },
  },
});
