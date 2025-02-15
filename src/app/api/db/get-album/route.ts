import connectDB from "@/db/connectDB";
import AlbumModel from "@/modals/AlbumModal";
import { NextRequest, NextResponse } from "next/server";
import "@/modals/AlbumModal";
import "@/modals/SongModal";


export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const body = await req.json();

    const albumId = body.albumId?.id; 

    if (!albumId) {
      return NextResponse.json(
        { success: false, message: "Album ID is required" },
        { status: 400 }
      );
    }

    const album = await AlbumModel.findById(albumId).populate("songs");

    // If no album is found, return a 404 error
    if (!album) {
      return NextResponse.json(
        { success: false, message: "Album not found" },
        { status: 404 }
      );
    }

    // Return the album data
    return NextResponse.json({ success: true, data: album }, { status: 200 });
  } catch (error) {
    console.error("Error fetching album:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch album" },
      { status: 500 }
    );
  }
}
