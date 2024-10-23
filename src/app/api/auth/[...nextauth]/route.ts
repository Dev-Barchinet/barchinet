import { signUpProvider } from "@/config/api/auth/providers/signUpProvider";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";

const nextAuthOptions: NextAuthOptions = {
  providers: [signUpProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
        token.avatar = user.avatar;
        token.accessToken = user.accessToken;
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
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
