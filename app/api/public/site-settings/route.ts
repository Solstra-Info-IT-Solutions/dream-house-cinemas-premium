import { NextResponse } from "next/server";
import { db } from "@/lib/db";
export const dynamic = "force-dynamic";
export async function GET() {
  const settings = await db.siteSetting.findUnique({ where: { id: "global" } });
  return NextResponse.json({ settings: settings ?? { locationName: "Kochi, Kerala, India", locationAddress: "Kochi, Kerala, India", mapUrl: "https://www.google.com/maps/search/?api=1&query=Kochi%2C%20Kerala%2C%20India" } });
}
