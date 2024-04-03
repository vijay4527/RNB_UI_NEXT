import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { axiosPost,axiosGet } from "@/api";

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
        try {
          const response = await axiosPost('/User/LoginCheck', {
            "mobile": "",
            "fb_id": account.provider === "facebook" ?  account.access_token : "",
            "cart_id": "",
            "g_id": account.provider === "google" ?  account.access_token : "",
            "otp": "",
          });

          if (response.respObj) {
            token.userData = response.respObj;          }
        } catch (error) {
          console.error('Error checking login:', error);
        }
      }
      console.log("token after",token)
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.provider = token.provider; 
      session.account = token.account;
      session.userData = token.userData; 
      return session;
    },
  },

  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});
