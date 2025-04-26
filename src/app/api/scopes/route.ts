import { getScopes } from "@/app/getScopes";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { error: scopesError } = await getScopes();

  if (scopesError) {
    console.error("Error in getScopes:", scopesError);
    return NextResponse.json({ ok: false, error: scopesError }, { status: 500 });
  }

  try {
    console.log("Scopes updated successfully. Starting revalidation...");

    revalidatePath("/");
    console.log("Revalidated: /");

    revalidatePath("/[slug]", "layout");
    console.log("Revalidated layout: /[slug]");

    console.log("Revalidation complete.");
    return NextResponse.json({ ok: true, revalidated: true });

  } catch (revalError) {
    console.error("Error during revalidation:", revalError);
    return NextResponse.json({ ok: true, revalidated: false, revalidationError: (revalError as Error).message }, { status: 200 });
  }
}
