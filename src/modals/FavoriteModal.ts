import mongoose from "mongoose";

export interface Favorites{
    user: mongoose.Schema.Types.ObjectId;
    song: mongoose.Schema.Types.ObjectId;
}

const FavoriteSchema = new mongoose.Schema<Favorites>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
});

export default mongoose.model<Favorites>("Favorite", FavoriteSchema);