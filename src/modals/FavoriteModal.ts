import mongoose from "mongoose";

export interface Favorites extends Document{
    user: mongoose.Schema.Types.ObjectId;
    song: mongoose.Schema.Types.ObjectId;
}

const FavoriteSchema = new mongoose.Schema<Favorites>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song", required: true },
});

const FavoriteModel = mongoose.models.Favorite || mongoose.model<Favorites>("Favorite", FavoriteSchema);

export default FavoriteModel;