"use client";
import React from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

export default function LibrarySidebar({ onPlaylistSelect }) {
  const playlists = ["Liked Songs", "Chill Vibes", "Workout Mix"];

  const handlePlaylistClick = (playlist) => {
    onPlaylistSelect(playlist); // Notify the parent component about the selected playlist
  };

  return (
    <div className="hidden md:flex flex-col w-64 h-screen rounded-lg bg-black text-white p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">Your Library</h2>
        <button className="text-gray-400 hover:text-white">
          <FaPlus size={16} />
        </button>
      </div>
      
      {/* Search Bar */}
      <div className="relative mb-4 flext">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="w-full bg-gray-800 text-white pl-10 p-2 rounded-md"
        />
      </div>
      
      {/* Playlists */}
      <div className="space-y-2">
        {playlists.map((playlist, index) => (
          <div
            key={index}
            className="block p-2 bg-gray-900 rounded-md hover:bg-gray-700 cursor-pointer"
            onClick={() => handlePlaylistClick(playlist)} // Trigger playlist select
          >
            {playlist}
          </div>
        ))}
      </div>
    </div>
  );
}
