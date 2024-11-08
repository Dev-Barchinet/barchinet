import GoogleProvider from "next-auth/providers/google";

export const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_ID || "",
  clientSecret: process.env.GOOGLE_SECRET || "",
  authorization: {
    params: {
      scope: "email",
    },
  },
});
