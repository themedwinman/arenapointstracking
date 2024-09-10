// getUserRole.ts
import { db } from '@/db';
import { users } from '@/db/schema/users';
import knex, { select } from 'knex';

// Make sure db is called as a function
const dbInstance = db;

interface User {
  id: string;
  admin: boolean;
  superadmin: boolean;
}

export const getUserRole = async (userId: string): Promise<string> => {
    const user = await dbInstance
        .select('admin', 'superadmin')
        .from('users')
        .where('id', userId)
        .first();

    if (!user) {
        throw new Error('User not found');
    }

    if (user.superadmin) {
        return 'superadmin';
    } else if (user.admin) {
        return 'admin';
    } else {
        return 'regular';
    }
};
 