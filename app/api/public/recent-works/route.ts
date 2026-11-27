import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  const items = await db.recentWork.findMany({ where: { published: true }, orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }] });
  return NextResponse.json({ items });
}
