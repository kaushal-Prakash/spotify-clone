import mongoose, { Document, Schema } from "mongoose";

// User Interface
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    favorites: mongoose.Types.ObjectId[];
    createdAt: Date;
}

// User Schema
const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    favorites: [{
        type: mongoose.Types.ObjectId,
        ref: 'Song',
    }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UserModel = mongoose.models.User || mongoose.model<User>('User', UserSchema);

export default UserModel;
