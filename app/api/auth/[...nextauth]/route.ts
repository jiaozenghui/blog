import { authOptions } from "@/utils/auth";
import NextAuth from "next-auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };


export { default } from 'next-auth/middleware';

export const config = {
  matcher: [
    '/create-podcast',
    '/profile',
  ],
};
