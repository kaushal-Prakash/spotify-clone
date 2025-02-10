"use client";
import Navbar from "@/components/Navbar/Navbar";
import SongCard from "@/components/SongCard/SongCard";
import { useAppStore } from "@/store/store";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { SongCardLoading } from "../loading";

function Library() {
  const songs = useAppStore((store) => store.songs);
  const setSongs = useAppStore((store) => store.setSongs);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/db/get-songs");
        if (res.status !== 200) {
          toast.error("Failed to fetch song data");
          return;
        }
        setSongs(res.data.data);
      } catch (err) {
        console.error("Error fetching songs:", err);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };
    fetchData();
  }, [setSongs]);

  return (
    <div className="w-full min-h-screen bg-spotify-dark-gray text-spotify-white">
      <Navbar />
      <div className="px-8 py-5">
        <h1 className="text-3xl mt-16 font-bold mb-6 text-spotify-green">All Songs</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {isLoading ? ( // Show loading skeleton if data is being fetched
            Array.from({ length: 5 }).map((_, index) => (
              <SongCardLoading key={index} />
            ))
          ) : songs.length > 0 ? ( // Show the songs if available
            songs.map((song) => (
              <div key={song._id} className="w-full">
                <SongCard
                id={song._id}
                  title={song.title}
                  artist={song.artist}
                  genre={song.genre}
                  duration={song.duration}
                  coverImage={song.coverImage}
                  audio={song.audio}
                  createdAt={song.createdAt}
                />
              </div>
            ))
          ) : ( // Show message if no songs are available
            <p className="text-center text-spotify-light-gray col-span-full">
              No songs available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Library;