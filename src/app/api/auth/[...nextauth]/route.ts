import { googleProvider } from "@/config/api/auth/providers/googleProvider";
import { signInProvider } from "@/config/api/auth/providers/signInProvider";
import { signUpProvider } from "@/config/api/auth/providers/signUpProvider";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

const nextAuthOptions: NextAuthOptions = {
  providers: [googleProvider, signUpProvider, signInProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token = { ...user };
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
        session.user.avatar = token.avatar;
        session.user.accessToken = token.accessToken;
        session.user.passwordToken = token.passwordToken;
        session.user.fileAccessCredential = token.fileAccessCredential;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  pages: {
    error: "/",
    signIn: '/'
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: true,
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
