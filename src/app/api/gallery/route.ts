import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const images = await prisma.galleryImage.findMany({ orderBy: { sortOrder: "asc" } });
  return NextResponse.json(images);
}

export async function POST(request: Request) {
  const data = await request.json();
  const image = await prisma.galleryImage.create({ data });
  return NextResponse.json(image, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const image = await prisma.galleryImage.update({ where: { id }, data });
  return NextResponse.json(image);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await prisma.galleryImage.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
