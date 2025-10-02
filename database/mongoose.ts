// imports required libraries(componets)
import mongoose from 'mongoose';

// processes mongo db uri to get env value
const MONGODB_URI = process.env.MONGODB_URI


// declares global value that doesn't need any import and can be accessed from any part of code
declare global {
    var mongooseCache: {
        conn: typeof mongoose | null;
        promise: Promise<typeof mongoose> | null
    }
}


let cached = global.mongooseCache;

//
if (!cached) {
    cached = global.mongooseCache = {conn: null, promise: null};
}

// creates and exports function that makes connection to database, connection to database is always async operation
export const connectToDatabase = async() => {
    // validates Mongodb_uri before connection
    if (!MONGODB_URI) throw new Error('MONGODB_URI must be set within.env')
    if (cached.conn) return cached.conn;
    // if there is no cached promise
    if (!cached.promise) {
        // creates is
        cached.promise = mongoose.connect(MONGODB_URI, {bufferCommands: false})
    }

    // try catch block to catch errors while processing promise
    try {
        cached.conn = await cached.promise;
    }
    catch (err) {
        cached.promise = null;
        throw err;
    }

    console.log(`Connected to database ${process.env.NODE_ENV} - ${MONGODB_URI}`)

    // returns cached connection
    return cached.conn;
}