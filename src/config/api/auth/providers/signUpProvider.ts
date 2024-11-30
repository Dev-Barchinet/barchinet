import Credentials from "next-auth/providers/credentials";
import { User } from "next-auth";

type CreateUserCredentials = {
  firstName: string;
  passwordToken: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  fileAccessCredential: string
  id: string
  accessToken: string
};

export const signUpProvider = Credentials({
  id: "CREATE_USER",
  name: "CreateCustomer",
  credentials: {
    firstName: { label: "First Name", type: "text" },
    passwordToken: { label: "passwordToken", type: "string" },
    lastName: { label: "Last Name", type: "text" },
    email: { label: "Email", type: "email" },
    phoneNumber: { label: "Phone Number", type: "text" },
    fileAccessCredential: { label: "fileAccessCredential", type: "text" },
    accessToken: { label: "accessToken", type: 'text' },
    id: { lable: 'id', type: 'text' }
  },
  async authorize(credentials: CreateUserCredentials | undefined): Promise<User | null> {
    if (credentials) {
      // Logging credentials for debugging; replace with actual sign-up logic

      // Assuming a user object is created/verified successfully
      const user: User = {
        id: credentials.id,
        firstName: credentials.firstName,
        lastName: credentials.lastName,
        email: credentials.email || "",
        fileAccessCredential: credentials.fileAccessCredential,
        passwordToken: credentials.passwordToken,
        accessToken: credentials.accessToken,
        avatar: ''
      };

      return user; // Return user to create session
    }

    // Return null if authorization fails
    return null;
  },
});
