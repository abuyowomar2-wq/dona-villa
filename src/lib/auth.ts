import { prisma } from "./prisma";
import bcrypt from "bcryptjs";

export async function verifyCredentials(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return null;
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return null;
  const { password: _, ...userWithoutPassword } = user;
  return userWithoutPassword;
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}
