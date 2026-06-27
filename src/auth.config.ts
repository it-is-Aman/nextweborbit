import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  trustHost: true, // ✅ add this
  pages: {
    signIn: "/admin/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl, method } }) {
      const isLoggedIn = !!auth?.user;
      const isOnAdmin = nextUrl.pathname.startsWith("/admin");
      const isOnLogin = nextUrl.pathname.startsWith("/admin/login");
      const isApiRoute = nextUrl.pathname.startsWith("/api");

      if (isOnAdmin) {
        if (isOnLogin) return true;
        if (isLoggedIn) return true;
        return false;
      }

      if (isApiRoute) {
        if (method === "GET") return true;
        if (nextUrl.pathname.startsWith("/api/auth")) return true;
        if (nextUrl.pathname.startsWith("/api/contact")) return true;
        if (nextUrl.pathname.startsWith("/api/newsletter")) return true;

        return isLoggedIn;
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
