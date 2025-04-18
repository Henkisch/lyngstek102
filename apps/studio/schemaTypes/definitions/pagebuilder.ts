import { defineArrayMember, defineType } from "sanity";

import { getLocalizedField } from "../../helpers/localization";
import { pageBuilderBlocks } from "../sections";

export const pagebuilderBlockTypes = pageBuilderBlocks.map(({ name }) => ({
  type: name,
}));

export const pageBuilder = defineType({
  name: "pageBuilder",
  type: "array",
  title: getLocalizedField("common", "pagebuilder"),
  of: pagebuilderBlockTypes.map((block) => defineArrayMember(block)),
});
