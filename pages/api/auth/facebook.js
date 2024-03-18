// pages/api/auth/facebook.js
import NextAuth from 'next-auth';
import { getSession } from 'next-auth/react';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import passport from 'passport';

passport.use(new FacebookStrategy({
  clientID:"230771886171126",
  clientSecret: "1bee2330b2482066af92f6b2c5adee71",
  callbackURL: 'https://localhost:3000/api/auth/callback/facebook',
  profileFields: ['id', 'email', 'gender', 'link', 'locale', 'name', 'timezone', 'updated_time', 'verified'],
}, (accessToken, refreshToken, profile, done) => {
  // Authentication callback logic
  return done(null, profile);
}));

const authHandler = async (req, res, options) => {
  return await new Promise(async(resolve, reject) => {
  await passport.authenticate('facebook', options, (error, user, info) => {
      if (error) {
        reject(error);
      } else {
        resolve({ user, info });
      }
    })(req, res);
  });
};

export default NextAuth({
  providers: [
    {
      id: 'facebook',
      name: 'Facebook',
      type: 'oauth',
      version: '2.0',
      scope: 'email',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://graph.facebook.com/v12.0/oauth/access_token',
      authorizationUrl: 'https://www.facebook.com/v12.0/dialog/oauth',
      profileUrl: 'https://graph.facebook.com/me',
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: `https://graph.facebook.com/${profile.id}/picture?type=large`
        };
      },
      signinUrl: async (redirectUrl) => {
        return `/api/auth/signin/facebook?callbackUrl=${encodeURIComponent(redirectUrl)}`;
      },
      callbackUrl: '/api/auth/callback/facebook',
      signin: async (params) => {
        return {
          url: `/api/auth/signin/facebook?callbackUrl=${encodeURIComponent(params.callbackUrl)}`,
          method: 'GET'
        };
      },
      callback: async (req, res, options) => {
        try {
          const { user, info } = await authHandler(req, res, options);
          if (!user) {
            return res.redirect(`/error?error=${encodeURIComponent(info && info.message ? info.message : 'Unknown error')}`);
          }
          return res.redirect(`${options.callbackUrl}?token=${encodeURIComponent(JSON.stringify(user))}`);
        } catch (error) {
          return res.redirect(`/error?error=${encodeURIComponent(error.message)}`);
        }
      }
    }
  ],
  callbacks: {
    async signIn(user, account, profile) {
      return true;
    }
  },
  secret: process.env.NEXTAUTH_SECRET,

});
