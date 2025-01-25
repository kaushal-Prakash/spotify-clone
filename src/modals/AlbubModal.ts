import mongoose from "mongoose";

export interface Album extends Document{
    title: string;
    artist: string;
    coverImage:string;
    songs: mongoose.Types.ObjectId[];
    releaseDate:Date;
}

const AlbumSchema = new mongoose.Schema<Album>({
    title:{
        type:String,
        required:true,
    },
    artist:{
        type:String,
        required:true,
    },
    coverImage:{
        type:String,
        required:true,
    },
    songs:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Song',
    }],
    releaseDate:{
        type:Date,
        required:true,
    },
});

const AlbumModel = mongoose.models.Album || mongoose.model<Album>('Album',AlbumSchema);

export default AlbumModel;