import { NextResponse } from "next/server";
import { getAllSiteContentGrouped } from "@/lib/content";

export async function GET() {
  const grouped = await getAllSiteContentGrouped();
  return NextResponse.json(grouped);
}
