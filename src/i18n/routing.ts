import { defineRouting } from "next-intl/routing";

export const locales = ["en", "es", "pt"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";
export const localePrefix = "always" as const;

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix,
});

