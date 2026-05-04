import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function proxy(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (session) {
    return NextResponse.next();
  } else {
    const loginUrl = new URL("/login", request.url);

    loginUrl.searchParams.set("redirect", request.nextUrl.pathname);

    return NextResponse.redirect(loginUrl);
  }
}

export const config = {
  matcher: ["/my-profile", "/my-profile/:path*", "/products/:path+"],
};