import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth, { getServerSession } from "next-auth";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
          email: { label: "Email", type: "text" },
          password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log('88888888888888888888')
        console.log(credentials)
          if (!credentials?.email || !credentials?.password) {
              return null
          }
          try {
              const response = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({
                    username: credentials.email,
                    password: credentials.password
                  })
                });
                console.log(response)
                if (!response.ok) {
                  return null;
                }
         
                const data = await response.json();
                console.log(data)
                if (data?.data?.token) {
                  return {
                    // id: data.data.user.id.toString(),
                    // name: data.data.user.name,
                    // email: data.data.user.email,
                    token: data.data.token,
                    // user: data.data.user
                  }
                }
              return null
          } catch (error) {
              return null
          }
      }
  })
],
callbacks: {
  async jwt({ token, user }) {
      if (user) {
          token.accessToken = user.token
          token.user = user.user
      }
      return token
  },
  async session({ session, token }) {
      session.accessToken = token.accessToken
      session.user = token.user
      return session
  }
},
pages: {
  signIn: '/',
}
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }

export const getAuthSession = () => getServerSession(authOptions);
