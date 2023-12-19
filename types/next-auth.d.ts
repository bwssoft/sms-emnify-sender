import { DefaultSession, DefaultUser } from "next-auth"

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      emnify_token: string
    }
  }

  interface User extends DefaultUser {
    emnify_token: string
  }
}