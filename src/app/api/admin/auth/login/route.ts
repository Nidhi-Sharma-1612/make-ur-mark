import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHash = process.env.ADMIN_PASSWORD_HASH;

  if (!adminEmail || !adminPasswordHash) {
    return NextResponse.json({ error: "Admin account is not configured" }, { status: 500 });
  }

  const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = await compare(password, adminPasswordHash);

  // TEMPORARY DEBUG LOGGING — remove after diagnosing login issue.
  console.log("[admin-login-debug]", {
    envEmailLength: adminEmail.length,
    envHashLength: adminPasswordHash.length,
    envHashPrefix: adminPasswordHash.slice(0, 7),
    envHashHasBackslash: adminPasswordHash.includes("\\"),
    envHashHasWhitespace: /\s/.test(adminPasswordHash),
    submittedEmailLength: email.length,
    submittedPasswordLength: password.length,
    emailMatches,
    passwordMatches,
  });

  if (!emailMatches || !passwordMatches) {
    return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
  }

  const token = await createSessionToken(adminEmail);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
  return response;
}
