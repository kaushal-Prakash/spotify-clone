import connectDB from "@/db/connectDB";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import UserModel from "@/modals/UserModal";

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

    const decodedToken = jwt.verify(token, process.env.SECRET_KEY as string) as {
      email: string;
      username: string;
    };

    const username = decodedToken.username;

    const user = await UserModel.findOne({ username });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.favorites = user.favorites || [];

    if (!user.favorites.includes(songId)) {
      user.favorites.push(songId);
      await user.save();
      return NextResponse.json({ message: "Added to favorites!" }, { status: 200 });
    } else {
      return NextResponse.json({ message: "Song is already in favorites!" }, { status: 409 });
    }
  } catch (error) {
    console.error("Error adding to favorites:", error);

    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token!" }, { status: 401 });
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
