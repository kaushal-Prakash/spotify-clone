"use client";

import React from "react";
import Image from "next/image";
import { FaPause } from "react-icons/fa";
import { BiShuffle } from "react-icons/bi";
import { BsRepeat, BsSkipStartFill, BsSkipEndFill } from "react-icons/bs";

export default function NowPlaying() {
  return (
    <div className="bg-black text-white p-4 w-full md:w-1/4 flex flex-col justify-between">
      {/* Song Details */}
      <div className="flex items-center space-x-4">
        <Image
          src="/song-cover.jpg"
          width={60}
          height={60}
          alt="Song Cover"
          className="rounded-lg"
        />
        <div>
          <h3 className="text-lg font-semibold">Carol Of The Bells</h3>
          <p className="text-sm text-gray-400">Lindsey Stirling</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-center space-x-6 mt-4">
        <BiShuffle size={20} className="text-gray-400 cursor-pointer hover:text-white" />
        <BsSkipStartFill size={24} className="cursor-pointer hover:text-white" />
        <button className="bg-white text-black p-2 rounded-full">
          <FaPause size={20} />
        </button>
        <BsSkipEndFill size={24} className="cursor-pointer hover:text-white" />
        <BsRepeat size={20} className="text-gray-400 cursor-pointer hover:text-white" />
      </div>

      {/* Progress Bar */}
      <div className="flex items-center space-x-2 text-gray-400 text-sm mt-4">
        <span>2:00</span>
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-green-500 w-1/2"></div>
        </div>
        <span>2:46</span>
      </div>
    </div>
  );
}
