"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card/Card";
import { Input } from "@/components/ui/input/Input";
import { Button } from "@/components/ui/button/Button";
import { Label } from "@/components/ui/label/Label";
import Navbar from "@/components/Navbar/Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { IoAddCircleOutline } from "react-icons/io5";
import { useRouter } from "next/navigation";

export default function UploadSong() {
  const router = useRouter();
  const [albumData, setAlbumData] = useState({
    title: "",
    artist: "",
    coverImage: null as File | null,
    songs: [] as {
      genre: string;
      title: string;
      duration: number;
      audioFile: File | null;
      SongCoverImage: File | null;
      artist: string;
    }[],
  });

  // Handles changes for album cover
  const handleAlbumCoverChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    if (files && files.length > 0) {
      setAlbumData((prev) => ({ ...prev, coverImage: files[0] }));
    }
  };

  // Handles changes for individual song files (SongCoverImage & audioFile)
  const handleSongFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setAlbumData((prev) => {
        const updatedSongs = [...prev.songs];
        updatedSongs[index] = { ...updatedSongs[index], [name]: files[0] };
        return { ...prev, songs: updatedSongs };
      });
    }
  };

  // Handles text input changes for album and song details
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAlbumData((prev) => ({ ...prev, [name]: value }));
  };

  // Handles text input changes for songs
  const handleSongChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setAlbumData((prev) => {
      const updatedSongs = [...prev.songs];
      updatedSongs[index] = { ...updatedSongs[index], [name]: value };
      return { ...prev, songs: updatedSongs };
    });
  };

  // Adds a new song input field
  const handleAddSong = () => {
    setAlbumData((prev) => ({
      ...prev,
      songs: [
        ...prev.songs,
        {
          genre: "",
          title: "",
          artist: "",
          audioFile: null,
          SongCoverImage: null,
          duration: 0,
        },
      ],
    }));
  };

  // Handles form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("title", albumData.title);
    formDataToSend.append("artist", albumData.artist);

    if (!albumData.coverImage) {
      toast.error("Please upload an album cover.");
      return;
    }
    formDataToSend.append("coverImage", albumData.coverImage);

    if (albumData.songs.length < 1) {
      toast.error("Please add at least one song.");
      return;
    }

    albumData.songs.forEach((song, index) => {
      if (!song.SongCoverImage || !song.audioFile) {
        toast.error(`Song ${index + 1} is missing cover image or audio file.`);
        return;
      }

      formDataToSend.append(`songs[${index}][title]`, song.title);
      formDataToSend.append(`songs[${index}][artist]`, song.artist);
      formDataToSend.append(`songs[${index}][genre]`, song.genre);
      formDataToSend.append(`songs[${index}][duration]`, song.duration.toString());
      formDataToSend.append(`songs[${index}][SongCoverImage]`, song.SongCoverImage);
      formDataToSend.append(`songs[${index}][audioFile]`, song.audioFile);
    });

    try {
      const response = await axios.post("/api/cloud/song-upload", formDataToSend);
      toast.success("Upload successful!");
      console.log("Upload Success:", response.data);
      router.push("/home");
    } catch (error) {
      toast.error("Upload failed. Please try again.");
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="bg-spotify-black">
      <Navbar />
      <div className="flex justify-center items-center min-h-screen">
        <Card className="w-full max-w-xl shadow-lg mb-10 mt-14">
          <CardContent className="p-6 space-y-6">
            <h1 className="text-2xl text-spotify-green font-bold text-center">
              Create an album
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Album Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Enter album title"
                  value={albumData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="artist">Artist</Label>
                <Input
                  id="artist"
                  name="artist"
                  placeholder="Enter artist name"
                  value={albumData.artist}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="coverImage">Album Cover</Label>
                <Input
                  placeholder="album cover image"
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={handleAlbumCoverChange}
                  required
                />
              </div>
              {albumData.songs.map((song, index) => (
                <div key={index}>
                  <h2 className="font-bold text-spotify-dark-gray bg-spotify-light-gray p-2 rounded-lg text-center m-3">
                    Song {index + 1}
                  </h2>
                  <Label htmlFor={`title-${index}`}>Title</Label>
                  <Input
                    id={`title-${index}`}
                    name="title"
                    placeholder="Enter song title"
                    value={song.title}
                    onChange={(e) => handleSongChange(e, index)}
                    required
                  />
                  <Label htmlFor={`artist-${index}`}>Artist</Label>
                  <Input
                    id={`artist-${index}`}
                    name="artist"
                    placeholder="Enter artist name"
                    value={song.artist}
                    onChange={(e) => handleSongChange(e, index)}
                    required
                  />
                  <Label htmlFor={`genre-${index}`}>Genre</Label>
                  <Input
                    id={`genre-${index}`}
                    name="genre"
                    placeholder="Enter genre"
                    value={song.genre}
                    onChange={(e) => handleSongChange(e, index)}
                    required
                  />
                  <Label htmlFor={`SongCoverImage-${index}`}>Song Cover Image</Label>
                  <Input
                    placeholder="song cover mage"
                    id={`SongCoverImage-${index}`}
                    name="SongCoverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleSongFileChange(e, index)}
                    required
                  />
                  <Label htmlFor={`audioFile-${index}`}>Audio File</Label>
                  <Input
                    placeholder="song audio image"
                    id={`audioFile-${index}`}
                    name="audioFile"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleSongFileChange(e, index)}
                    required
                  />
                </div>
              ))}
              <div className="flex flex-col md:flex-row items-center justify-center gap-3 ">
              <Button type="button" onClick={handleAddSong} className="flex gap-1 justify-center items-center">
              <IoAddCircleOutline /> Add Song
              </Button>
              <Button type="submit">Upload Album</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
