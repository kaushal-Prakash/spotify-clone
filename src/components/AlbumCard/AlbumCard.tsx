import Image from "next/image";
import React from "react";

interface AlbumCardProps {
  title: string;
  artist: string;
  coverImage: string;
  songs:number;
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
    <div className="bg-spotify-dark-gray p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 min-w-72">
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
      <p className="text-spotify-medium-gray text-xs">
        Released on {formattedReleaseDate}
      </p>
      <p className="text-spotify-medium-gray text-xs">
        {songs} songs
      </p>
      <button className="mt-4 w-full py-2 bg-spotify-purple text-spotify-white rounded-full hover:bg-spotify-pink hover:text-spotify-dark-gray font-bold transition-colors duration-300">
        View Album
      </button>
    </div>
  );
};

export default AlbumCard;
