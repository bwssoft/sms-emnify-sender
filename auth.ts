import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { User } from 'next-auth/types';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const { token } = credentials
        if (token) return { emnify_token: token } as unknown as User;
        return null;
      },
    }),
  ],
});