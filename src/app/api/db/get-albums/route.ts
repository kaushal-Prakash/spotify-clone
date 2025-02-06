import connectDB from "@/db/connectDB";
import AlbumModel from "@/modals/AlbumModal";
import { NextResponse } from "next/server";

export async function GET() {
  await connectDB();

  try {
    const albums = await AlbumModel.find().populate("songs");
    return NextResponse.json({ success: true, data: albums }, { status: 200 });
  } catch (error) {
    console.error("Error fetching albums:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch albums" },
      { status: 500 }
    );
  }
}
