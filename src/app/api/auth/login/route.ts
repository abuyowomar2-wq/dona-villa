import { NextResponse } from "next/server";
import { login } from "@/lib/session";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    const user = await login(email, password);
    
    if (!user) {
      return NextResponse.json({ error: "بيانات الدخول غير صحيحة" }, { status: 401 });
    }
    
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "حدث خطأ داخلي" }, { status: 500 });
  }
}
