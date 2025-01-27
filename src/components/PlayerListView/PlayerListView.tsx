"use client";

import React from "react";

export default function PlayListView({ selectedPlaylist, onSongSelect }) {
  // Dummy playlist data
  const playlistData = selectedPlaylist?.songs || [];
  
  if (!selectedPlaylist) return <div>Select a playlist to view songs</div>;

  return (
    <div className="flex-1 bg-spotify-black text-spotify-white p-6 overflow-y-auto">
      {/* Playlist Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-40 h-40 bg-spotify-dark-gray rounded-lg"></div>
        <div>
          <h2 className="text-4xl font-bold">{selectedPlaylist.name}</h2>
          <p className="text-spotify-light-gray">
            by {selectedPlaylist.creator} • {playlistData.length} songs, {selectedPlaylist.duration}
          </p>
        </div>
      </div>
      
      {/* Song List */}
      <div>
        {playlistData.map((song, index) => (
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
