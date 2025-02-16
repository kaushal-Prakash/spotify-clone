"use client";
import { useAppStore, UserStore } from "@/store/store";
import axios from "axios";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa";
import { MdOutlinePlayCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import { useShallow } from "zustand/shallow";

interface SongCardProps {
  id: string;
  title: string;
  artist: string;
  genre: string;
  duration: number;
  coverImage: string;
  audio: string;
  createdAt: Date;
}

const SongCard: React.FC<SongCardProps> = ({
  id,
  title,
  artist,
  coverImage,
  duration,
  createdAt,
  genre,
  audio
}) => {
  // Fetch favorites from the store
  const favSongs = UserStore(useShallow((state) => state.userData.favorites || [])); 
  const updateFavorites = UserStore((state) => state.setUserFavorites);

  // Check if the current song is a favorite
  const [isFavorite, setIsFavorite] = useState(
    favSongs.some((song) => song._id === id)
  );

  // Update isFavorite state when favSongs changes
  useEffect(() => {
    setIsFavorite(favSongs.some((song) => song._id === id));
  }, [favSongs, id]);

  // Format song duration
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  // Handle adding/removing from favorites
  const handleFavorite = async () => {
    try {
      const res = await axios.post("/api/auth/favorites", { id });

      if (res.status === 200) {
        toast.success("Added to favorites!");

        // Update local state
        setIsFavorite(true);

        // Update global store
        updateFavorites(id);
      } else {
        toast.error(`${res.data.message}`);
      }
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
  };

  //handle song click
  const setCurrentSong = useAppStore((state) => state.setCurrentSong);
  const handleSongClick = () => {
    setCurrentSong({
      _id: id,
      title,
      artist,
      genre,
      duration,
      coverImage,
      audio,
      createdAt,
    });
  };

  return (
    <div className="bg-spotify-dark-gray border-2 border-spotify-green min-w-40 max-w-72 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 relative group">
      {/* Cover Image */}
      <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg group-hover:scale-105 transition-transform duration-300"
        />
        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-spotify-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button className="p-3 bg-spotify-green rounded-full text-spotify-white hover:bg-spotify-dark-green transition-all duration-300"
          onClick={handleSongClick}>
            <MdOutlinePlayCircleOutline size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Song Details */}
      <div className="flex flex-col space-y-2" onClick={handleSongClick}>
        <h3 className="text-spotify-white text-lg font-bold truncate">{title}</h3>
        <p className="text-spotify-light-gray text-sm truncate">by {artist}</p>
        <div className="flex justify-between items-center">
          <p className="text-spotify-medium-gray font-semibold text-xs">Genre: {genre}</p>
          <p className="text-spotify-medium-gray text-xs">
            {formatDuration(duration)}
          </p>
        </div>
      </div>

      {/* Favorite Button */}
      <button
        className="absolute top-4 right-4 text-xl text-spotify-light-gray hover:text-spotify-red transition-all duration-300"
        onClick={handleFavorite}
      >
        <FaHeart
          className={isFavorite ? "text-spotify-red animate-pulse" : "text-spotify-light-gray"}
        />
      </button>
    </div>
  );
};

export default SongCard;