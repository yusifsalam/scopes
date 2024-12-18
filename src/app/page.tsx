import { createClient } from "@/supabase/server";

type Scope = {
  id: number;
  scope: string;
  date: string;
  signs: {
    name: string;
  };
};

export default async function IndexPage() {
  const supabase = await createClient();
  const { data: scopes } = await supabase
    .from("horoscopes")
    .select(
      `
        id,
        scope,
        date,
        signs (
          name
        )
      `,
    )
    .eq("date", new Date().toISOString().split("T")[0])
    .order("sign_id");
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
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
      <h2 className="font-bold uppercase">{scope.signs.name}</h2>
      <p>{scope.scope} </p>
    </div>
  );
};
