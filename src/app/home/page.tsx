"use client";

import { useEffect, useRef } from "react";
import PlayListView from "@/components/PlayerListView/PlayerListView";
import LibrarySidebar from "@/components/LibrarySidebar/LibrarySidebar";
import BottomPlayer from "@/components/BottomPlayer/BottomPlayer";
import Navbar from "@/components/Navbar/Navbar";
import NowPlaying from "@/components/NowPlaying/NowPlaying";
import { useAppStore } from "@/store/store";

export default function Home() {
  const { currentSong, setIsPlaying } = useAppStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
    }

    const audio = audioRef.current;
    if (currentSong) {
      audio.src = currentSong.audio;
      audio.play();
      setIsPlaying(true);
    }

    const updateTime = () => {
      // Update Zustand store with current time if needed
    };

    audio.addEventListener("timeupdate", updateTime);
    return () => {
      audio.removeEventListener("timeupdate", updateTime);
    };
  }, [currentSong, setIsPlaying]);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      <Navbar />

      <div className="flex flex-1 overflow-hidden rounded-lg">
        <div className="w-72 bg-spotify-dark-gray p-4 hidden md:block">
          <LibrarySidebar />
        </div>
        <div className="flex-1 bg-spotify-black overflow-y-auto p-6">
          <PlayListView />
        </div>
        <div className="w-80 bg-spotify-dark-gray p-4 hidden lg:block">
          <NowPlaying />
        </div>
      </div>

      <div className="fixed bottom-0 w-full bg-spotify-medium-gray p-4">
        <BottomPlayer />
      </div>
    </div>
  );
}
