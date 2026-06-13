import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let content = await prisma.homeContent.findFirst();
  if (!content) {
    content = await prisma.homeContent.create({ data: {} });
  }
  return NextResponse.json(content);
}

export async function PUT(request: Request) {
  const data = await request.json();
  let content = await prisma.homeContent.findFirst();
  if (!content) {
    content = await prisma.homeContent.create({ data });
  } else {
    content = await prisma.homeContent.update({ where: { id: content.id }, data });
  }
  return NextResponse.json(content);
}
