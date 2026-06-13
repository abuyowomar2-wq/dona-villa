import { cookies } from "next/headers";
import { verifyCredentials } from "./auth";

const SESSION_COOKIE = "admin_session";

export async function createSession(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 8, // 8 hours
    path: "/",
  });
}

export async function getSession(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(SESSION_COOKIE)?.value;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function login(email: string, password: string) {
  const user = await verifyCredentials(email, password);
  if (!user) return null;
  // Simple token - in production use proper JWT
  const token = Buffer.from(JSON.stringify({ id: user.id, email: user.email })).toString("base64");
  await createSession(token);
  return user;
}
