"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useAppStore } from "@/store/store";
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from "react-icons/fa";
import Image from "next/image";

export default function NowPlaying() {
  const { currentSong, isPlaying, setIsPlaying, setCurrentSong, songs } = useAppStore();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play/Pause Handler
  const togglePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Skip Forward
  const handleSkipForward = useCallback(() => {
    if (!songs.length || !currentSong) return;
    const currentIndex = songs.findIndex((song) => song._id === currentSong._id);
    const nextSong = songs[currentIndex + 1] || songs[0]; // Loop back if at the end
    setCurrentSong(nextSong);
  }, [currentSong, songs, setCurrentSong]);

  // Skip Backward
  const handleSkipBackward = () => {
    if (!songs.length || !currentSong) return;
    const currentIndex = songs.findIndex((song) => song._id === currentSong._id);
    const prevSong = songs[currentIndex - 1] || songs[songs.length - 1]; // Loop back if at the start
    setCurrentSong(prevSong);
  };

  // Seek Handler
  const handleSeek = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current) {
      audioRef.current.currentTime = Number(event.target.value);
      setCurrentTime(Number(event.target.value));
    }
  };

  // Effect to handle audio playback
  useEffect(() => {
    if (currentSong && audioRef.current) {
      audioRef.current.src = currentSong.audio;
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.ontimeupdate = () => {
        setCurrentTime(audioRef.current?.currentTime || 0);
      };

      audioRef.current.onloadedmetadata = () => {
        setDuration(audioRef.current?.duration || 0);
      };

      audioRef.current.onended = handleSkipForward;
    }
  }, [currentSong, handleSkipForward, setIsPlaying]);

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
          <p className="text-sm text-gray-400">{currentSong.artist}</p>

          {/* Progress Bar */}
          <input
            type="range"
            min="0"
            max={duration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full mt-2"
          />

          {/* Controls */}
          <div className="flex items-center gap-6 mt-4">
            <button onClick={handleSkipBackward} className="text-xl"><FaStepBackward /></button>
            <button onClick={togglePlayPause} className="text-2xl">
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button onClick={handleSkipForward} className="text-xl"><FaStepForward /></button>
          </div>

          {/* Hidden Audio Element */}
          <audio ref={audioRef} />
        </>
      ) : (
        <p className="text-gray-400">No song playing</p>
      )}
    </div>
  );
}
