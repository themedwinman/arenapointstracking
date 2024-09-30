import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { db } from '@/db';
import { users } from '@/db/schema/users';
import { eq } from 'drizzle-orm';

declare module 'next-auth' {
  interface User {
    superadmin?: boolean;
    admin?: boolean;
  }
}



const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET as string,
  callbacks: {
    async session({ session, token, user }) {
      return session;
    },
    async signIn({ user, account, profile, email, credentials }) {
      // Get email from Google OAuth session or next-session
      const userEmail = email || profile?.email;

      if (!userEmail) {
        console.log('No email found in sign in');
        return false;
      }

      let dbUser;
      try {
        // Fetch user from the database
        dbUser = await db.select().from(users).where(eq(users.email, userEmail as string)).get();
      } catch (error) {
        console.error('Error fetching user:', error);
        return false;
      }

      if (!dbUser) {
        try {
          // Add new user to the database
          await db.insert(users).values({
            email: userEmail as string,
            name: profile?.name || '',
            admin: false,
            superadmin: false,
          });

          // Fetch the newly added user
          dbUser = await db.select().from(users).where(eq(users.email, userEmail as string)).get();
        } catch (error) {
          console.error('Error adding user:', error);
          return false;
        }
      }

      if (dbUser) {
        user.admin = dbUser.admin;
        user.superadmin = dbUser.superadmin;
        console.log('User signed in:', user);
        console.log('dbUser:', dbUser);
        console.log('Permissions:', { admin: user.admin, superadmin: user.superadmin });
      }

      return true;
    },
  },
};

export default NextAuth(options);