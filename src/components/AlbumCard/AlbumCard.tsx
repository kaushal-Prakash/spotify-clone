import Image from "next/image";
import React from "react";
import { MdOutlinePlayCircleOutline } from "react-icons/md";

interface AlbumCardProps {
  title: string;
  artist: string;
  coverImage: string;
  songs: number;
  releaseDate: Date;
}

const AlbumCard: React.FC<AlbumCardProps> = ({
  title,
  artist,
  coverImage,
  songs,
  releaseDate,
}) => {
  // Format release date
  const formattedReleaseDate = new Date(releaseDate).toLocaleDateString();

  return (
    <div className="relative bg-spotify-dark-gray p-4 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 w-64 cursor-pointer group">
      {/* Album Cover with Overlay */}
      <div className="relative w-full h-60 rounded-xl overflow-hidden">
        <Image
          src={coverImage}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="rounded-xl group-hover:scale-105 transition-transform duration-300"
        />
        {/* Overlay for Hover Effect */}
        <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button className="bg-spotify-green p-3 rounded-full hover:scale-110 transition-all">
            <MdOutlinePlayCircleOutline size={24} className="text-white" />
          </button>
        </div>
      </div>

      {/* Album Details */}
      <div className="mt-4 text-center">
        <h3 className="text-spotify-white text-lg font-bold truncate">{title}</h3>
        <p className="text-spotify-light-gray text-sm">by {artist}</p>
        <p className="text-spotify-medium-gray text-xs mt-1">
          Released: {formattedReleaseDate}
        </p>
        <p className="text-spotify-medium-gray text-xs">{songs} songs</p>

        {/* Action Button */}
        <button className="mt-4 w-full py-2 bg-spotify-purple text-white rounded-full font-bold hover:bg-spotify-pink transition-colors duration-300">
          View Album
        </button>
      </div>
    </div>
  );
};

export default AlbumCard;
