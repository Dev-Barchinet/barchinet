import Credentials from "next-auth/providers/credentials";
import { User } from "next-auth";

type UserCredentials = {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  fileAccessCredential: string;
  id: string;
  accessToken: string;
};

export const signInProvider = Credentials({
  id: "LOGIN_USER",
  name: "LoginUser",
  credentials: {
    firstName: { label: "First Name", type: "text" },
    lastName: { label: "Last Name", type: "text" },
    email: { label: "Email", type: "email" },
    phoneNumber: { label: "Phone Number", type: "text" },
    fileAccessCredential: { label: "fileAccessCredential", type: "text" },
    accessToken: { label: "accessToken", type: "text" },
    id: { lable: "id", type: "text" },
  },
  async authorize(credentials: UserCredentials | undefined): Promise<User | null> {
    if (credentials) {
      // Logging credentials for debugging; replace with actual sign-up logic

      // Assuming a user object is created/verified successfully
      const user: User = {
        id: credentials.id,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email || "",
        fileAccessCredential: credentials.fileAccessCredential,
        accessToken: credentials.accessToken,
        avatar: "",
      };

      return user; // Return user to create session
    }

    // Return null if authorization fails
    return null;
  },
});
