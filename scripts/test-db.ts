// imports required modules(components)
import { connectToDatabase } from "../database/mongoose";

// creates async main function that connects to database
async function main() {
    try {
        await connectToDatabase();
        // If connectToDatabase resolves without throwing, connection is OK
        console.log("OK: Database connection succeeded");
        process.exit(0);
    } catch (err) {
        console.error("ERROR: Database connection failed");
        console.error(err);
        process.exit(1);
    }
}

main();