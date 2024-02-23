'use server';

import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { User } from 'next-auth/types';
import bcrypt from "bcrypt"
import { listUserByUsername } from './app/lib/repository';

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ username: z.string(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { username, password } = parsedCredentials.data;
          const user = await listUserByUsername(username);
          if (!user || !user?.password) return null;
          const { token } = credentials
          const passwordsMatch = await bcrypt.compare(password, user?.password);
          if (passwordsMatch) return {
            ...user, emnify_token: token
          } as unknown as User;
        }
        return null;
      },
    }),
  ],
});