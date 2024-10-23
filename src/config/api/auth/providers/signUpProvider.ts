import Credentials from "next-auth/providers/credentials";
import { User } from 'next-auth'

type CreateUserCredentials = {
  firstName: string;
  password: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
};

export const signUpProvider = Credentials({
  id: "CREATE_USER",
  name: "CreateCustomer",
  credentials: {
    firstName: { label: "firstName", type: "text" },
    password: { label: "password", type: "password" },
    lastName: { label: "lastName", type: "text" },
    email: { label: "email", type: "email" },
    phoneNumber: { label: "phoneNumber", type: "number" },
  },
  async authorize(credentials: CreateUserCredentials | undefined): Promise<User | null> {
    console.log(credentials)
    return null
  },
});
