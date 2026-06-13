import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({ data: {} });
  }
  return NextResponse.json(settings);
}

export async function PUT(request: Request) {
  const data = await request.json();
  let settings = await prisma.siteSettings.findFirst();
  if (!settings) {
    settings = await prisma.siteSettings.create({ data });
  } else {
    settings = await prisma.siteSettings.update({ where: { id: settings.id }, data });
  }
  return NextResponse.json(settings);
}
