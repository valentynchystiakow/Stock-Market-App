// imports required components(modules)
import {serve} from "inngest/next";
import {inngest} from "@/lib/inngest/client";
import {sendDailyNewsSummary, sendSignUpEmail} from "@/lib/inngest/functions";


// creates and exports API routes for Inngest
export const { GET, POST, PUT } = serve({
    client: inngest,
    // inngest functions
    functions: [sendSignUpEmail, sendDailyNewsSummary],
})