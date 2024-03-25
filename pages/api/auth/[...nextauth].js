import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 5 * 60,
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      fields: ['id', 'name', 'email', 'picture', 'phone'], // Include 'phone' field

    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        token.account = account; 
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider; 
      session.account = token.account;
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
