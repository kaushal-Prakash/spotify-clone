"use client";
import { useState } from "react";
import PlayListView from "@/components/PlayerListView/PlayerListView";
import LibrarySidebar from "@/components/LibrarySidebar/LibrarySidebar";
import BottomPlayer from "@/components/BottomPlayer/BottomPlayer";
import Navbar from "@/components/Navbar/Navbar";
import NowPlaying from "@/components/NowPlaying/NowPlaying";

export default function SpotifyClone() {
  const [isLibraryOpen] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar/>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden rounded-lg">
        {/* Left Sidebar - Library */}
        <div className={`w-72 bg-spotify-dark-gray p-4 ${isLibraryOpen ? "block" : "hidden md:block"}`}>
          <LibrarySidebar />
        </div>

        {/* Main Content - Playlist View */}
        <div className="flex-1 bg-spotify-black overflow-y-auto p-6">
          <PlayListView />
        </div>

        {/* Right Sidebar - Now Playing */}
        <div className="w-80 bg-spotify-dark-gray p-4 hidden lg:block">
          <NowPlaying />
        </div>
      </div>

      {/* Bottom Player Controls */}
      <div className="fixed bottom-0 w-full bg-spotify-medium-gray p-4">
        <BottomPlayer/>
      </div>
    </div>
  );
}
