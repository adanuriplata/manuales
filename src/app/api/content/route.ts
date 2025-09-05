import { NextResponse } from "next/server";
import { getModuleContent } from "@/lib/content";

export async function POST(req: Request) {
  const { keys } = await req.json();
  const result: Record<string, string> = {};

  for (const key of keys) {
    console.log('la key que llego a la api antes de traer el content', key)
    result[key] = await getModuleContent(key);
    console.log(result[key])
  }

  return NextResponse.json(result);
}