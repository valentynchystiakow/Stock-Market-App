// marks file as server component
'use server';

// imports required modules and components
import {connectToDatabase} from "@/database/mongoose";

// creates and exports async function getAllUsersForNewsEmail that fetches all users for news email
export const getAllUsersForNewsEmail = async () => {
    // try catch block to handle errors while fetching users for news email
    try {
        const mongoose = await connectToDatabase();
        const db = mongoose.connection.db;
        if(!db) throw new Error('Mongoose connection not connected');

        // fetches all users from database that have email and name
        const users = await db.collection('user').find(
            { email: { $exists: true, $ne: null }},
            { projection: { _id: 1, id: 1, email: 1, name: 1, country:1 }}
        ).toArray();

        return users.filter((user) => user.email && user.name).map((user) => ({
            id: user.id || user._id?.toString() || '',
            email: user.email,
            name: user.name
        }))
    } catch (e) {
        console.error('Error fetching users for news email:', e)
        return []
    }
}