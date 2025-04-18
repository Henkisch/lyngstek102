import { defaultLanguage } from "../config/language";
import en from "../locales/en.json";
import sv from "../locales/sv.json";

const translations = { en, sv };

export function getLanguage(): string {
  return defaultLanguage;
}

export function getLocalizedField(schema: string, fieldPath: string): string {
  const language = getLanguage();
  const languageTranslations =
    translations[language as keyof typeof translations];
  if (!languageTranslations) return fieldPath;

  const schemaTranslations =
    languageTranslations[schema as keyof typeof languageTranslations];
  if (!schemaTranslations) return fieldPath;

  const fieldKeys = fieldPath.split(".");
  let fieldTranslation: any = schemaTranslations;

  for (const key of fieldKeys) {
    fieldTranslation = fieldTranslation[key as keyof typeof fieldTranslation];
    if (!fieldTranslation) return fieldPath;
  }

  return fieldTranslation || fieldPath;
}
