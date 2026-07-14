// Central locale configuration for the site.
//
// URL structure: "default language at root" (matches .cloudcannon/postbuild's
// `--default-language-at-root`). English lives at `/blog/...`; other locales
// are prefixed, e.g. `/fr/blog/...`.
//
// Rosey (postbuild) translates shared UI strings tagged with `data-rosey`.
// Long-form blog bodies are translated per-locale via split-by-directory
// content collections (`blog`, `blog_fr`, `blog_de`) that Astro builds natively.

export const defaultLocale = "en";

export type LocaleCode = "fr" | "de";

export const locales: Record<
  LocaleCode,
  { label: string; dateLocale: string }
> = {
  fr: { label: "Français", dateLocale: "fr-FR" },
  de: { label: "Deutsch", dateLocale: "de-DE" },
};

// Non-default locale codes, e.g. ["fr", "de"]. These drive `getStaticPaths`.
export const localeCodes = Object.keys(locales) as LocaleCode[];

// The content-collection name that holds a locale's blog posts.
// en -> "blog", fr -> "blog_fr", de -> "blog_de".
export function blogCollectionName(locale?: string): string {
  return locale && locale !== defaultLocale ? `blog_${locale}` : "blog";
}

// URL prefix for a locale. "" for the default language (served at root),
// "/fr" / "/de" otherwise.
export function localePrefix(locale?: string): string {
  return locale && locale !== defaultLocale ? `/${locale}` : "";
}

// The Intl locale string used for date formatting, or undefined for the
// default language (uses the runtime default).
export function dateLocaleFor(locale?: string): string | undefined {
  return locale && locale in locales
    ? locales[locale as LocaleCode].dateLocale
    : undefined;
}
