import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  const categories = await db.workCategory.findMany({
    where: { active: true },
    orderBy: { sortOrder: "asc" },
    include: { projects: { where: { published: true }, orderBy: { sortOrder: "asc" } } }
  });
  return NextResponse.json({ categories });
}
