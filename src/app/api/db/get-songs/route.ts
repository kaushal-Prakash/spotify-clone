import connectDB from "@/db/connectDB";
import SongModel from "@/modals/SongModal";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request :  NextRequest) {
  await connectDB();

  try {
    // Extract query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1"); // Default to page 1
    const limit = parseInt(url.searchParams.get("limit") || "10"); // Default to 10 items per page

    // Calculate the number of documents to skip
    const skip = (page - 1) * limit;

    // Fetch songs with pagination
    const songs = await SongModel.find()
      .populate("album")
      .skip(skip)
      .limit(limit);

    // Get the total number of songs for pagination metadata
    const totalSongs = await SongModel.countDocuments();

    return NextResponse.json(
      {
        success: true,
        data: songs,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(totalSongs / limit),
          totalSongs,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching songs:", error);
    return NextResponse.json(
      { success: false, message: "Failed to fetch songs" },
      { status: 500 }
    );
  }
}