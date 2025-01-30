import mongoose from "mongoose";

export interface Song extends Document{
    title : string;
    artist : string;
    album : mongoose.Types.ObjectId;
    genre : string;
    duration : number;
    coverImage : string;
    audio:string;
    createdAt: Date;
}

const Songschema = new mongoose.Schema<Song>({
    title:{type:String,required:true},
    artist:{type:String,required:true},
    album:{type:mongoose.Schema.Types.ObjectId,ref:'Album'},
    genre:{type:String,required:true},
    duration:{type:Number,required:true},
    coverImage:{type:String,required:true},
    audio:{type:String,required:true},
    createdAt:{type:Date,default:Date.now},
});

const SongModel = mongoose.models.Song || mongoose.model<Song>('Song',Songschema);

export default SongModel;