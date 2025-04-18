import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { createRadioListLayout, isValidUrl } from "../../utils/helper";

const allLinkableTypes = [
  { type: "blog" },
  { type: "blogIndex" },
  { type: "page" },
];

export const customUrl = defineType({
  name: "customUrl",
  title: getLocalizedField("common", "url"),
  type: "object",
  fields: [
    defineField({
      name: "type",
      type: "string",
      title: getLocalizedField("common", "type"),
      options: createRadioListLayout(["internal", "external"]),
      initialValue: () => "internal",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: getLocalizedField("link", "openInNewTab.title"),
      type: "boolean",
      description: getLocalizedField("link", "openInNewTab.title"),
      initialValue: () => false,
    }),
    defineField({
      name: "external",
      type: "string",
      title: getLocalizedField("common", "url"),
      hidden: ({ parent }) => parent?.type !== "external",
      validation: (Rule) => [
        Rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === "external") {
            if (!value) return getLocalizedField("link", "validation.notEmpty");
            const isValid = isValidUrl(value);
            if (!isValid)
              return getLocalizedField("link", "validation.invalid");
          }
          return true;
        }),
      ],
    }),
    defineField({
      name: "href",
      type: "string",
      initialValue: () => "#",
      hidden: true,
      readOnly: true,
    }),
    defineField({
      name: "internal",
      type: "reference",
      options: { disableNew: true },
      hidden: ({ parent }) => parent?.type !== "internal",
      to: allLinkableTypes,
      validation: (rule) => [
        rule.custom((value, { parent }) => {
          const type = (parent as { type?: string })?.type;
          if (type === "internal" && !value?._ref)
            return "internal can't be empty";
          return true;
        }),
      ],
    }),
  ],
  preview: {
    select: {
      externalUrl: "external",
      urlType: "type",
      internalUrl: "internal.slug.current",
      openInNewTab: "openInNewTab",
    },
    prepare({ externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : `/${internalUrl}`;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: `${urlType === "external" ? getLocalizedField("common", "external") : getLocalizedField("common", "internal")} ${getLocalizedField("common", "link")}`,
        subtitle: `${truncatedUrl}${newTabIndicator}`,
      };
    },
  },
});
