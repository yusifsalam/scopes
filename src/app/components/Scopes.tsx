"use client";

import { useHydrated } from "../hooks/useHydrated";
import { useUserPreferencesStore } from "../state/user-preferences-provider";
import type { SupportedLocale } from "./LocaleSelector";
import SingleScope, { Scope } from "./Scope";

type ScopesProps = {
  scopeData: Record<SupportedLocale, Scope[]>;
};

const Scopes = ({ scopeData }: ScopesProps) => {
  const isHydrated = useHydrated();
  const { locale } = useUserPreferencesStore((state) => state);

  if (!isHydrated) return null;

  const data = scopeData[locale];

  if (!data) {
    return <div>No &apos;scopes...</div>;
  }

  return (
    <div className="min-h-[80vh] h-full">
      <ul className="mt-2 list-none space-y-2 ps-0">
        {data.map((s) => (
          <li key={s.id}>
            <SingleScope scope={s} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Scopes;
