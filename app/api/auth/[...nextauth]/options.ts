import User from '@/models/user'
import connectdb from '@/util/mongodb';
import  { AuthOptions } from 'next-auth'
import bcrypt from "bcryptjs";
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google'
import GitHubProvider from "next-auth/providers/github";

  export type CustomUser = {
    dbid?: string | null;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
export const authOptions : AuthOptions = {
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
            name: "Credentials",
            credentials: {
                email: { name: "Email", type: "text"},
                password: {  name: "Password", type: "password" }
              },      
            async authorize(credentials) {
                const email = credentials?.email
                const password = credentials?.password
               
                try {
                  await connectdb();
                  const user = await User.findOne({ email });
              
                  if (!user) {
                    return null;
                  }
              
                  const passwordsMatch = await bcrypt.compare(password || '', user.password || '');
              
                  if (!passwordsMatch) {
                    return null;
                  }
              
                  return user;
                } catch (error) {
                  console.error("Error in authorize:", error);
                  return null;
                }
              }
          }),
        ],
        session: {
          strategy: "jwt",
          maxAge: 30 * 24 * 60 * 60,
        },
        callbacks: {
            async signIn({ user }: { user: CustomUser }) {
                await connectdb();
                const dbuser = await User.findOne({ email: user.email});
                
                if (!dbuser) {
                  return true;
                }
                if (dbuser) {
                  user.dbid = dbuser._id;
                  return true;
                }
                // Update properties based on your User model
              
                return true;
              },
          async jwt({ token, user }: { token: any; user?: CustomUser }) {
            if (user) {
              // Modify token directly
              token.userdbid = user.dbid;
            }
  
              return token
          },
          async session({ session, token }: { session: any; token: any }) {
            session.user.dbid = token?.userdbid;
          
            return session;
          },
        },


        secret: process.env.NEXTAUTH_SECRET,
        pages: {
          signIn: "/login",
          error: '/auth/error'
        },
      };