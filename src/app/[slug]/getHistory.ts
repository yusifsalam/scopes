import { createClient } from "@/supabase/server";
import { signIds, ZodiacSign } from "../consts";

export async function getHistory(sign: ZodiacSign) {
  const supabase = await createClient("admin");

  const signId = signIds[sign];

  if (!signId) {
    console.error("Invalid sign provided:", sign);
    return [];
  }

  const { data, error } = await supabase
    .from("horoscopes")
    .select("date, scope")
    .eq("sign_id", signId)
    .order("date", { ascending: false });

  if (error) {
    console.error("Error fetching horoscope history:", error);
    return [];
  }

  return data ?? [];
}
