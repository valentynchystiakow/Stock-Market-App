// marks file as server component
'use server';

// imports required modules and components
import { connectToDatabase } from '@/database/mongoose';
import { Watchlist } from '@/database/models/watchlist.model';

// creates and exports async function getWatchlistSymbolsByEmail
export async function getWatchlistSymbolsByEmail(email: string): Promise<string[]> {
    //  if email is not provided returns empty array
    if (!email) return [];

    // try catch block to handle errors while fetching watchlist symbols from database
    try {
        // creates connection to database
        const mongoose = await connectToDatabase();
        // throws error if connection to database is not found
        const db = mongoose.connection.db;
        if (!db) throw new Error('MongoDB connection not found');

        // Better Auth stores users in the "user" collection
        const user = await db.collection('user').findOne<{ _id?: unknown; id?: string; email?: string }>({ email });

        // if user is not found returns empty array
        if (!user) return [];

        // gets user id from user object
        const userId = (user.id as string) || String(user._id || '');

        // if user id is not found returns empty array
        if (!userId) return [];

        // gets watchlist symbols from database
        const items = await Watchlist.find({ userId }, { symbol: 1 }).lean();
        return items.map((i) => String(i.symbol));
    }
    // catches error and logs it
    catch (err) {
        console.error('getWatchlistSymbolsByEmail error:', err);
        return [];
    }
}