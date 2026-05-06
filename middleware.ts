import { auth } from "./lib/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  const isAuthPage = pathname.startsWith("/auth");
  const publicPaths = ["/", "/learn-more", "/watch-demo", "/privacy", "/terms"];
  const isPublicPage = publicPaths.includes(pathname);

  if (!isLoggedIn && !isAuthPage && !isPublicPage) {
    return Response.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isLoggedIn && isAuthPage) {
    return Response.redirect(new URL("/dashboard", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|$).*)"],
};