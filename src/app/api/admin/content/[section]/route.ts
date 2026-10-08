import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { contentSectionSchema } from "@/lib/validation";

type RouteParams = { params: Promise<{ section: string }> };

export async function PUT(request: Request, { params }: RouteParams) {
  const { section } = await params;
  const body = await request.json().catch(() => null);
  const parsed = contentSectionSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const entries = Object.entries(parsed.data);
  await prisma.$transaction(
    entries.map(([key, value]) =>
      prisma.siteContent.upsert({
        where: { section_key: { section, key } },
        update: { value: value as object },
        create: { section, key, value: value as object },
      })
    )
  );

  revalidatePath("/");
  return NextResponse.json({ ok: true });
}
