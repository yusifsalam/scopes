export default async function IndexPage() {
  const data = await fetch("http://localhost:3000/api/scopes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const scopes = await data.json();
  console.log("data", scopes);
  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <p>Hello world</p>
      <pre>{JSON.stringify(scopes, null, 2)}</pre>
    </div>
  );
}
