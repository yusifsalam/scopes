import { createClient as supaClient } from "@supabase/supabase-js";
import Header from "../components/layout/Header";
import Breadcrumbs from "./Breadcrumbs";
import { getMedia } from "./getMedia";
import ImageGallery from "./ImageGallery";

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
      <Header sign={sign} />
      <div className="flex flex-col space-y-4">
        <Breadcrumbs sign={sign} />
        <ImageGallery sign={sign} urls={urls}/>
        <Breadcrumbs sign={sign} />
      </div>
    </div>
  );
};


export default SignPage;
