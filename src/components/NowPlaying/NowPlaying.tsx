"use client";

import { useAppStore } from "@/store/store";
import Image from "next/image";

export default function NowPlaying() {
  const { currentSong } = useAppStore();

  // Ensure createdAt is a Date object
  const uploadedAt = currentSong ? new Date(currentSong.createdAt).toDateString() : null;

  return (
    <div className="p-4 bg-spotify-dark-gray h-full flex flex-col items-center justify-center">
      {currentSong ? (
        <>
          <Image 
            src={currentSong.coverImage} 
            alt={currentSong.title} 
            width={128} 
            height={128} 
            className="rounded-lg mb-4" 
          />
          <h3 className="text-lg font-semibold">{currentSong.title}</h3>
          <div className="flex flex-col gap-2 items-start mt-2">
          <p className="text-sm text-gray-400"><strong>Artist :</strong> {currentSong.artist}</p>
          <p className="text-sm text-gray-400"><strong>Genre :</strong> {currentSong.genre}</p>
          <p className="text-sm text-gray-400"><strong>Uploaded At :</strong> {uploadedAt}</p>
          </div>
        </>
      ) : (
        <p className="text-gray-400">No song playing</p>
      )}
    </div>
  );
}