import { NextRequest, NextResponse } from "next/server";
import cloudinary from "@/utils/cloudinary";
import connectDB from "@/db/connectDB";
import SongModel from "@/modals/SongModal";
import AlbumModel from "@/modals/AlbumModal";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "@/modals/UserModal";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const data = await req.formData();
    const title = data.get("title") as string;
    const artist = data.get("artist") as string;

    if (!title || !artist) {
      return NextResponse.json(
        { message: "Missing album details" },
        { status: 400 }
      );
    }

    // ** Upload Album Cover **
    const albumCoverFile = data.get("coverImage") as File | null;
    if (!albumCoverFile) {
      return NextResponse.json(
        { message: "Missing album cover" },
        { status: 400 }
      );
    }

    const albumCoverBuffer = Buffer.from(await albumCoverFile.arrayBuffer());
    const albumCoverBase64 = `data:${
      albumCoverFile.type
    };base64,${albumCoverBuffer.toString("base64")}`;

    const albumCoverUpload = await cloudinary.uploader.upload(
      albumCoverBase64,
      {
        folder: "spotify-album-covers",
        public_id: `albums/${title.replace(/\s+/g, "_")}`,
        overwrite: true,
      }
    );

    console.log("✅ Album Cover Uploaded:", albumCoverUpload.secure_url);

    // ** Upload Songs & Save to DB **
    const songIds: string[] = [];
    let index = 0;

    while (data.has(`songs[${index}][title]`)) {
      const songTitle = data.get(`songs[${index}][title]`) as string;
      const songArtist = data.get(`songs[${index}][artist]`) as string;
      const songGenre = data.get(`songs[${index}][genre]`) as string;
      const songDuration = parseInt(
        data.get(`songs[${index}][duration]`) as string,
        10
      );

      // ✅ Ensure songCoverFile exists
      const songCoverFile = data.get(
        `songs[${index}][SongCoverImage]`
      ) as File | null;
      if (!songCoverFile) {
        console.warn(`Skipping Song ${index + 1}: Missing cover image.`);
        index++;
        continue;
      }

      const songCoverBuffer = Buffer.from(await songCoverFile.arrayBuffer());
      const songCoverBase64 = `data:${
        songCoverFile.type
      };base64,${songCoverBuffer.toString("base64")}`;

      const songCoverUpload = await cloudinary.uploader.upload(
        songCoverBase64,
        {
          folder: "songs/covers",
          public_id: `songs/covers/${songTitle.replace(/\s+/g, "_")}`, //to replace space with underscores
          overwrite: true,
        }
      );

      // console.log(`✅ Song Cover Uploaded: ${songCoverUpload.secure_url}`);

      // ✅ Ensure songAudioFile exists
      const songAudioFile = data.get(
        `songs[${index}][audioFile]`
      ) as File | null;
      if (!songAudioFile) {
        console.warn(`Skipping Song ${index + 1}: Missing audio file.`);
        index++;
        continue;
      }

      const songAudioBuffer = Buffer.from(await songAudioFile.arrayBuffer());
      const songAudioBase64 = `data:${
        songAudioFile.type
      };base64,${songAudioBuffer.toString("base64")}`;

      const songAudioUpload = await cloudinary.uploader.upload(
        songAudioBase64,
        {
          folder: "songs/audio",
          public_id: `songs/audio/${songTitle.replace(/\s+/g, "_")}`,
          resource_type: "auto",
          overwrite: true,
        }
      );

      console.log(`✅ Song Audio Uploaded: ${songAudioUpload.secure_url}`);

      // ✅ Create & Save Song in DB
      const song = await SongModel.create({
        title: songTitle,
        artist: songArtist,
        genre: songGenre,
        duration: songDuration,
        coverImage: songCoverUpload.secure_url,
        audio: songAudioUpload.secure_url,
        album: null, // Will be updated after album creation
      });

      // console.log("✅ Song Created:", song);
      songIds.push(song._id.toString());
      index++;
    }

    if (songIds.length === 0) {
      return NextResponse.json(
        { message: "No valid songs uploaded" },
        { status: 400 }
      );
    }

    // console.log("✅ Songs to be linked with album:", songIds);

    // ** Create & Save Album in DB **
    const album = await AlbumModel.create({
      title,
      artist,
      coverImage: albumCoverUpload.secure_url,
      songs: songIds,
      releaseDate: new Date(),
    });

    // console.log("✅ Album Created:", album);

    // ** Update Songs with Album Reference **
    await SongModel.updateMany({ _id: { $in: songIds } }, { album: album._id });
    console.log("✅ Songs Updated with Album ID");

    const token = req.cookies.get("token")?.value || "";
    let email = "";

    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;
      email = decoded.email!;
    } catch (error) {
      console.log(error);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    user.uploads.push(album._id);
    await user.save();

    console.log("✅ User uploads updated:");

    return NextResponse.json(
      { message: "Upload successful!", album },
      { status: 200 }
    );
  } catch (error) {
    console.error("❌ Upload Error:", error);
    return NextResponse.json({ message: "Upload failed" }, { status: 500 });
  }
}
