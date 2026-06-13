import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const messages = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json(messages);
}

export async function POST(request: Request) {
  const data = await request.json();
  const message = await prisma.contactMessage.create({ data });
  return NextResponse.json(message, { status: 201 });
}

export async function PUT(request: Request) {
  const { id, ...data } = await request.json();
  const message = await prisma.contactMessage.update({ where: { id }, data });
  return NextResponse.json(message);
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });
  await prisma.contactMessage.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
