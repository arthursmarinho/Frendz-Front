// app/api/login/route.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const idToken = (await cookies()).get("idToken");
  return NextResponse.json({ idToken: idToken?.value });
}
