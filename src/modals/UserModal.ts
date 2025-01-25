import mongoose from "mongoose";

export interface User {
    username: string;
    email:string;
    password:string;
    favorites:mongoose.Types.ObjectId[];
    createdAt:Date;
}

const UserSchema = new mongoose.Schema<User>({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    favorites:[{
        type:mongoose.Types.ObjectId,
        ref:'Song',
    }],
    createdAt:{
        type:Date,
        default:Date.now,
    },
});

export default mongoose.model<User>('User', UserSchema);
