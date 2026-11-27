import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    if (!adminEmail || !passwordHash) return NextResponse.json({ error: "Admin credentials are not configured" }, { status: 503 });
    if (typeof email !== "string" || typeof password !== "string" || email.toLowerCase() !== adminEmail.toLowerCase() || !(await compare(password, passwordHash))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    await createAdminSession();
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Unable to sign in" }, { status: 400 }); }
}
