import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { settingsSchema } from "@/lib/validation";

export async function GET() {
  const settings = await prisma.settings.findUnique({ where: { id: "default" } });
  return NextResponse.json(
    settings ?? { id: "default", whatsappNumber: "91XXXXXXXXXX", contactEmail: null, instagramUrl: null }
  );
}

export async function PUT(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = settingsSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const settings = await prisma.settings.upsert({
    where: { id: "default" },
    update: parsed.data,
    create: { id: "default", ...parsed.data },
  });

  revalidatePath("/", "layout");
  return NextResponse.json(settings);
}
