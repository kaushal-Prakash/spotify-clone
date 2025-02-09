import Image from "next/image";
import React, { useState } from "react";
import { FaHeart, FaPlay } from "react-icons/fa";

interface SongCardProps {
  title: string;
  artist: string;
  genre: string;
  duration: number;
  coverImage: string;
  audio: string;
  createdAt: Date;
}

const SongCard: React.FC<SongCardProps> = ({
  title,
  artist,
  coverImage,
  duration,
  genre,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const handleFavorite = async () => {
    try {
      const response = await fetch("/api/auth/add-to-fav", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title, artist }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else {
        console.error("Failed to add to favorites");
      }
    } catch (error) {
      console.error("Error adding to favorites", error);
    }
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
          <button className="p-3 bg-spotify-green rounded-full text-spotify-white hover:bg-spotify-dark-green transition-all duration-300">
            <FaPlay className="text-lg" />
          </button>
        </div>
      </div>

      {/* Song Details */}
      <div className="flex flex-col space-y-2">
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
          className={
            isFavorite
              ? "text-spotify-red animate-pulse"
              : "text-spotify-light-gray"
          }
        />
      </button>
    </div>
  );
};

export default SongCard;