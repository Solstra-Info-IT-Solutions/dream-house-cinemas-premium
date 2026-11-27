import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
 const denied = await requireAdmin(); if (denied) return denied;
 const enquiries = await db.enquiry.findMany({ orderBy: { createdAt: "desc" }, include: { equipment: { include: { equipment: true } } }, take: 200 });
 return NextResponse.json({ enquiries });
}
