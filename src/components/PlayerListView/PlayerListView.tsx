import React from "react";

export default function PlayListView() {
  return (
    <div className="flex-1 bg-spotify-black text-spotify-white p-6 overflow-y-auto">
      {/* Playlist Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-40 h-40 bg-spotify-dark-gray rounded-lg"></div>
        <div>
          <h2 className="text-4xl font-bold">Playlist Name</h2>
          <p className="text-spotify-light-gray">by User • 35 songs, 2 hr 15 min</p>
        </div>
      </div>
      
      {/* Song List */}
      <div>
        {["Song 1", "Song 2", "Song 3", "Song 4"].map((song, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-spotify-medium-gray cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-spotify-dark-gray rounded-lg"></div>
              <div>
                <p className="text-white font-semibold">{song}</p>
                <p className="text-spotify-light-gray text-sm">Artist Name</p>
              </div>
            </div>
            <p className="text-spotify-light-gray">3:45</p>
          </div>
        ))}
      </div>
    </div>
  );
}