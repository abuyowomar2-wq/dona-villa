import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const offers = await prisma.offer.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(offers);
}

export async function POST(request: Request) {
  const data = await request.json();
  const offer = await prisma.offer.create({ data });
  return NextResponse.json(offer, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const offer = await prisma.offer.update({ where: { id }, data });
  return NextResponse.json(offer);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await prisma.offer.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
