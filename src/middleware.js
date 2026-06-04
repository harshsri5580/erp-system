import { NextResponse } from "next/server";

export function middleware(request) {

  console.log("MIDDLEWARE RUNNING");

  const token =
    request.cookies.get("token")?.value;

  const pathname =
    request.nextUrl.pathname;

  console.log("TOKEN:", token);
  console.log("PATH:", pathname);

  // LOGIN REQUIRED

  if (
    pathname.startsWith("/dashboard") &&
    !token
  ) {

    return NextResponse.redirect(
      new URL("/login", request.url)
    );

  }

  return NextResponse.next();

}

export const config = {
  matcher: ["/dashboard/:path*"],
};