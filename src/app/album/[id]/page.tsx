"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import SongCard from "@/components/SongCard/SongCard";
import { Song } from "@/store/store";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import Navbar from "@/components/Navbar/Navbar";
import { SongCardLoading } from "@/app/loading";

const Page = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const albumId = useParams();
  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const response = await axios.post(`/api/db/get-album`, { albumId });
        setSongs(response.data.data.songs);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : "Failed to fetch album details.";
        setError(errorMessage);
        console.error("Error fetching album:", err);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchAlbum();
  }, [albumId]);

  return (
    <div className="bg-spotify-black min-h-screen text-spotify-white">
      <Navbar />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-6 pt-14">Album Songs</h1>

        { loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array.from({ length: 5 }).map((_, index) => (
            <SongCardLoading key={index} />
            ))}
          </div>
        
        ) : error ? (
          <p className="text-spotify-red">{error}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {songs.map((song) => (
              <SongCard
                key={song._id}
                id={song._id}
                title={song.title}
                artist={song.artist}
                duration={song.duration}
                genre={song.genre}
                coverImage={song.coverImage}
                createdAt={song.createdAt}
                audio={song.audio}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Page;
