"use client";

import React from "react";
import { Playlist } from "@/modals/PlaylistModal";
import { Song } from "@/modals/SongModal";

interface PlayListViewProps {
  selectedPlaylist: Playlist | null;
  onSongSelect: (song: Song) => void;
}

export default function PlayListView({
  selectedPlaylist,
  onSongSelect,
}: PlayListViewProps) {
  if (!selectedPlaylist) {
    return (
      <div className="text-center text-gray-400">
        Select a playlist to view songs
      </div>
    );
  }

  const {
    name,
    creator,
    duration,
    songs = [],
  } = {
    name: "Chill Vibes",
    creator: "John Doe",
    duration: "1 hr 35 min",
    songs: [
      {
        title: "Lofi Dreams",
        artist: "DJ Relax",
        duration: "3:45",
        album: "Chill Vibes",
        genre: "Lofi",
        coverImage: "path/to/image1.jpg",
        audio: "path/to/audio1.mp3",
      },
      {
        title: "Evening Serenity",
        artist: "Calm Beats",
        duration: "4:20",
        album: "Chill Vibes",
        genre: "Lofi",
        coverImage: "path/to/image2.jpg",
        audio: "path/to/audio2.mp3",
      },
      {
        title: "Quiet Morning",
        artist: "Soft Sounds",
        duration: "2:50",
        album: "Chill Vibes",
        genre: "Lofi",
        coverImage: "path/to/image3.jpg",
        audio: "path/to/audio3.mp3",
      },
    ],
  };

  return (
    <div className="flex-1 bg-spotify-black text-spotify-white p-6 overflow-y-auto">
      {/* Playlist Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-40 h-40 bg-spotify-dark-gray rounded-lg"></div>
        <div>
          <h2 className="text-4xl font-bold">{name}</h2>
          <p className="text-spotify-light-gray">
            by {creator} • {songs.length}{" "}
            {songs.length === 1 ? "song" : "songs"}, {duration}
          </p>
        </div>
      </div>

      {/* Song List */}
      <div>
        {songs.map((song, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-spotify-medium-gray cursor-pointer"
            onClick={() => onSongSelect(song)} // Trigger song selection
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-spotify-dark-gray rounded-lg"></div>
              <div>
                <p className="text-white font-semibold">{song.title}</p>
                <p className="text-spotify-light-gray text-sm">{song.artist}</p>
              </div>
            </div>
            <p className="text-spotify-light-gray">{song.duration}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
