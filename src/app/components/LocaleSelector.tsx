"use client";

import { useHydrated } from "../hooks/useHydrated";
import { useUserPreferencesStore } from "../state/user-preferences-provider";

const locales = ["re", "en", "fi"] as const;
export type SupportedLocale = (typeof locales)[number];

const LocaleSelector = () => {
  const isHydrated = useHydrated();

  if (!isHydrated) return null;

  return (
    <div className="flex items-center gap-2">
      {locales.map((locale) => (
        <LocaleButton key={locale} locale={locale} />
      ))}
    </div>
  );
};

const LocaleButton = ({ locale }: { locale: SupportedLocale }) => {
  const { locale: currentLocale, setLocale } = useUserPreferencesStore(
    (state) => state,
  );
  return (
    <button
      onClick={() => setLocale(locale)}
      className={`cursor-pointer rounded px-2 py-1 uppercase transition-all ${
        currentLocale === locale
          ? "bg-blue-500 text-white"
          : "text-base-content hover:text-white"
      }`}
    >
      {locale}
    </button>
  );
};

export default LocaleSelector;
