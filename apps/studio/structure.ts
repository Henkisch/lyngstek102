import {
  BookMarked,
  CogIcon,
  File,
  FileText,
  HomeIcon,
  type LucideIcon,
  MessageCircleQuestion,
  PanelBottomIcon,
  PanelTopDashedIcon,
  Settings2,
  User,
} from "lucide-react";
import type {
  StructureBuilder,
  StructureResolverContext,
} from "sanity/structure";

import { getLocalizedField } from "./helpers/localization";
import type { SchemaType, SingletonType } from "./schemaTypes";
import { getTitleCase } from "./utils/helper";

type Base<T = SchemaType> = {
  id?: string;
  type: T;
  preview?: boolean;
  title?: string;
  icon?: LucideIcon;
};

type CreateSingleTon = {
  S: StructureBuilder;
} & Base<SingletonType>;

const createSingleTon = ({ S, type, title, icon }: CreateSingleTon) => {
  const newTitle = title ?? getTitleCase(type);
  return S.listItem()
    .title(newTitle)
    .icon(icon ?? File)
    .child(S.document().schemaType(type).documentId(type));
};

type CreateList = {
  S: StructureBuilder;
} & Base;

// This function creates a list item for a type. It takes a StructureBuilder instance (S),
// a type, an icon, and a title as parameters. It generates a title for the type if not provided,
// and uses a default icon if not provided. It then returns a list item with the generated or
// provided title and icon.

const createList = ({ S, type, icon, title, id }: CreateList) => {
  const newTitle = title ?? getTitleCase(type);
  return S.documentTypeListItem(type)
    .id(id ?? type)
    .title(newTitle)
    .icon(icon ?? File);
};

type CreateIndexList = {
  S: StructureBuilder;
  list: Base;
  index: Base<SingletonType>;
};

const createIndexList = ({ S, index, list }: CreateIndexList) => {
  const indexTitle = index.title ?? getTitleCase(index.type);
  const listTitle = list.title ?? getTitleCase(list.type);
  return S.listItem()
    .title(listTitle)
    .icon(index.icon ?? File)
    .child(
      S.list()
        .title(indexTitle)
        .items([
          S.listItem()
            .title(indexTitle)
            .icon(index.icon ?? File)
            .child(
              S.document()
                .views([S.view.form()])
                .schemaType(index.type)
                .documentId(index.type),
            ),
          S.documentTypeListItem(list.type)
            .title(`${listTitle}`)
            .icon(list.icon ?? File),
        ]),
    );
};

export const structure = (
  S: StructureBuilder,
  context: StructureResolverContext,
) => {
  return S.list()
    .title("Content")
    .items([
      createSingleTon({
        S,
        type: "homePage",
        icon: HomeIcon,
        title: getLocalizedField("common", "homepage"),
      }),
      S.divider(),
      createList({
        S,
        type: "page",
        title: getLocalizedField("common", "pages"),
      }),
      createIndexList({
        S,
        index: {
          type: "blogIndex",
          icon: BookMarked,
          title: getLocalizedField("blog", "index.title"),
        },
        list: {
          type: "blog",
          title: getLocalizedField("blog", "blogs"),
          icon: FileText,
        },
      }),
      createList({
        S,
        type: "faq",
        title: getLocalizedField("common", "faqs"),
        icon: MessageCircleQuestion,
      }),
      createList({
        S,
        type: "author",
        title: getLocalizedField("common", "authors"),
        icon: User,
      }),
      S.divider(),
      S.listItem()
        .title(getLocalizedField("common", "siteConfiguration"))
        .icon(Settings2)
        .child(
          S.list()
            .title(getLocalizedField("common", "siteConfiguration"))
            .items([
              createSingleTon({
                S,
                type: "navbar",
                title: getLocalizedField("common", "navigation"),
                icon: PanelTopDashedIcon,
              }),
              createSingleTon({
                S,
                type: "footer",
                title: getLocalizedField("footer", "title"),
                icon: PanelBottomIcon,
              }),
              createSingleTon({
                S,
                type: "settings",
                title: getLocalizedField("common", "globalSettings"),
                icon: CogIcon,
              }),
            ]),
        ),
    ]);
};
