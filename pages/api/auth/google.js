import NextAuth from 'next-auth';
import { getSession } from 'next-auth/react';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import passport from 'passport';

console.log(process.env.GOOGLE_CLIENT_ID)
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:3000/api/auth/callback/google',
}, (accessToken, refreshToken, profile, done) => {

  return done(null, profile);
}));

const authHandler = (req, res, options) => {
  return new Promise((resolve, reject) => {
    passport.authenticate('google', options, (error, user, info) => {
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
      id: 'google',
      name: 'Google',
      type: 'oauth',
      version: '2.0',
      scope: 'email profile',
      params: { grant_type: 'authorization_code' },
      accessTokenUrl: 'https://oauth2.googleapis.com/token',
      authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
      profileUrl: 'https://www.googleapis.com/oauth2/v3/userinfo',
      profile: (profile) => {
        return {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          image: profile.photos[0].value
        };
      },
      signinUrl: async (redirectUrl) => {
        return `/api/auth/signin/google?callbackUrl=${encodeURIComponent(redirectUrl)}`;
      },
      callbackUrl: '/api/auth/callback/google',
      signin: async (params) => {
        return {
          url: `/api/auth/signin/google?callbackUrl=${encodeURIComponent(params.callbackUrl)}`,
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
  }
});
