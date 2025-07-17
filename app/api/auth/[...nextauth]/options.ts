import User from '@/models/user';
import connectdb from '@/util/mongodb';
import { AuthOptions } from 'next-auth';
import bcrypt from 'bcryptjs';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import GitHubProvider from 'next-auth/providers/github';

export type CustomUser = {
  dbid?: string | null;
  image?: string | null;
  username?: string | null;
  name?: string | null;
  provider?: string | null;
  email?: string | null;
  avatar?: string | null;
  isVerified?: boolean | null;
  isAdmin?: boolean | null;
  twoFactorEnabled?: boolean | null;
};

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { name: 'Email or Username', type: 'text' },
        password: { name: 'Password', type: 'password' },
        otpCode: { name: 'OTP Code', type: 'text' },
        skipOTP: { name: 'Skip OTP', type: 'text' },
      },
      async authorize(credentials) {
        const identifier = credentials?.email; // Can be email or username
        const password = credentials?.password;
        const otpCode = credentials?.otpCode;
        const skipOTP = credentials?.skipOTP === 'true';

        try {
          await connectdb();

          const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
          });

          if (!user) {
            console.log('User not found');
            return null;
          }

          const passwordsMatch = await bcrypt.compare(password || '', user.password || '');

          if (!passwordsMatch) {
            console.log('Passwords do not match');
            return null;
          }

          // Check if 2FA is enabled and we're not skipping OTP (for OAuth logins)
          if (user.twoFactorEnabled && !skipOTP) {
            if (!otpCode) {
              // Return a special response to indicate 2FA is required
              throw new Error('2FA_REQUIRED');
            }

            // Verify OTP
            if (!user.twoFactorToken || user.twoFactorToken !== otpCode.toUpperCase()) {
              console.log('Invalid 2FA code');
              throw new Error('INVALID_OTP');
            }

            if (user.twoFactorTokenExpiry && Date.now() > user.twoFactorTokenExpiry) {
              console.log('2FA code expired');
              throw new Error('EXPIRED_OTP');
            }

            // Clear the OTP after successful verification
            await User.findByIdAndUpdate(user._id, {
              twoFactorToken: null,
              twoFactorTokenExpiry: null
            });
          }

          return user;
        } catch (error) {
          console.error('Error in authorize:', error);
          if (error instanceof Error) {
            throw error;
          }
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60,
  },
  callbacks: {
    async signIn({ user }: { user: CustomUser }) {
      await connectdb();
      const dbuser = await User.findOne({ email: user.email });

      if (!dbuser) {
        return true;
      }

      user.dbid = dbuser._id;
      user.avatar = dbuser.avatar;
      user.email = dbuser.email;
      user.name = dbuser.name;
      user.username = dbuser.username;
      user.isVerified = dbuser.isVerified;
      user.isAdmin = dbuser.isAdmin;
      user.twoFactorEnabled = dbuser.twoFactorEnabled;

      return true;
    },
    async jwt({ token, user, trigger, session }: { token: any; user?: CustomUser; trigger?: any; session?: any }) {
      if (user) {
        token.userdbid = user.dbid;
        token.avatar = user.avatar;
        token.email = user.email;
        token.name = user.name;
        token.username = user.username;
        token.isVerified = user.isVerified;
        token.isAdmin = user.isAdmin;
        token.twoFactorEnabled = user.twoFactorEnabled;
      }
      if (trigger === 'update') {
        return { ...token, ...session.user };
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      session.user.dbid = token.userdbid;
      session.user.avatar = token.avatar;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.isVerified = token.isVerified;
      session.user.isAdmin = token.isAdmin;
      session.user.twoFactorEnabled = token.twoFactorEnabled;

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
};