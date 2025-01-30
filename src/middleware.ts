import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  console.log("Middleware running on:", path);
  console.log("Token found:", token ? "Yes" : "No");

  const isPublicPath = path === "/login" || path === "/signup";

  if (isPublicPath && token) {
    console.log("Redirecting authenticated user to /home");
    return NextResponse.redirect(new URL("/home", request.url));
  }

  if (!isPublicPath && !token) {
    console.log("Redirecting unauthenticated user to /login");
    return NextResponse.redirect(new URL("/login", request.url));
  }

  console.log("Middleware allowing request to proceed");
  return NextResponse.next();
}

export const config = {
  matcher: ["/home", "/dashboard/:path*", "/profile/:path*", "/signup", "/login", "/upload-song"],
};
