import { NextResponse } from "next/server";
import { compare } from "bcryptjs";
import { z } from "zod";
import { createSessionToken, SESSION_COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/**
 * ADMIN_PASSWORD_HASH_B64 is the bcrypt hash, base64-encoded.
 *
 * The raw hash contains literal `$` characters (e.g. `$2b$10$...`), which
 * have repeatedly been mangled by environment-variable systems that treat
 * `$` as the start of variable interpolation (both Next.js's own .env file
 * parser, and some hosting platforms' env var storage). Base64 has no `$`
 * characters, so storing the hash this way sidesteps that whole class of bug
 * regardless of platform quirks.
 */
function decodeHash(encoded: string): string {
  return Buffer.from(encoded, "base64").toString("utf-8");
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const { email, password } = parsed.data;
  const adminEmail = process.env.ADMIN_EMAIL;
  const adminPasswordHashB64 = process.env.ADMIN_PASSWORD_HASH_B64;

  if (!adminEmail || !adminPasswordHashB64) {
    return NextResponse.json({ error: "Admin account is not configured" }, { status: 500 });
  }

  const adminPasswordHash = decodeHash(adminPasswordHashB64);
  const emailMatches = email.toLowerCase() === adminEmail.toLowerCase();
  const passwordMatches = await compare(password, adminPasswordHash);

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
