import { defineField } from "sanity";

import { getLocalizedField } from "../helpers/localization";
import { GROUP } from "../utils/constant";

export const richTextField = defineField({
  name: "richText",
  type: "richText",
  title: getLocalizedField("common", "richText"),
});

export const buttonsField = defineField({
  name: "buttons",
  type: "array",
  title: getLocalizedField("common", "buttons"),
  of: [{ type: "button" }],
});

export const pageBuilderField = defineField({
  name: "pageBuilder",
  group: GROUP.MAIN_CONTENT,
  type: "pageBuilder",
  title: getLocalizedField("common", "pagebuilder"),
});

export const iconField = defineField({
  name: "icon",
  title: getLocalizedField("common", "icon"),
  options: {
    storeSvg: true,
    providers: ["fi"],
  },
  type: "iconPicker",
});
