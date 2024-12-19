import { createClient } from "@/supabase/server";

type Scope = {
  id: number;
  scope: string;
  date: string;
  sign: string;
};

export default async function IndexPage() {
  const supabase = await createClient();
  const { data: scopes } = await supabase.from("scopes_today").select(
    `
        id,
        scope,
        date,
        sign
      `,
  );
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch p-2">
      <h1>Rektor &apos;scopes for {new Date().toDateString()}</h1>
      <ul className="space-y-2 mt-2">
        {scopes?.map((s) => <SingleScope key={s.id} scope={s as Scope} />)}
      </ul>
    </div>
  );
}

const SingleScope = ({ scope }: { scope: Scope }) => {
  return (
    <div>
      <h2 className="font-bold uppercase">{scope.sign}</h2>
      <p>{scope.scope} </p>
    </div>
  );
};
