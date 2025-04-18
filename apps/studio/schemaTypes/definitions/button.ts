import { Command } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { capitalize, createRadioListLayout } from "../../utils/helper";

const buttonVariants = ["default", "secondary", "outline", "link"];

export const button = defineType({
  name: "button",
  title: getLocalizedField("common", "button"),
  type: "object",
  icon: Command,
  fields: [
    defineField({
      name: "variant",
      type: "string",
      title: getLocalizedField("common", "variant"),
      initialValue: () => "default",
      options: createRadioListLayout(buttonVariants, {
        direction: "horizontal",
      }),
    }),
    defineField({
      name: "text",
      title: getLocalizedField("common", "buttonText"),
      type: "string",
    }),
    defineField({
      name: "url",
      title: getLocalizedField("common", "url"),
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "text",
      variant: "variant",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare: ({
      title,
      variant,
      externalUrl,
      urlType,
      internalUrl,
      openInNewTab,
    }) => {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Button",
        subtitle: `${capitalize(variant ?? "default")}: ${truncatedUrl}${newTabIndicator}`,
      };
    },
  },
});
