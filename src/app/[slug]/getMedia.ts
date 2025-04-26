import { createClient } from "@/supabase/server";

export async function getMedia(sign: string) {
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