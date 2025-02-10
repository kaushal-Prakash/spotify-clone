"use client";

import Image from "next/image";
import { useAppStore } from "@/store/store";
import { FaPlay } from "react-icons/fa";

export default function PlayListView() {
  const { songs, setCurrentSong } = useAppStore();

  return (
    <div className="p-6">
      <h2 className="text-2xl pt-14 font-bold mb-4">All Songs</h2>
      {songs.length > 0 ? (
        <ul className="space-y-3">
          {songs.map((song) => (
            <li
              key={song._id}
              className="flex justify-between items-center p-3 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer"
              onClick={() => setCurrentSong(song)}
            >
              <div className="flex items-center">
                {/* Next.js Image Component */}
                <Image
                  src={song.coverImage}
                  alt={song.title}
                  width={48} // 12x12 in Tailwind
                  height={48}
                  className="rounded mr-4"
                  priority={false} // Lazy loads by default
                />
                <div>
                  <p className="text-sm font-medium">{song.title}</p>
                  <p className="text-xs text-gray-400">{song.artist}</p>
                </div>
              </div>
              <button className="text-green-500 text-lg hover:scale105 hover:text-spotify-white transition-all duration-300">
                <FaPlay />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No songs available</p>
      )}
    </div>
  );
}
