import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isLoginPage = nextUrl.pathname.startsWith("/login")
      const isAuthRoutes =
        nextUrl.pathname.startsWith("/") ||
        nextUrl.pathname.startsWith("/message") ||
        nextUrl.pathname.startsWith("/enpoint")

      if (!isAuthRoutes && !isLoggedIn) return true

      if (isAuthRoutes && !isLoggedIn && !isLoginPage) return Response.redirect(new URL("/login", nextUrl))

      if (isLoggedIn && isLoginPage) return Response.redirect(new URL("/", nextUrl))

      return true
    },
    jwt({ token, user }) {
      if (user) {
        token = {
          ...token,
          emnify_token: user.emnify_token,
          uuid: user.uuid,
          name: user.name,
          role: user.role,
        }
      }
      return token
    },
    session({ session, token }) {
      // @ts-ignore
      session.user.emnify_token = token.emnify_token
      session.user.name = token.name
      // @ts-ignore
      session.user.role = token.role
      // @ts-ignore
      session.user.uuid = token.uuid
      return session
    }
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;


//
