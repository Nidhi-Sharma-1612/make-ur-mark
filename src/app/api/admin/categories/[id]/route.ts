import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { deleteUploadedImage } from "@/lib/uploads";
import { categorySchema } from "@/lib/validation";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const category = await prisma.category.findUnique({ where: { id } });
  if (!category) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(category);
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = categorySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (parsed.data.slug !== existing.slug) {
    const slugTaken = await prisma.category.findUnique({ where: { slug: parsed.data.slug } });
    if (slugTaken) {
      return NextResponse.json({ error: "A category with this slug already exists" }, { status: 409 });
    }
  }

  if (parsed.data.image !== existing.image) {
    await deleteUploadedImage(existing.image);
  }

  const category = await prisma.category.update({ where: { id }, data: parsed.data });
  return NextResponse.json(category);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const existing = await prisma.category.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.category.delete({ where: { id } });
  await deleteUploadedImage(existing.image);

  return NextResponse.json({ ok: true });
}
