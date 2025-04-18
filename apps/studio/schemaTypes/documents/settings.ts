import { CogIcon } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";

const socialLinks = defineField({
  name: "socialLinks",
  title: getLocalizedField("settings", "socialMediaLinks.title"),
  description: getLocalizedField("settings", "socialMediaLinks.description"),
  type: "object",
  options: {},
  fields: [
    defineField({
      name: "linkedin",
      title: getLocalizedField("settings", "socialMediaLinks.linkedIn.title"),
      description: getLocalizedField(
        "settings",
        "socialMediaLinks.linkedIn.description",
      ),
      type: "string",
    }),
    defineField({
      name: "facebook",
      title: getLocalizedField("settings", "socialMediaLinks.facebook.title"),
      description: getLocalizedField(
        "settings",
        "socialMediaLinks.facebook.description",
      ),
      type: "string",
    }),
    defineField({
      name: "twitter",
      title: getLocalizedField("settings", "socialMediaLinks.twitter.title"),
      description: getLocalizedField(
        "settings",
        "socialMediaLinks.twitter.description",
      ),
      type: "string",
    }),
    defineField({
      name: "instagram",
      title: getLocalizedField("settings", "socialMediaLinks.instagram.title"),
      description: getLocalizedField(
        "settings",
        "socialMediaLinks.instagram.description",
      ),
      type: "string",
    }),
    defineField({
      name: "youtube",
      title: getLocalizedField("settings", "socialMediaLinks.youtube.title"),
      description: getLocalizedField(
        "settings",
        "socialMediaLinks.youtube.description",
      ),
      type: "string",
    }),
  ],
});

export const settings = defineType({
  name: "settings",
  type: "document",
  title: getLocalizedField("settings", "title"),
  description: getLocalizedField("settings", "description"),
  icon: CogIcon,
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Settings",
      title: getLocalizedField("settings", "label"),
      description: getLocalizedField("settings", "labelDescription"),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteTitle",
      type: "string",
      title: getLocalizedField("settings", "siteTitle"),
      description: getLocalizedField("settings", "siteTitleDescription"),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      type: "text",
      title: getLocalizedField("settings", "siteDescription"),
      description: getLocalizedField("settings", "siteDescriptionDescription"),
      validation: (rule) => rule.required().min(50).max(160),
    }),
    defineField({
      name: "logo",
      type: "image",
      title: getLocalizedField("settings", "siteLogo"),
      description: getLocalizedField("settings", "siteLogoDescription"),
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "contactEmail",
      type: "string",
      title: getLocalizedField("settings", "contactEmail"),
      description: getLocalizedField("settings", "contactEmailDescription"),
      validation: (rule) => rule.email(),
    }),
    socialLinks,
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || getLocalizedField("common", "untitled"),
      media: CogIcon,
    }),
  },
});
