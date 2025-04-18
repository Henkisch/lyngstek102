import { Image } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";

export const mediaSection = defineType({
  name: "mediaBlock",
  title: getLocalizedField("sections", "media.name"),
  type: "object",
  fields: [
    // defineField({
    //   title: "Media Type",
    //   name: "mediaType",
    //   type: "string",
    //   options: {
    //     list: [
    //       { title: "Image", value: "image" },
    //       { title: "Video", value: "video" },
    //     ],
    //   },
    //   initialValue: "image",
    // }),
    defineField({
      title: getLocalizedField("sections", "media.width.title"),
      description: getLocalizedField("sections", "media.width.decription"),
      name: "mediaWidth",
      type: "string",
      options: {
        list: [
          { title: "Full-width", value: "full" },
          { title: "Contained", value: "contained" },
        ],
      },
      initialValue: "full",
    }),
    defineField({
      name: "image",
      title: getLocalizedField("common", "image"),
      type: "image",
      fields: [
        defineField({
          name: "altText",
          title: getLocalizedField("image", "alt.title"),
          type: "string",
          description: getLocalizedField("image", "alt.description"),
        }),
      ],
      // hidden: ({ parent }) => parent?.backgroundType !== "image",
    }),
    // defineField({
    //   name: "videoUrl",
    //   title: "Video URL",
    //   type: "string",
    //   hidden: ({ parent }) => parent?.dialogType !== "video",
    // }),
  ],
  preview: {
    select: {
      title: "image.altText",
      media: "",
    },
    prepare(selection) {
      const { title } = selection;
      return {
        title: title ?? getLocalizedField("common", "untitled"),
        subtitle: getLocalizedField("sections", "media.name"),
        media: Image,
      };
    },
  },
});
