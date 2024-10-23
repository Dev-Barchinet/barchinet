// types/next-auth.d.ts
import 'next-auth';

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession`, and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      id: string;          // Add the user's ID
      firstName: string;    // Add first name
      lastName: string;     // Add last name
      avatar: string;       // Add avatar URL
      accessToken: string;  // Add access token
    } & DefaultSession["user"];
    accessToken?: string;
  }

  interface User {
    id: string;
    firstName: string;
    lastName: string;
    avatar: string;
    accessToken: string;
  }

  interface JWT {
    id: string;
    accessToken: string;
    firstName: string;
    lastName: string;
    avatar: string;
  }
}
