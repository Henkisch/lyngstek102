import { LayoutPanelLeft, Link, PanelTop } from "lucide-react";
import { defineField, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { buttonsField, iconField } from "../common";

const navbarLink = defineField({
  name: "navbarLink",
  type: "object",
  icon: Link,
  title: getLocalizedField("navbar", "link.title"),
  description: getLocalizedField("navbar", "link.description"),
  fields: [
    defineField({
      name: "name",
      type: "string",
      title: getLocalizedField("navbar", "link.linkText.title"),
      description: getLocalizedField("navbar", "link.linkText.description"),
    }),
    defineField({
      name: "url",
      type: "customUrl",
      title: getLocalizedField("navbar", "link.url.title"),
      description: getLocalizedField("navbar", "link.url.description"),
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"}: ${truncatedUrl}${newTabIndicator}`,
        media: Link,
      };
    },
  },
});

const navbarColumnLink = defineField({
  name: "navbarColumnLink",
  type: "object",
  icon: LayoutPanelLeft,
  title: "Navigation Column Link",
  description: "A link within a navigation column",
  fields: [
    iconField,
    defineField({
      name: "name",
      type: "string",
      title: getLocalizedField("navbar", "link.linkText.title"),
      description: getLocalizedField("navbar", "link.linkText.description"),
    }),
    defineField({
      name: "description",
      type: "string",
      title: getLocalizedField("common", "description"),
      description: getLocalizedField("navbar", "link.linkDescription"),
    }),
    defineField({
      name: "url",
      type: "customUrl",
      title: getLocalizedField("navbar", "link.url.title"),
      description: getLocalizedField("navbar", "link.url.description"),
    }),
  ],
  preview: {
    select: {
      title: "name",
      externalUrl: "url.external",
      urlType: "url.type",
      internalUrl: "url.internal.slug.current",
      openInNewTab: "url.openInNewTab",
    },
    prepare({ title, externalUrl, urlType, internalUrl, openInNewTab }) {
      const url = urlType === "external" ? externalUrl : internalUrl;
      const newTabIndicator = openInNewTab ? " ↗" : "";
      const truncatedUrl =
        url?.length > 30 ? `${url.substring(0, 30)}...` : url;

      return {
        title: title || "Untitled Link",
        subtitle: `${urlType === "external" ? "External" : "Internal"}: ${truncatedUrl}${newTabIndicator}`,
        media: Link,
      };
    },
  },
});

const navbarColumn = defineField({
  name: "navbarColumn",
  type: "object",
  icon: LayoutPanelLeft,
  title: getLocalizedField("navbar", "navigationColumn.title"),
  description: getLocalizedField("navbar", "navigationColumn.description"),
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: getLocalizedField("navbar", "navigationColumn.column.title"),
      description: getLocalizedField("navbar", "navigationColumn.description"),
    }),
    defineField({
      name: "links",
      type: "array",
      title: getLocalizedField("navbar", "navigationColumn.column.title"),
      validation: (rule) => [rule.required(), rule.unique()],
      description: getLocalizedField(
        "navbar",
        "navigationColumn.column.description",
      ),
      of: [navbarColumnLink],
    }),
  ],
  preview: {
    select: {
      title: "title",
      links: "links",
    },
    prepare({ title, links = [] }) {
      return {
        title: title || "Untitled Column",
        subtitle: `${links.length} link${links.length === 1 ? "" : "s"}`,
      };
    },
  },
});

export const navbar = defineType({
  name: "navbar",
  title: getLocalizedField("navbar", "title"),
  type: "document",
  icon: PanelTop,
  description: getLocalizedField("navbar", "description"),
  fields: [
    defineField({
      name: "label",
      type: "string",
      initialValue: "Navbar",
      title: getLocalizedField("navbar", "label"),
      description: getLocalizedField("navbar", "label"),
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "columns",
      type: "array",
      title: getLocalizedField("navbar", "navigationStructure.title"),
      description: getLocalizedField(
        "navbar",
        "navigationStructure.description",
      ),
      of: [navbarColumn, navbarLink],
    }),
    buttonsField,
  ],
  preview: {
    select: {
      title: "label",
    },
    prepare: ({ title }) => ({
      title: title || getLocalizedField("common", "untitled"),
    }),
  },
});
