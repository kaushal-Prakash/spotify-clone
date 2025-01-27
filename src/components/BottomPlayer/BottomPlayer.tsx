"use client";
import React from 'react';
import Image from 'next/image';
import { IoPlaySkipForward, IoPlaySkipBack } from "react-icons/io5";
import { FaPlay, FaPause } from 'react-icons/fa';
import { Song } from '@/modals/SongModal';

interface BottomPlayerProps {
  currentSong: Song;
  isPlaying: boolean;
  onPlayPause: () => void;
  onSkipForward: () => void;
  onSkipBack: () => void;
  currentTime: number;
  duration: number;
  onSeek: (value: number) => void;
}

const BottomPlayer: React.FC<BottomPlayerProps> = ({ currentSong, isPlaying, onPlayPause, onSkipForward, onSkipBack, currentTime, duration, onSeek }) => {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-black text-white p-4 shadow-lg flex items-center justify-between md:justify-evenly lg:justify-between">
      {/* Song Thumbnail */}
      <Image
        src={"/logo.png"}
        alt="Song Thumbnail"
        width={50}
        height={50}
        className="w-12 h-12 rounded-lg"
      />
      
      {/* Song Information */}
      <div>
        <p className="text-sm font-medium">{currentSong?.title || "Song Title"}</p>
        <p className="text-xs text-gray-400">{currentSong?.artist || "Artist Name"}</p>
      </div>
      
      {/* Playback Controls */}
      <div className="flex items-center space-x-6">
        <IoPlaySkipBack
          className="text-2xl cursor-pointer hover:text-green-500"
          onClick={onSkipBack}
        />
        
        <button
          className="text-3xl cursor-pointer hover:text-green-500"
          onClick={onPlayPause}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        
        <IoPlaySkipForward
          className="text-2xl cursor-pointer hover:text-green-500"
          onClick={onSkipForward}
        />
      </div>
      
      {/* Progress Bar (Hidden on small screens) */}
      <div className="hidden md:flex items-center space-x-3">
        <p className="text-sm">{`${currentTime || '0:00'} / ${duration || '0:00'}`}</p>
        <input
          type="range"
          className="w-24"
          min="0"
          max={duration || 100}
          value={currentTime || 0}
          onChange={(e) => onSeek(Number(e.target.value))}
        />
      </div>
    </div>
  );
};

export default BottomPlayer;
