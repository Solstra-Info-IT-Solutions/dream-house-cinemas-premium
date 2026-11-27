import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
const schema = z.object({
  locationName: z.string().trim().min(2).max(160),
  locationAddress: z.string().trim().min(2).max(500),
  mapUrl: z.string().url().max(2000)
});
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;
  const settings = await db.siteSetting.findUnique({ where: { id: "global" } });
  return NextResponse.json({ settings });
}
export async function PUT(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const parsed = schema.safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ error: "Please enter a valid location, address and Google Maps URL." }, { status: 400 });
  const settings = await db.siteSetting.upsert({
    where: { id: "global" },
    create: { id: "global", ...parsed.data },
    update: parsed.data
  });
  return NextResponse.json({ settings });
}
