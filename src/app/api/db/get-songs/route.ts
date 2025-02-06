import connectDB from "@/db/connectDB";
import SongModel from "@/modals/SongModal";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const songs = await SongModel.find().populate("album");
    return NextResponse.json({ success: true, data: songs }, { status: 200 });
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}
