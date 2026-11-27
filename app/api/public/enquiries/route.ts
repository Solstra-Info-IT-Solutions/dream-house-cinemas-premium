import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { db } from "@/lib/db";

const schema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().min(7).max(30),
  subject: z.string().trim().max(160).optional(),
  message: z.string().trim().max(5000).optional(),
  equipmentIds: z.array(z.string().min(1)).max(50).default([])
});

export async function POST(request: NextRequest) {
  try {
    const parsed = schema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ error: "Please check the enquiry details." }, { status: 400 });
    const data = parsed.data;
    const uniqueIds = [...new Set(data.equipmentIds)];
    const items = uniqueIds.length ? await db.equipmentItem.findMany({ where: { id: { in: uniqueIds }, active: true }, select: { id: true } }) : [];
    if (items.length !== uniqueIds.length) return NextResponse.json({ error: "One or more selected equipment items are unavailable." }, { status: 400 });
    const enquiry = await db.enquiry.create({
      data: { name: data.name, email: data.email, phone: data.phone, subject: data.subject || "Equipment enquiry", message: data.message || "", equipment: { create: items.map(item => ({ equipmentId: item.id })) } },
      include: { equipment: { include: { equipment: true } } }
    });

    const recipient = process.env.ENQUIRY_TO_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;
    const from = process.env.RESEND_FROM_EMAIL;
    if (recipient && apiKey && from) {
      const resend = new Resend(apiKey);
      const selected = enquiry.equipment.map(row => row.equipment.name).join(", ") || "No equipment selected";
      await resend.emails.send({
        from, to: recipient, replyTo: data.email,
        subject: `Website enquiry: ${enquiry.subject}`,
        text: `Name: ${data.name}\nEmail: ${data.email}\nPhone: ${data.phone}\nEquipment: ${selected}\n\nMessage:\n${data.message || "-"}\n\nEnquiry ID: ${enquiry.id}`
      });
    }
    return NextResponse.json({ ok: true, enquiryId: enquiry.id, emailConfigured: Boolean(recipient && apiKey && from) }, { status: 201 });
  } catch (error) {
    console.error("Enquiry submission failed", error);
    return NextResponse.json({ error: "We could not submit your enquiry. Please try again." }, { status: 500 });
  }
}
