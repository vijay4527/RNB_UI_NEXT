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

    }),
  ],
  callbacks: {
    async jwt({ token, account }) {
      // console.log("token - " + JSON.stringify(token));
      // console.log("account - " + JSON.stringify(account));
      if (account) {
        console.log("Provider",account);
        token.accessToken = account.access_token;
      
      }
      return token;
    },
    async session({ session, token, user,profile }) {
      session.accessToken = token.accessToken;
      console.log("User-",user)
      console.log("token in-",token)
      console.log("session in-",session)
      console.log("Profile", profile)
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
