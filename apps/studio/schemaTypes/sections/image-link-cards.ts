import { ImageIcon, ImagesIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { buttonsField, richTextField } from "../common";

const imageLinkCard = defineField({
  name: "imageLinkCard",
  type: "object",
  title: "Image link card",
  icon: ImageIcon,
  fields: [
    defineField({
      name: "title",
      title: "Card Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Card Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Card Image",
      type: "image",
      description: "Add an image or illustration for this card",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: "alt",
          title: "Alternative text",
          type: "string",
          description:
            "A short description of the image's content. If left blank, it defaults to the media library alt text or, if unavailable, the file name.",
        }),
      ],
    }),
    defineField({
      name: "url",
      title: "Link URL",
      type: "customUrl",
    }),
  ],
  preview: {
    select: {
      title: "title",
      description: "description",
      media: "image",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare: ({
      title,
      description,
      media,
      externalUrl,
      urlType,
      internalUrl,
      openInNewTab,
    }) => {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;
      const truncatedDesc =
        description?.length > 50
          ? `${description.substring(0, 50)}...`
          : description;

      return {
        title: title || "Untitled Card",
        subtitle:
          truncatedDesc + (url ? `: ${truncatedUrl}${newTabIndicator}` : ""),
        media,
      };
    },
  },
});

export const imageLinkCards = defineType({
  name: "imageLinkCards",
  type: "object",
  icon: ImagesIcon,
  title: getLocalizedField("sections", "imageLinkCards.name"),
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
      validation: (Rule) => Rule.required(),
    }),
    richTextField,
    buttonsField,
    defineField({
      name: "cards",
      title: getLocalizedField("sections", "imageLinkCards.cards.title"),
      description: getLocalizedField(
        "sections",
        "imageLinkCards.cards.description",
      ),
      type: "array",
      of: [imageLinkCard],
    }),
  ],
  preview: {
    select: {
      title: "title",
      badge: "badge",
      cards: "cards",
    },
    prepare: ({ title, badge, cards = [] }) => ({
      title: title || getLocalizedField("sections", "imageLinkCards.name"),
      subtitle:
        getLocalizedField("sections", "imageLinkCards.name") +
        ": " +
        `${cards.length} card${cards.length === 1 ? "" : "s"}`,
    }),
  },
});
