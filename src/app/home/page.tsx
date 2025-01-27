"use client";

import { useState, useEffect } from "react";
import PlayListView from "@/components/PlayerListView/PlayerListView";
import LibrarySidebar from "@/components/LibrarySidebar/LibrarySidebar";
import BottomPlayer from "@/components/BottomPlayer/BottomPlayer";
import Navbar from "@/components/Navbar/Navbar";
import NowPlaying from "@/components/NowPlaying/NowPlaying";
import { Playlist } from "@/modals/PlaylistModal";
import { Song } from "@/modals/SongModal";

export default function SpotifyClone() {
  // State to manage the selected playlist and current song
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [audio] = useState(new Audio());
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLibraryOpen] = useState(false);

  const handlePlaylistSelect = (playlist: Playlist) => {
    setSelectedPlaylist(playlist);
  };

  const handleSongSelect = (song: Song) => {
    setCurrentSong(song);
    // audio.src = song.audioUrl || ""; 
    audio.play();
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying((prev) => !prev);
  };

  const handleSkipForward = () => {
    audio.currentTime = Math.min(audio.currentTime + 10, duration); // Ensure no overflow
  };

  const handleSkipBack = () => {
    audio.currentTime = Math.max(audio.currentTime - 10, 0); // Ensure no underflow
  };

  const handleSeek = (time: number) => {
    audio.currentTime = time;
    setCurrentTime(time);
  };

  useEffect(() => {
    const updateCurrentTime = () => setCurrentTime(audio.currentTime);

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("loadedmetadata", () => setDuration(audio.duration));

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("loadedmetadata", () => setDuration(audio.duration));
    };
  }, [audio]);

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Navbar */}
      <Navbar />

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden rounded-lg">
        {/* Left Sidebar - Library */}
        <div className={`w-72 bg-spotify-dark-gray p-4 ${isLibraryOpen ? "block" : "hidden md:block"}`}>
          <LibrarySidebar onPlaylistSelect={handlePlaylistSelect} />
        </div>

        {/* Main Content - Playlist View */}
        <div className="flex-1 bg-spotify-black overflow-y-auto p-6">
          <PlayListView
            selectedPlaylist={selectedPlaylist}
            onSongSelect={handleSongSelect}
          />
        </div>

        {/* Right Sidebar - Now Playing */}
        <div className="w-80 bg-spotify-dark-gray p-4 hidden lg:block">
          <NowPlaying song={currentSong} />
        </div>
      </div>

      {/* Bottom Player Controls */}
      <div className="fixed bottom-0 w-full bg-spotify-medium-gray p-4">
        <BottomPlayer
          currentSong={currentSong}
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onSkipForward={handleSkipForward}
          onSkipBack={handleSkipBack}
          currentTime={currentTime}
          duration={duration}
          onSeek={handleSeek}
        />
      </div>
    </div>
  );
}
