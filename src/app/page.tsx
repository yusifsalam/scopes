import { createClient } from "@/supabase/server";

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
      <p>Hello world</p>
      {scopes?.map((s) => <SingleScope key={s.id} scope={s as any} />)}
    </div>
  );
}

const SingleScope = ({
  scope,
}: {
  scope: { id: number; scope: string; date: Date; signs: { name: string } };
}) => {
  return (
    <div>
      <h2>{scope.signs.name}</h2>
      <p>{scope.scope} </p>
    </div>
  );
};
