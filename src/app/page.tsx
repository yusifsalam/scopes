import { createClient } from "@/supabase/server";
import type { SupportedLocale } from "./components/LocaleSelector";
import LocaleSelector from "./components/LocaleSelector";
import type { Scope } from "./components/Scope";
import Scopes from "./components/Scopes";
import Header from "./components/layout/Header";

async function getScopes() {
  const supabase = await createClient();
  const locales: SupportedLocale[] = ["re", "en", "fi"];

  const scopesByLocale = await Promise.all(
    locales.map(async (locale) => {
      const { data } = await supabase.rpc("get_scopes_by_locale", {
        locale_param: locale,
      });
      return [locale, data] as const;
    }),
  );

  return Object.fromEntries(scopesByLocale) as Record<SupportedLocale, Scope[]>;
}

export default async function IndexPage() {
  const scopeData = await getScopes();

  return (
    <div className="prose stretch mx-auto flex w-full max-w-md flex-col px-4 py-8">
      <Header />
      <div className="min-h-[80vh]">
        <Scopes scopeData={scopeData} />
      </div>
    </div>
  );
}
