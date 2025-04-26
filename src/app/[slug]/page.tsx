import { createClient as supaClient } from "@supabase/supabase-js";
import Header from "../components/layout/Header";
import { ZodiacSign } from "../consts";
import Breadcrumbs from "./Breadcrumbs";
import { getHistory } from "./getHistory";
import { getMedia } from "./getMedia";
import ImageGallery from "./ImageGallery";
import Tabs, { Tab } from "./Tabs";

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
  const history = await getHistory(sign as ZodiacSign);

  const tabs: Tab[] = [
    {
      label: "Today",
      content: <h2>{history[0].scope}</h2>,
      defaultChecked: true,
    },
    {
      label: "History",
      content: <h2>Historical scopes for {sign}</h2>,
    },
    {
      label: "Gallery",
      content: <ImageGallery sign={sign} urls={urls} />,
    },
  ];
  return (
    <div className="stretch prose mx-auto flex w-full max-w-md flex-col px-4 py-8">
      <Header sign={sign} />
      <div className="flex flex-col space-y-4">
        <Breadcrumbs sign={sign} />
        <Tabs tabs={tabs} />
        <Breadcrumbs sign={sign} />
      </div>
    </div>
  );
};

export default SignPage;
