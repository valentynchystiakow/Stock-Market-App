// imports required modules and components
import { NextRequest, NextResponse } from "next/server";
import { getSessionCookie } from "better-auth/cookies";


// creates and exports middleware async function that manages authentication session cookies
export async function middleware(request: NextRequest) {
    // gets session cookie from request
    const sessionCookie = getSessionCookie(request);

    // redirects to sign in page if session cookie is not found
    if (!sessionCookie) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // returns next response if session cookie is found
    return NextResponse.next();
}

// creates config object for middleware
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sign-in|sign-up|assets).*)',
    ],
};