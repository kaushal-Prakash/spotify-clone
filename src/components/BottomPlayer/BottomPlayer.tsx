// components/BottomPlayer.js

import React from 'react';
import Image from 'next/image';
import { IoPlaySkipForward,IoPlaySkipBack  } from "react-icons/io5";
import { FaPlay  } from 'react-icons/fa';

const BottomPlayer = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 shadow-lg flex items-center justify-between md:justify-evenly lg:justify-between">
        <Image
          src="/logo.png" // Replace with the actual song's image
          alt="Song Thumbnail"
          width={50}
          height={50}
          className="w-12 h-12 rounded-lg"
        />
        <div>
          <p className="text-sm font-medium">Song Title</p>
          <p className="text-xs text-gray-400">Artist Name</p>
        </div>
        <div className="flex items-center space-x-6">
          <IoPlaySkipForward className="text-2xl cursor-pointer hover:text-green-500" />
          <FaPlay className="text-3xl cursor-pointer hover:text-green-500" />
          <IoPlaySkipBack  className="text-2xl cursor-pointer hover:text-green-500" />
        </div>
        <div className="hidden md:flex items-center space-x-3">
          <p className="text-sm">2:30 / 3:45</p>
          <input
            type="range"
            className="w-24"
            min="0"
            max="100"
            value="50"
          />
        </div>
    </div>
  );
};

export default BottomPlayer;
