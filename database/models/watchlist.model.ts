// imports required modules and components
import { Schema, model, models, type Document, type Model } from 'mongoose';

// creates and exports watchlist item interface for watchlist item
export interface WatchlistItem extends Document {
    // interface properties
    userId: string;
    symbol: string;
    company: string;
    addedAt: Date;
}

// creates instance of watchlist schema with required properties
const WatchlistSchema = new Schema<WatchlistItem>(
    {
        // schema properties
        userId: { type: String, required: true, index: true },
        symbol: { type: String, required: true, uppercase: true, trim: true },
        company: { type: String, required: true, trim: true },
        addedAt: { type: Date, default: Date.now },
    },
    { timestamps: false }
);

// Prevent duplicate symbols per user
WatchlistSchema.index({ userId: 1, symbol: 1 }, { unique: true });

// exports watchlist model
export const Watchlist: Model<WatchlistItem> =
    (models?.Watchlist as Model<WatchlistItem>) || model<WatchlistItem>('Watchlist', WatchlistSchema);