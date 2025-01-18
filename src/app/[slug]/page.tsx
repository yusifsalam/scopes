import { createClient } from "@/supabase/server";
import { createClient as supaClient } from "@supabase/supabase-js";
import LocaleSelector from "../components/LocaleSelector";
import Image from "next/image";

export async function generateStaticParams() {
  const supabase = supaClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const { data: signs, error } = await supabase
    .from("signs")
    .select(`id, name`);

  if (error) {
    console.error(error);
    return [];
  }
  if (!signs) return [];
  return signs?.map((sign) => ({
    slug: sign.name,
  }));
}

async function getMedia(sign: string) {
  const supabase = await createClient("admin");
  const { data: files } = await supabase.storage.from("pics").list(sign);
  const paths =
    files
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .map((d) => `${sign}/${d.name}`) ?? [];
  const { data, error } = await supabase.storage
    .from("pics")
    .createSignedUrls(paths, 30 * 24 * 60 * 60); // 30 days

  if (error) {
    console.error("Error fetching images:", error);
    return [];
  }

  return data;
}

const BullPage = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const sign = (await params).slug;
  const urls = await getMedia(sign);
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
        {urls.map((d, i) =>
          d.path?.includes("webp") ? (
            <Image key={i} src={d.signedUrl} alt="" height={480} width={640} />
          ) : (
            <Image
              key={i}
              src={d.signedUrl}
              alt=""
              height={1024}
              width={1024}
            />
          ),
        )}
      </div>
    </div>
  );
};

export default BullPage;
