import Image from "next/image";
import React from "react";

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
  // Convert duration from seconds to minutes:seconds format
  const formatDuration = (duration: number) => {
    const minutes = Math.floor(duration / 60);
    const seconds = duration % 60;
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <div className="bg-spotify-dark-gray min-w-72 p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="relative h-40 max-w-72 mb-4">
        <Image
          src={coverImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-spotify-white text-xl font-bold mb-1">{title}</h3>
      <p className="text-spotify-light-gray text-sm mb-2">by {artist}</p>
      <p className="text-spotify-medium-gray text-xs">Genre: {genre}</p>
      <p className="text-spotify-medium-gray text-xs">
        Duration: {formatDuration(duration)}
      </p>
      <button className="mt-4 w-full py-2 bg-spotify-green text-spotify-white rounded-full hover:bg-spotify-orange transition-all hover:text-spotify-medium-gray font-bold duration-300">
        Play Song
      </button>
    </div>
  );
};

export default SongCard