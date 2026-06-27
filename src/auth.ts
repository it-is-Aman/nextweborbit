import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({ email: z.string().email(), password: z.string().min(6) })
                    .safeParse(credentials);

                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    // Hardcoded admin check
                    if (
                        email === process.env.ADMIN_EMAIL &&
                        password === process.env.ADMIN_PASSWORD
                    ) {
                        return {
                            id: '1',
                            name: 'Admin User',
                            email: email,
                        };
                    }
                }
                return null;
            },
        }),
    ],
});
