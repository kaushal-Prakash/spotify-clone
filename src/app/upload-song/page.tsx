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

export default function UploadSong() {
  const [albumData, setAlbumData] = useState({
    title: "",
    artist: "",
    album: "",
    coverImage: null as File | null,
    songs: [] as {
      genre: string;
      title: string;
      duration: number;
      audioFile: File | null;
      coverImage: File | null;
      artist: string;
    }[],
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setAlbumData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index?: number
  ) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      if (name === "coverImage") {
        setAlbumData((prev) => ({ ...prev, coverImage: files[0] }));
      } else if (index !== undefined) {
        setAlbumData((prev) => {
          const updatedSongs = [...prev.songs];
          updatedSongs[index] = { ...updatedSongs[index], audioFile: files[0] };
          return { ...prev, songs: updatedSongs };
        });
      }
    }
  };

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

  const handleAddSong = () => {
    setAlbumData((prev) => ({
      ...prev,
      songs: [
        ...prev.songs,
        {
          genre: "",
          description: "",
          title: "",
          artist: "",
          audioFile: null,
          coverImage: null,
          duration: 0,
        },
      ],
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("title", albumData.title);
    formDataToSend.append("artist", albumData.artist);
    formDataToSend.append("album", albumData.album);
    if (albumData.coverImage) {
      formDataToSend.append("coverImage", albumData.coverImage);
    }

    if(albumData.songs.length < 1){
      toast.info("Add songs first");
      return;
    }
    albumData.songs.forEach((song, index) => {
      formDataToSend.append(`songs[${index}][genre]`, song.genre);
      formDataToSend.append(`songs[${index}][title]`, song.title);
      formDataToSend.append(`songs[${index}][artist]`, song.artist);
      formDataToSend.append(
        `songs[${index}][duration]`,
        song.duration.toString()
      );
      if (song.audioFile) {
        formDataToSend.append(`songs[${index}][audioFile]`, song.audioFile);
      }
      if (song.coverImage) {
        formDataToSend.append(`songs[${index}][coverImage]`, song.coverImage);
      }
    });

    // console.log("FormData Entries:");
    // for (const [key, value] of formDataToSend.entries()) {
    //   console.log(key, value);
    // }

    try {
      const response = await axios.post("/api/auth/song-upload", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Upload successful!");
      console.log("Upload Success:", response.data);
    } catch (error) {
      toast.error("Upload failed. Please try again.");
      console.error("Upload Error:", error);
    }
  };

  return (
    <div className="bg-spotify-black">
      <Navbar />
      <div className="flex justify-center items-center mt-10 min-h-screen">
        <Card className="w-full max-w-xl shadow-lg mb-10">
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
                <Label htmlFor="album">Album</Label>
                <Input
                  id="album"
                  name="album"
                  placeholder="Enter album name"
                  value={albumData.album}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="coverImage">Cover Image</Label>
                <Input
                  placeholder="cover image"
                  id="coverImage"
                  name="coverImage"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
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
                  <Label htmlFor={`duration-${index}`}>Duration</Label>
                  <Input
                    id={`duration-${index}`}
                    name="duration"
                    placeholder="duration in seconds"
                    type="number"
                    value={song.duration.toString()}
                    onChange={(e) => handleSongChange(e, index)}
                    required
                  />

                  <Label htmlFor={`coverImage-${index}`}>Cover Image</Label>
                  <Input
                    id={`coverImage-${index}`}
                    placeholder="cover image"
                    name="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, index)}
                    required
                  />
                  <Label htmlFor={`audioFile-${index}`}>Audio File</Label>
                  <Input
                    id={`audioFile-${index}`}
                    placeholder="audio file"
                    name="audioFile"
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileChange(e, index)}
                    required
                  />
                </div>
              ))}
              <Button
                type="button"
                onClick={handleAddSong}
                className="w-full flex items-center justify-center gap-2"
              >
                <IoAddCircleOutline /> Add Song
              </Button>
              <Button type="submit" className="w-full">
                Upload Album
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
