import { User } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { customInstance } from "../../custom-instance";
import { TishtarResponseIdentityUsersCommandsV1SharedAuthUserSignOAuth2CommandResult } from "@/services/architect-services/api-architect-auth-sign-in-oAuth2-v-2-post.schemas";

export const googleProvider = GoogleProvider({
    clientId: process.env.GOOGLE_ID || "",
    clientSecret: process.env.GOOGLE_SECRET || "",
    profile: async (profile, tokens) => {
        const res =
            await customInstance<TishtarResponseIdentityUsersCommandsV1SharedAuthUserSignOAuth2CommandResult>(
                {
                    url: `/api/architect/auth/sign-in/oAuth2/v-2`,
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    data: {
                        token: tokens?.access_token || "",
                        providerType: 20_005_001,
                    },
                }
            );

        const userData = res.value;

        if (!userData?.id || !userData.token)
            throw new Error("Failed to signup using google.");

        const user = {
            ...userData,
            accessToken: userData?.token || "",
            email: userData?.emailAddress || "",
            avatar: "",
        };

        return { ...user } as User;
    },
});
