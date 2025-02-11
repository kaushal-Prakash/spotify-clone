"use client";

import { UserStore } from "@/store/store";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSearch, FaHeart, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";

interface Song {
  _id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  coverImage: string;
  audio: string;
  createdAt: string;
}

interface Upload {
  _id: string;
  title: string;
  artist: string;
  coverImage: string;
  songs: Song[];
  releaseDate: string;
}

interface UserData {
  username: string;
  email: string;
  favorites: Song[];
  uploads: Upload[];
}

export default function LibrarySidebar() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"favorites" | "uploads">("favorites");

  // Fix: Explicitly cast userData to UserData or null
  const userData = UserStore((state) => state.userData) as unknown as UserData | null;
  const updateUser = UserStore((state) => state.updateData);

  const favorites = userData?.favorites || [];
  const uploads = userData?.uploads || [];

  useEffect(() => {
    const fetchData = async () => {
      if (!userData || Object.keys(userData).length === 0) {
        try {
          const res = await axios.get("/api/auth/get-details");
          updateUser(res.data.user);
          console.log(res.data.user);
        } catch (error) {
          console.error("Error fetching user details:", error);
          toast.error("User details failed to load!");
        }
      }
    };

    fetchData();
  }, [userData, updateUser]);

  const currentList =
    activeTab === "favorites"
      ? favorites.filter((fav) =>
          fav.title.toLowerCase().includes(search.toLowerCase())
        )
      : uploads.filter((upload) =>
          upload.title.toLowerCase().includes(search.toLowerCase())
        );

  return (
    <div className="hidden md:flex flex-col w-64 h-screen rounded-lg bg-black text-white mt-16 p-4">
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
          currentList.map((item) => (
            <div
              key={item._id}
              className="p-2 bg-gray-900 rounded-md hover:bg-gray-700 cursor-pointer flex gap-3 items-center"
            >
              <Image src={item.coverImage} height="30" width="30" alt="logo" className="rounded-md max-h-7"/>
              <p>{item.title}</p>
              
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No {activeTab} found</p>
        )}
      </div>
    </div>
  );
}
