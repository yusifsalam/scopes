import { createClient } from "@/supabase/server";
import { createClient as supaClient } from "@supabase/supabase-js";
import Image from "next/image";
import Header from "../components/layout/Header";
import LocaleSelector from "../components/LocaleSelector";
import Breadcrumbs from "./Breadcrumbs";

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
  if (files?.[0]?.name === ".emptyFolderPlaceholder") {
    return [];
  }
  const paths =
    files
      ?.sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
      .map((d) => `${sign}/${d.name}`) ?? [];
  const urls = paths.map((path) =>
    supabase.storage.from("pics").getPublicUrl(path),
  );
  const data = urls.map((u) => u.data.publicUrl);

  return data;
}

const SignPage = async ({
  params,
}: {
  params: Promise<{ slug: string; url: string }>;
}) => {
  const resolvedParams = await params;
  const sign = resolvedParams.slug;
  const urls = await getMedia(sign);
  return (
    <div className="stretch prose mx-auto flex w-full max-w-md flex-col px-4 py-8">
      <div className="flex items-center justify-between">
        <Header sign={sign} />
        <LocaleSelector />
      </div>
      <div className="flex flex-col space-y-4">
        <Breadcrumbs sign={sign} />
        {urls.length === 0 ? (
          <p>No images for {sign} yet!</p>
        ) : (
          urls.map((d, i) => (
            <Image key={i} src={d} alt="" height={1024} width={1024} />
          ))
        )}
        <Breadcrumbs sign={sign} />
      </div>
    </div>
  );
};

export default SignPage;
