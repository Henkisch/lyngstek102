import {
  BlockElementIcon,
  ComposeIcon,
  InlineElementIcon,
  InsertAboveIcon,
  SearchIcon,
} from "@sanity/icons";
import type { FieldGroupDefinition } from "sanity";

import { getLocalizedField } from "../helpers/localization";

export const GROUP = {
  SEO: "seo",
  MAIN_CONTENT: "main-content",
  CARD: "card",
  RELATED: "related",
  OG: "og",
};

export const GROUPS: FieldGroupDefinition[] = [
  // { name: CONST.MAIN_CONTENT, default: true },
  {
    name: GROUP.MAIN_CONTENT,
    icon: ComposeIcon,
    title: getLocalizedField("common", "content"),
    default: true,
  },
  {
    name: GROUP.SEO,
    icon: SearchIcon,
    title: getLocalizedField("common", "seo"),
  },
  {
    name: GROUP.OG,
    icon: InsertAboveIcon,
    title: getLocalizedField("common", "openGraph"),
  },
  {
    name: GROUP.CARD,
    icon: BlockElementIcon,
    title: getLocalizedField("common", "card"),
  },
  {
    name: GROUP.RELATED,
    icon: InlineElementIcon,
    title: getLocalizedField("common", "related"),
  },
];
