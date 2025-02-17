import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/api/health"
]);


interface Auth {
  userId: string | null;
}

interface MiddlewareOptions {
  beforeAuth?: (req: Request) => null | void;
  afterAuth?: (auth: Auth, req: Request) => Response | null | void;
  debug?: boolean;
}

export default clerkMiddleware({
  // Add your middleware here

  beforeAuth: (req: NextRequest): null | void => {
    if (isPublicRoute(req)) return null;
  },

  afterAuth: (auth: Auth, req: NextRequest): Response | null | void => {
    if (!isPublicRoute(req) && !auth.userId) {
      const searchParams = new URLSearchParams({
        redirect: req.url,
      });

      const signInUrl = `/sign-in?${searchParams.toString()}`;

      return Response.redirect(new URL(signInUrl, req.url));
    }
  },

  debug: process.env.NODE_ENV === "development",
} as MiddlewareOptions);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};