import { connectToDB } from "@/database/mongose";
import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { nextCookies } from "better-auth/next-js";
import type { Db } from "mongodb";

const createAuth = (db: Db) =>
  betterAuth({
    database: mongodbAdapter(db),
    secret: process.env.BETTER_AUTH_SECRET,
    baseURL: process.env.BETTER_AUTH_URL,
    emailAndPassword: {
      enabled: true,
      disableSignUp: false,
      requireEmailVerification: false,
      minPasswordLength: 8,
      maxPasswordLength: 28,
      autoSignIn: true,
    },
    plugins: [nextCookies()],
  });

type AuthInstance = ReturnType<typeof createAuth>;
let authInstance: AuthInstance | null = null;

export const getAuth = async (): Promise<AuthInstance> => {
  if (authInstance) return authInstance;

  const mongoose = await connectToDB();
  const db = mongoose.connection.db;
  if (!db) throw new Error("MongoDB connection not found");

  authInstance = createAuth(db);
  return authInstance;
};