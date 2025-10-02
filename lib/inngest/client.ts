// imports required modules(components)
import { Inngest} from "inngest";

// creates instance of Inngest
export const inngest = new Inngest({
    id: 'signalist',
    ai: { gemini: { apiKey: process.env.GEMINI_API_KEY! }}
})


