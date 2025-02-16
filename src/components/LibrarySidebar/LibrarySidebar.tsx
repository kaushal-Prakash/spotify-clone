/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaSearch, FaHeart, FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { Album, useAppStore, UserStore } from "@/store/store";

export default function LibrarySidebar() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<"favorites" | "uploads">("favorites");

  const userDetails = useAppStore((state) => state.userDetails);
  const setUserDetails = useAppStore((state) => state.setUserDetails);
  const setSongs = useAppStore((state) => state.setSongs);
  const setCurrentSong = useAppStore((state) => state.setCurrentSong);

  const user = UserStore<any>((state) => state.userData);
  const updateUser = UserStore((state) => state.updateData);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || Object.keys(user).length === 0) {
        try {
          const res = await axios.get("/api/auth/get-details");
          updateUser(res.data.user);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("User details failed to load!");
        }
      }
    };

    fetchData();
  }, [user, updateUser]);

  const favorites = user?.favorites || [];
  const uploads = user?.uploads || [];

  useEffect(() => {
    const fetchData = async () => {
      if (!userDetails) {
        try {
          const res = await axios.get("/api/auth/get-details");
          if (res.status === 200) {
            setUserDetails(res.data.user);
          } else {
            throw new Error("Failed to fetch user details");
          }
        } catch (error) {
          console.error("Error fetching user details:", error);
          toast.error("Failed to load user details!");
        }
      }
    };

    fetchData();
  }, [userDetails, setUserDetails]);

  const fetchAlbumDetails = async (albumId: string): Promise<Album | null> => {
    try {
      const res = await axios.get(`/api/albums/${albumId}`);
      if (res.status === 200) {
        return res.data.album;
      } else {
        throw new Error("Failed to fetch album details");
      }
    } catch (error) {
      console.error("Error fetching album details:", error);
      toast.error("Failed to load album details!");
      return null;
    }
  };

  const handleAlbumClick = async (albumId: string) => {
    const album = await fetchAlbumDetails(albumId);
    if (album) {
      setSongs(album.songs);
      if (album.songs.length > 0) {
        setCurrentSong(album.songs[0]); 
      }
    }
  };

  const filteredItems = activeTab === "favorites"
    ? favorites.filter((item: any) =>
        item?.title.toLowerCase().includes(search.toLowerCase())
      )
    : uploads.filter((item: any) =>
        item?.title.toLowerCase().includes(search.toLowerCase())
      );

  return (
    <div className="hidden md:flex flex-col w-64 h-screen rounded-lg bg-black text-white mt-16 p-4">
      {/* Tabs */}
      <div className="flex justify-between items-center mb-4">
        <button
          className={`text-lg font-bold flex items-center gap-2 cursor-pointer ${
            activeTab === "favorites" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("favorites")}
        >
          <FaHeart /> Favorites
        </button>
        <button
          className={`text-lg font-bold flex items-center gap-2 cursor-pointer ${
            activeTab === "uploads" ? "text-white" : "text-gray-500"
          }`}
          onClick={() => setActiveTab("uploads")}
        >
          <FaUpload /> Uploads
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-4">
        <FaSearch className="absolute left-3 top-3 text-gray-400" />
        <input
          type="text"
          placeholder={`Search ${activeTab}`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-gray-800 text-white pl-10 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-spotify-green"
        />
      </div>

      {/* List of Favorites or Uploads */}
      <div className="space-y-2 overflow-y-auto">
        {filteredItems.length > 0 ? (
          filteredItems.map((item: any) => (
            <div
              key={item._id}
              className="p-2 bg-gray-900 rounded-md hover:bg-gray-700 cursor-pointer flex gap-3 items-center"
              onClick={() =>
                activeTab === "uploads" && handleAlbumClick(item._id)
              }
            >
              <Image
                src={item.coverImage}
                height={30}
                width={30}
                alt="Cover"
                className="rounded-md max-h-7"
              />
              <p className="truncate">{item.title}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No {activeTab} found</p>
        )}
      </div>
    </div>
  );
}