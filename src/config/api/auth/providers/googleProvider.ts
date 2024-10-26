import axios from "axios"
import GoogleProvider from "next-auth/providers/google"

export const googleProvider = GoogleProvider({
    clientId: process.env.GOOGLE_ID || '',
    clientSecret: process.env.GOOGLE_SECRET || '',
    profile: async (profile, tokens) => {
        console.log('🚀 ~ profile: ~ tokens:', tokens)
        const res = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${tokens.access_token}`,
            },
        })
        console.log('🚀 ~ get ~ res:', res.data)
        return { ...res.data, customTOken: 'dsad' }
    },
})