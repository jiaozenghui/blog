import { PrismaAdapter } from "@auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./connect";
import { getServerSession  } from "next-auth";

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  logger: {
    error(code, metadata) {
      log.error(code, metadata)
    },
    warn(code) {
      log.warn(code)
    },
    debug(code, metadata) {
      log.debug(code, metadata)
    }
  }
};

// export const getAuthSession = () => getServerSession(authOptions);

export function getAuthSession(
  ...args
) {
  return getServerSession(...args, config)
}