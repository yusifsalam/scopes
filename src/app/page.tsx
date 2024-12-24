import { createClient } from "@/supabase/server";
import Scopes from "./components/Scopes";

export default async function IndexPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("scopes_today").select(
    `
        id,
        scope,
        date,
        sign,
        signId
      `,
  );
  return (
    <div className="prose stretch mx-auto flex w-full max-w-md flex-col px-4 py-8">
      <h1 className="text-center">
        Rektor &apos;scopes
        <br />
        {new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </h1>
      <Scopes data={data} />
    </div>
  );
}
