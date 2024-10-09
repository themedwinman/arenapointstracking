import NextAuth, { NextAuthOptions, User as NextAuthUser } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/db";
import { users } from "@/db/schema/users";
import { eq } from "drizzle-orm";

export interface ExtendedUser extends NextAuthUser {
  role: string;
  admin: boolean;
  superadmin: boolean;
}

let exportedDbUser: ExtendedUser | null = null;

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
    async session({ session, token }) {
      if (session?.user && token?.dbUser) {
        const extendedUser = token.dbUser as ExtendedUser;
        (session.user as ExtendedUser).admin = extendedUser.admin;
        (session.user as ExtendedUser).superadmin = extendedUser.superadmin;
        (session.user as ExtendedUser).role = extendedUser.superadmin ? 'superadmin' : extendedUser.admin ? 'admin' : 'user';
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        const extendedUser = user as ExtendedUser;
        token.dbUser = {
          admin: extendedUser.admin,
          superadmin: extendedUser.superadmin,
        };
        exportedDbUser = extendedUser; // Export the dbUser
      }
      return token;
    },
    async signIn({ user, account, profile, email, credentials }) {
      const userEmail = email || profile?.email;

      if (!userEmail) {
        console.log('No email found in sign in');
        return false;
      }

      let dbUser: ExtendedUser | null = null;
      try {
        console.log('Fetching user:', userEmail);
        dbUser = await db.select().from(users).where(eq(users.email, userEmail as string)).get() as unknown as ExtendedUser | null;
        console.log('Fetched user:', dbUser);
      } catch (error) {
        console.error('Error fetching user:', error);
        return false;
      }

      if (!dbUser) {
        try {
          await db.insert(users).values({
            email: userEmail as string,
            name: profile?.name || '',
            admin: false,
            superadmin: false,
          });

          dbUser = await db.select().from(users).where(eq(users.email, userEmail as string)).get() as unknown as ExtendedUser;
        } catch (error) {
          console.error('Error adding user:', error);
          return false;
        }
      }

      if (dbUser) {
        (user as ExtendedUser).admin = dbUser.admin;
        (user as ExtendedUser).superadmin = dbUser.superadmin;
        exportedDbUser = dbUser; // Export the dbUser
        console.log('User signed in:', user);
        console.log('dbUser:', dbUser);
        console.log('Permissions:', { admin: (user as ExtendedUser).admin, superadmin: (user as ExtendedUser).superadmin });
      }

      return true;
    },
  },
};

export { exportedDbUser };
export default NextAuth(options);