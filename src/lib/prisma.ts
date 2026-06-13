import { PrismaClient } from "@/generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaPg } from "@prisma/adapter-pg";

function getAdapter() {
  const dbUrl = process.env.DATABASE_URL || "";

  if (dbUrl.startsWith("postgresql://") || dbUrl.startsWith("postgres://")) {
    return new PrismaPg({ connectionString: dbUrl });
  }

  return new PrismaBetterSqlite3({ url: process.env.SQLITE_PATH || "dev.db" });
}

const adapter = getAdapter();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
