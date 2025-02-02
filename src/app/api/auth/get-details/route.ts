import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";
import connectDB from "@/db/connectDB";
import UserModel from "@/modals/UserModal";
import "@/modals/AlbumModal";
import "@/modals/SongModal";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value || "";
  let email = "";

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
    email = decoded.email!;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }

  try {
    await connectDB();

    const user = await UserModel.findOne({ email })
      .populate({
        path: "uploads",
        populate: {
          path: "songs",
        },
      });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User details successfully fetched!", user },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Database error" }, { status: 500 });
  }
}
