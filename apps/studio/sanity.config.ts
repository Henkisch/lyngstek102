import { assist } from "@sanity/assist";
import { svSELocale } from "@sanity/locale-sv-se";
import { visionTool } from "@sanity/vision";
import { defineConfig, definePlugin } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import {
  unsplashAssetSource,
  unsplashImageAsset,
} from "sanity-plugin-asset-source-unsplash";
import { iconPicker } from "sanity-plugin-icon-picker";
import { media, mediaAssetSource } from "sanity-plugin-media";

import { locations } from "./location";
import { presentationUrl } from "./plugins/presentation-url";
import { schemaTypes } from "./schemaTypes";
import { structure } from "./structure";
import { createPageTemplate } from "./utils/helper";
const projectId = process.env.SANITY_STUDIO_PROJECT_ID ?? "";
const dataset = process.env.SANITY_STUDIO_DATASET;
const title = process.env.SANITY_STUDIO_TITLE;
const presentationOriginUrl =
  process.env.NODE_ENV === "production"
    ? "https://lyngstek-102.vercel.app"
    : "http://localhost:3000";
import { getLanguage } from "./helpers/localization"; // Import the helper


// Determine the language setting
const language = getLanguage();
const localePlugin = language === "sv" ? svSELocale() : undefined;

export default defineConfig({
  name: "default",
  title: title ?? "Lyngstek 102",
  projectId: projectId,
  dataset: dataset ?? "production",
  plugins: [
    structureTool({
      structure,
    }),
    presentationTool({
      resolve: {
        locations,
      },
      previewUrl: {
        origin: presentationOriginUrl,
        previewMode: {
          enable: "/api/presentation-draft",
        },
      },
    }),
    assist(),
    visionTool(),
    iconPicker(),
    media(),
    presentationUrl(),
    unsplashImageAsset(),
    ...(localePlugin ? [localePlugin] : []), // Conditionally spread the locale plugin if defined
  ],

  form: {
    image: {
      assetSources: (previousAssetSources) => {
        return previousAssetSources.filter(
          (assetSource) =>
            assetSource === mediaAssetSource ||
            assetSource === unsplashAssetSource,
        );
      },
    },
  },
  document: {
    newDocumentOptions: (prev, { creationContext }) => {
      const { type } = creationContext;
      if (type === "global") return [];
      return prev;
    },
  },
  schema: {
    types: schemaTypes,
    templates: createPageTemplate(),
  },
});
