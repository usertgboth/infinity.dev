import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

function isDbAvailable() {
  return Boolean(process.env.DATABASE_URL);
}

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password || !isDbAvailable()) return null;
        try {
          const user = await prisma.user.findUnique({ where: { email: creds.email } });
          if (!user?.password) return null;
          const ok = await bcrypt.compare(creds.password, user.password);
          if (!ok) return null;
          return { id: user.id, email: user.email, name: user.name, image: user.image, role: user.role } as any;
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!isDbAvailable()) return true;
      try {
        if (user.email && user.email === process.env.ADMIN_EMAIL) {
          await prisma.user.updateMany({ where: { email: user.email }, data: { role: "ADMIN" } });
        }
      } catch {}
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = (user as any).id;
        token.role = (user as any).role || "USER";
        if (isDbAvailable()) {
          try {
            const db = await prisma.user.findUnique({ where: { id: (user as any).id } });
            if (db) token.role = db.role as "USER" | "ADMIN";
          } catch {}
        }
      } else if (token.email && isDbAvailable()) {
        try {
          const db = await prisma.user.findUnique({ where: { email: token.email } });
          if (db) {
            token.id = db.id;
            token.role = db.role as "USER" | "ADMIN";
          }
        } catch {}
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
