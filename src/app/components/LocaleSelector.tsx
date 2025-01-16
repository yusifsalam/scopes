"use client";

import { useHydrated } from "../hooks/useHydrated";
import { useUserPreferencesStore } from "../state/user-preferences-provider";

export type SupportedLocale = "re" | "en" | "fi";

const LocaleSelector = () => {
  const isHydrated = useHydrated();
  const { locale, setLocale } = useUserPreferencesStore((state) => state);

  if (!isHydrated) return null;

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => setLocale("re")}
        className={`px-2 py-1 rounded transition-all ${
          locale === "re"
            ? "bg-blue-500 text-white"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        RE
      </button>
      <button
        onClick={() => setLocale("en")}
        className={`px-2 py-1 rounded transition-all ${
          locale === "en"
            ? "bg-blue-500 text-white"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("fi")}
        className={`px-2 py-1 rounded transition-all ${
          locale === "fi"
            ? "bg-blue-500 text-white"
            : "text-zinc-400 hover:text-white"
        }`}
      >
        FI
      </button>
    </div>
  );
};

export default LocaleSelector; 