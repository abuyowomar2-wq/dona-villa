import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryId = searchParams.get("categoryId");
  
  const services = await prisma.service.findMany({
    where: categoryId ? { categoryId } : undefined,
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return NextResponse.json(services);
}

export async function POST(request: Request) {
  const data = await request.json();
  const service = await prisma.service.create({ data });
  return NextResponse.json(service, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const service = await prisma.service.update({ where: { id }, data });
  return NextResponse.json(service);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await prisma.service.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
