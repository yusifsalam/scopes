import { createClient as supaClient } from "@supabase/supabase-js";
import Header from "../components/layout/Header";
import { ZodiacSign } from "../consts";
import Breadcrumbs from "./Breadcrumbs";
import { getHistory } from "./getHistory";
import { getMedia } from "./getMedia";
import History from "./History";
import ImageGallery from "./ImageGallery";
import ScopeToday from "./ScopeToday";
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
      content: <ScopeToday scope={history[0].scope} />,
      defaultChecked: true,
    },
    {
      label: "History",
      content: <History data={history} sign={sign} />,
    },
    {
      label: "Gallery",
      content: <ImageGallery sign={sign} urls={urls} />,
    },
  ];
  return (
    <div className="prose mx-auto flex w-full max-w-md grow flex-col px-4 py-8">
      <Header sign={sign} />
      <div className="flex max-w-md grow flex-col space-y-4">
        <Breadcrumbs sign={sign} />
        <div className="grow self-center sm:-mx-20 md:-mx-30">
          <Tabs tabs={tabs} />
        </div>
        <Breadcrumbs sign={sign} />
      </div>
    </div>
  );
};

export default SignPage;
