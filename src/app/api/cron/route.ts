import { getScopes } from "@/app/getScopes";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  if (
    req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const res = await getScopes();
  console.log("new scopes", res);
  return NextResponse.json({ ok: true });
}
