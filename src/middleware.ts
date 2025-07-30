import { NextResponse } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const publicRoutes = ["/", "/login", "/signup", "/confirmemail"];

  console.log(user);
  
  if (
    !publicRoutes.some((route) => req.nextUrl.pathname == (route)) &&
    !user
  ) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (user && (req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/signup' || req.nextUrl.pathname === '/confirmemail')) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
