"use client";
import React, { useState } from "react";
import { FaSearch, FaHeart, FaUpload } from "react-icons/fa";

export default function LibrarySidebar() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("favorites");

  const favorites = ["Song One", "Song Two", "Song Three"]; // Replace with actual data
  const uploads = ["My Song 1", "My Song 2", "Demo Track"]; // Replace with actual uploads

  const currentList =
    activeTab === "favorites"
      ? favorites.filter((fav) => fav.toLowerCase().includes(search.toLowerCase()))
      : uploads.filter((upload) => upload.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="hidden md:flex flex-col w-64 h-screen rounded-lg bg-black text-white p-4">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-4">
        <h2
          className={`text-lg font-bold flex items-center gap-2 cursor-pointer ${
            activeTab === "favorites" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          <FaHeart /> Favorites
        </h2>
        <h2
          className={`text-lg font-bold flex items-center gap-2 cursor-pointer ${
            activeTab === "uploads" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("uploads")}
        >
          <FaUpload /> Uploads
        </h2>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${activeTab}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 p-2 rounded-md"
        />
      </div>

      {/* List of Favorites or Uploads */}
      <div className="space-y-2">
        {currentList.length > 0 ? (
          currentList.map((item, index) => (
            <div
              key={index}
              className="block p-2 bg-gray-900 rounded-md hover:bg-gray-700 cursor-pointer"
            >
              {item}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No {activeTab} found</p>
        )}
      </div>
    </div>
  );
}
