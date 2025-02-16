import connectDB from "@/db/connectDB";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/modals/UserModal";
import mongoose from "mongoose";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const token = req.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Not authenticated!" }, { status: 401 });
    }

    const body = await req.json();
    const songId = body.id;

    if (!songId) {
      return NextResponse.json({ message: "Song ID is required!" }, { status: 400 });
    }

    // Validate songId
    if (!mongoose.Types.ObjectId.isValid(songId)) {
      return NextResponse.json({ message: "Invalid Song ID!" }, { status: 400 });
    }

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as {
      email: string;
      userId: string; // This corresponds to the user's _id in MongoDB
    };
    console.log(decodedToken);

    const user = await UserModel.findById(decodedToken.userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.favorites = user.favorites || [];

    const songIndex = user.favorites.indexOf(songId);

    if (songIndex === -1) {
      // Song is not in favorites, so add it
      user.favorites.push(songId);
    } else {
      // Song is already in favorites, so remove it
      user.favorites.splice(songIndex, 1);
    }


    await user.save();

    return NextResponse.json(
      { message: songIndex === -1 ? "Added to favorites!" : "Removed from favorites!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating favorites:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token!" }, { status: 401 });
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}