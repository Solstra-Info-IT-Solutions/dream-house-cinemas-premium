import { NextRequest, NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { createAdminSession } from "@/lib/admin-auth";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const adminEmail = process.env.ADMIN_EMAIL;
    const passwordHash = process.env.ADMIN_PASSWORD_HASH;
    // Public demo credentials are intentionally restricted to Vercel Preview deployments.
    // Production always requires the configured bcrypt-backed ADMIN_EMAIL / ADMIN_PASSWORD_HASH pair.
    const demoEmail = process.env.VERCEL_ENV === "preview" ? (process.env.ADMIN_DEMO_EMAIL || "admin@dreamhousecinemas.com") : undefined;
    const demoPassword = process.env.VERCEL_ENV === "preview" ? (process.env.ADMIN_DEMO_PASSWORD || "DHC-Preview@2026!") : undefined;
    const isDemoLogin = Boolean(demoEmail && demoPassword && typeof email === "string" && typeof password === "string" && email.toLowerCase() === demoEmail.toLowerCase() && password === demoPassword);
    if ((!adminEmail || !passwordHash) && !isDemoLogin) return NextResponse.json({ error: "Admin credentials are not configured" }, { status: 503 });
    if (typeof email !== "string" || typeof password !== "string" || (!isDemoLogin && (!adminEmail || !passwordHash || email.toLowerCase() !== adminEmail.toLowerCase() || !(await compare(password, passwordHash))))) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }
    await createAdminSession();
    return NextResponse.json({ ok: true });
  } catch { return NextResponse.json({ error: "Unable to sign in" }, { status: 400 }); }
}
