import { NextResponse } from "next/server";
import { getModuleContent } from "@/lib/content";

export async function POST(req: Request) {
  const { keys, clientDomain } = await req.json();
  const result: Record<string, string> = {};

  for (const key of keys) {
    result[key] = await getModuleContent(key, clientDomain);
  }

  return NextResponse.json(result);
}