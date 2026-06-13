import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const categories = await prisma.serviceCategory.findMany({
    include: { _count: { select: { services: true } } },
    orderBy: { sortOrder: "asc" },
  });
  return NextResponse.json(categories);
}

export async function POST(request: Request) {
  const data = await request.json();
  const category = await prisma.serviceCategory.create({ data });
  return NextResponse.json(category, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const category = await prisma.serviceCategory.update({ where: { id }, data });
  return NextResponse.json(category);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await prisma.serviceCategory.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
