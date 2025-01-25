import mongoose, { Schema } from "mongoose";

export interface Playlist extends Document {
  name: string;
  user: mongoose.Schema.Types.ObjectId; // Owner of the playlist
  songs: mongoose.Schema.Types.ObjectId[]; // List of songs
  createdAt: Date;
}

const PlaylistSchema = new Schema<Playlist>({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  songs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Song" }],
  createdAt: { type: Date, default: Date.now },
});

const PlaylistModel = mongoose.models.Playlist || mongoose.model<Playlist>("Playlist", PlaylistSchema);

export default PlaylistModel;
