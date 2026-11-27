
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import { getAdminByEmail } from "@/lib/admin-db";
import { verifyPassword } from "@/lib/password";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        const parsed = z
          .object({
            email: z.email(),
            password: z.string().min(1),
          })
          .safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        const admin = await getAdminByEmail(email);

        if (!admin || !admin.isApproved) {
          return null;
        }

        const passwordMatches = await verifyPassword(
          password,
          admin.passwordHash
        );

        if (!passwordMatches) {
          return null;
        }

        return {
          id: String(admin.id),
          name: admin.name,
          email: admin.email,
        };
      },
    }),
  ],
});
