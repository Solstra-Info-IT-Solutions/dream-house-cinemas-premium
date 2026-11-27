import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
const schema = z.object({
  title: z.string().trim().min(2).max(140).optional(),
  description: z.string().max(5000).optional(),
  coverImage: z.string().url().optional().or(z.literal("")),
  mediaUrl: z.string().url().optional().or(z.literal("")),
  published: z.boolean().optional(),
  sortOrder: z.number().int().optional()
});
const slugify = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(); if (denied) return denied;
  const { id } = await params; const p = schema.safeParse(await req.json());
  if (!p.success) return NextResponse.json({ error: "Invalid Recent Work details" }, { status: 400 });
  try {
    const data = { ...p.data, ...(p.data.title ? { slug: slugify(p.data.title) + "-" + id.slice(-5) } : {}) };
    return NextResponse.json({ item: await db.recentWork.update({ where: { id }, data }) });
  } catch { return NextResponse.json({ error: "Recent Work item not found" }, { status: 404 }); }
}
export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const denied = await requireAdmin(); if (denied) return denied;
  const { id } = await params;
  try { return NextResponse.json({ item: await db.recentWork.delete({ where: { id } }) }); }
  catch { return NextResponse.json({ error: "Recent Work item not found" }, { status: 404 }); }
}
