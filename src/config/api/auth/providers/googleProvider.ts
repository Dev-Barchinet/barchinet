import { postApiArchitectAuthSignInOAuth2V2 } from "@/services/architect-services/api-architect-auth-sign-in-oAuth2-v-2-post";
import { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_ID || "",
  clientSecret: process.env.GOOGLE_SECRET || "",
  profile: async (profile, tokens) => {
    const res = await postApiArchitectAuthSignInOAuth2V2({
      token: tokens?.access_token || "",
      providerType: 20_005_001,
    });

    return { ...res.value } as User;
  },
});
