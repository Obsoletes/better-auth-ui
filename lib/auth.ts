import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import {
  admin,
  apiKey,
  bearer,
  twoFactor,
  username,
  jwt,
  openAPI,
} from "better-auth/plugins";
import { passkey } from "better-auth/plugins/passkey";
import { Prisma } from "./Prisma";
import { checkNameOrEmail } from "./Plugin/checkNameOrEmail";

export const auth = betterAuth({
  appName: "Blog",
  database: prismaAdapter(Prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
  },
  plugins: [
    twoFactor(),
    username(),
    passkey(),
    admin(),
    apiKey(),
    bearer(),
    jwt(),
    checkNameOrEmail(),
    openAPI(),
  ],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    microsoft: {
      clientId: process.env.MICROSOFT_CLIENT_ID as string,
      clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
export const SocialProviders = Object.keys(
  auth.options.socialProviders
) as Array<keyof typeof auth.options.socialProviders>;
