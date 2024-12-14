import { getScopes } from "./getScopes";

export default async function IndexPage() {
  const scopes = await getScopes();
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <p>Hello world</p>
      <pre>{JSON.stringify(scopes, null, 2)}</pre>
    </div>
  );
}
