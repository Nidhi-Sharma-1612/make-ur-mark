import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { deleteUploadedImage } from "@/lib/uploads";
import { productSchema } from "@/lib/validation";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const product = await prisma.product.findUnique({ where: { id } });
  if (!product) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(product);
}

export async function PUT(request: Request, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json().catch(() => null);
  const parsed = productSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  if (parsed.data.slug !== existing.slug) {
    const slugTaken = await prisma.product.findUnique({ where: { slug: parsed.data.slug } });
    if (slugTaken) {
      return NextResponse.json({ error: "A product with this slug already exists" }, { status: 409 });
    }
  }

  if (parsed.data.image !== existing.image) {
    await deleteUploadedImage(existing.image);
  }

  const product = await prisma.product.update({ where: { id }, data: parsed.data });
  return NextResponse.json(product);
}

export async function DELETE(_request: Request, { params }: RouteParams) {
  const { id } = await params;
  const existing = await prisma.product.findUnique({ where: { id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await prisma.product.delete({ where: { id } });
  await deleteUploadedImage(existing.image);

  return NextResponse.json({ ok: true });
}
