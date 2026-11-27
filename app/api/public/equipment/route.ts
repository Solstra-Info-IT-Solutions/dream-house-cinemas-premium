import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  const categories = await db.equipmentCategory.findMany({ where: { active: true }, orderBy: { sortOrder: "asc" }, include: { items: { where: { active: true }, orderBy: { sortOrder: "asc" }, select: { id: true, name: true, description: true, price: true, imageUrl: true } } } });
  return NextResponse.json({ categories });
}
