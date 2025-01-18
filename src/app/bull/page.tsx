import { createClient } from "@/supabase/server";
import LocaleSelector from "../components/LocaleSelector";
import Image from "next/image";

async function getMedia() {
  const supabase = await createClient("admin");
  const { data: files } = await supabase.storage.from("pics").list("taurus");
  const paths =
    files
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .map((d) => "taurus/" + d.name) ?? [];
  const { data, error } = await supabase.storage
    .from("pics")
    .createSignedUrls(paths, 30 * 24 * 60 * 60); // 30 days

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }

  return data;
}

const BullPage = async () => {
  const urls = await getMedia();
  const data = urls?.map((u) => u.signedUrl);
  return (
    <div className="stretch prose mx-auto flex w-full max-w-md flex-col px-4 py-8">
      <div className="flex items-center justify-between">
        <h1>
          Rektor &apos;scopes
          <br />
          {new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
          : Bull
        </h1>
        <LocaleSelector />
      </div>
      <div className="flex flex-col space-y-4">
        {data.map((d, i) => (
          <Image key={i} src={d} alt="" height={480} width={640} />
        ))}
      </div>
    </div>
  );
};

export default BullPage;
