"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useAppStore } from "@/store/store";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";

export default function BottomPlayer() {
  const { currentSong, isPlaying, setIsPlaying, setCurrentSong, songs } = useAppStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Skip Forward (Memoized)
  const handleSkipForward = useCallback(() => {
    if (!songs.length || !currentSong) return;
    const currentIndex = songs.findIndex((song) => song._id === currentSong._id);
    const nextSong = songs[currentIndex + 1] || songs[0]; // Loop back if at the end
    setCurrentSong(nextSong);
  }, [songs, currentSong, setCurrentSong]);

  // Skip Backward
  const handleSkipBackward = () => {
    if (!songs.length || !currentSong) return;
    const currentIndex = songs.findIndex((song) => song._id === currentSong._id);
    const prevSong = songs[currentIndex - 1] || songs[songs.length - 1]; // Loop back if at the start
    setCurrentSong(prevSong);
  };

  // Play/Pause Toggle (Handles Promise Error)
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      const playPromise = audioRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => console.error("Playback error:", error));
      }
    }
    setIsPlaying(!isPlaying);
  };

  // Seek Handler
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
      setCurrentTime(Number(event.target.value));
    }
  };

  // Effect to handle audio playback (with fixed dependencies)
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audio;
      const playPromise = audioRef.current.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsPlaying(true))
          .catch((error) => console.error("Playback error:", error));
      }

      audioRef.current.ontimeupdate = () => setCurrentTime(audioRef.current?.currentTime || 0);
      audioRef.current.onloadedmetadata = () => setDuration(audioRef.current?.duration || 0);
      audioRef.current.onended = handleSkipForward;
    }
  }, [currentSong, handleSkipForward, setIsPlaying]);

  return (
    <div className="fixed bottom-0 w-full bg-spotify-black p-4 flex items-center justify-between border-t border-spotify-dark-gray">
      {/* Song Info */}
      {currentSong ? (
        <div className="flex items-center gap-4">
          <Image
            src={currentSong.coverImage}
            alt={currentSong.title}
            width={56}
            height={56}
            className="rounded-lg"
            priority={false} // Lazy loading
          />
          <div>
            <p className="text-sm font-medium text-spotify-white">{currentSong.title}</p>
            <p className="text-xs text-spotify-light-gray">{currentSong.artist}</p>
          </div>
        </div>
      ) : (
        <p className="text-spotify-light-gray">No song playing</p>
      )}

      {/* Player Controls */}
      <div className="flex items-center gap-6">
        <button onClick={handleSkipBackward} className="text-spotify-light-gray hover:text-spotify-white text-xl">
          <FaStepBackward />
        </button>
        <button onClick={togglePlayPause} className="bg-spotify-green p-3 rounded-full text-spotify-black hover:bg-spotify-dark-green transition">
          {isPlaying ? <FaPause className="text-xl" /> : <FaPlay className="text-xl ml-1" />}
        </button>
        <button onClick={handleSkipForward} className="text-spotify-light-gray hover:text-spotify-white text-xl">
          <FaStepForward />
        </button>
      </div>

      {/* Seek Bar */}
      <div className="flex items-center gap-3 w-1/3">
        <span className="text-xs text-spotify-light-gray">{Math.floor(currentTime / 60)}:{String(Math.floor(currentTime % 60)).padStart(2, '0')}</span>
        <input
          type="range"
          min="0"
          max={duration}
          value={currentTime}
          onChange={handleSeek}
          className="w-full h-1 bg-spotify-medium-gray rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-xs text-spotify-light-gray">{Math.floor(duration / 60)}:{String(Math.floor(duration % 60)).padStart(2, '0')}</span>
      </div>

      {/* Hidden Audio Element */}
      <audio ref={audioRef} />
    </div>
  );
}
