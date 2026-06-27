import { NextResponse } from 'next/server';
import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

const { auth } = NextAuth(authConfig);

// export default auth((_req) => {
export default auth((req) => {
    const { nextUrl } = req;

    // Fix double slashes or malformed URLs
    if (nextUrl.pathname.startsWith('//')) {
        return NextResponse.redirect(new URL(nextUrl.pathname.replace(/^\/+/, '/'), req.url));
    }

    const response = NextResponse.next();

    // Add security headers
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');

    return response;
});

export const config = {
    // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
    ],
};
