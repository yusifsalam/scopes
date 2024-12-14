import { NextRequest, NextResponse } from "next/server";
import { getScopes } from "@/app/getScopes";

export const maxDuration = 30;

export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { error } = await getScopes();
  if (error) {
    return NextResponse.json({ ok: false });
  }

  return NextResponse.json({ ok: true });
}
