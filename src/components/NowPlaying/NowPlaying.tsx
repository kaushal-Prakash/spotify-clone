"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FaPause, FaPlay } from "react-icons/fa";
import { BiShuffle } from "react-icons/bi";
import { BsRepeat, BsSkipStartFill, BsSkipEndFill } from "react-icons/bs";
import { Song } from "@/modals/SongModal";

interface NowPlayingProps {
  song: Song | null; // Allow the possibility of no song selected
}

export default function NowPlaying({ song }: NowPlayingProps) {
  // State to manage playback status (play/pause)
  const [isPlaying, setIsPlaying] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);

  // Dummy song progress for illustration
  const progress = 120; // Current progress in seconds
  const duration = 166; // Total song duration in seconds

  // Handler to toggle play/pause
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  // Handler to toggle shuffle
  const handleShuffle = () => {
    setIsShuffle(!isShuffle);
  };

  // Handler to toggle repeat
  const handleRepeat = () => {
    setIsRepeat(!isRepeat);
  };

  if (!song) {
    return <div className="text-center text-gray-400">Select a song to play</div>;
  }

  return (
    <div className="bg-black text-white p-4 w-full md:w-1/4 flex flex-col justify-between">
      {/* Song Details */}
      <div className="flex items-center space-x-4">
        <Image
          src={"/song-cover.jpg"}
          width={60}
          height={60}
          alt="Song Cover"
          className="rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold">{song.title}</h3>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <BiShuffle
          size={20}
          className={`cursor-pointer hover:text-white ${isShuffle ? "text-green-500" : "text-gray-400"}`}
          onClick={handleShuffle}
        />
        <BsSkipStartFill size={24} className="cursor-pointer hover:text-white" />
        <button
          className="bg-white text-black p-2 rounded-full"
          onClick={handlePlayPause}
        >
          {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
        </button>
        <BsSkipEndFill size={24} className="cursor-pointer hover:text-white" />
        <BsRepeat
          size={20}
          className={`cursor-pointer hover:text-white ${isRepeat ? "text-green-500" : "text-gray-400"}`}
          onClick={handleRepeat}
        />
      </div>

      {/* Progress Bar */}
      <div className="flex items-center space-x-2 text-gray-400 text-sm mt-4">
        <span>{`${Math.floor(progress / 60)}:${(progress % 60).toString().padStart(2, "0")}`}</span>
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-green-500"
            style={{ width: `${(progress / duration) * 100}%` }}
          ></div>
        </div>
        <span>{`${Math.floor(duration / 60)}:${(duration % 60).toString().padStart(2, "0")}`}</span>
      </div>
    </div>
  );
}
