/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import Navbar from "@/components/Navbar/Navbar";
import SongCard from "@/components/SongCard/SongCard";
import { Album } from "@/modals/AlbumModal";
import { UserStore } from "@/store/store";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const user = UserStore<any>((state) => state.userData); 
  const updateUser = UserStore((state) => state.updateData); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/auth/get-details");
        updateUser(res.data.user); // Update Zustand store
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("User details failed to load!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [updateUser]);

  if (loading) {
    return <p className="text-center text-spotify-light-gray">Loading...</p>;
  }

  return (
    <div className="bg-spotify-black min-h-screen text-spotify-white">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <h2 className="text-5xl font-bold mt-12 mb-6 text-spotify-green">
          Profile
        </h2>
        <div className="bg-spotify-medium-gray w-full p-6 rounded-lg flex md:flex-row justify-between items-center shadow-lg">
          <div>
            <p className="text-2xl font-semibold">Username: {user.username}</p>
            <p className="text-2xl font-semibold">Email: {user.email}</p>
          </div>
          <Image
            src="/profile/brush.jpg"
            height={100}
            width={100}
            alt="Profile Picture"
            className="rounded-full border-2 border-spotify-green hidden m-2 sm:block"
          />
        </div>
      </div>

      {/* Favorite Songs */}
      <div className="mt-8 w-full p-6">
        <h3 className="text-3xl font-bold mb-4 text-spotify-purple text-center">
          Favorite Songs
        </h3>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {user.favorites.length > 0 ? (
              user.favorites.map((song: any, index: number) => (
                <SongCard key={index} {...song} />
              ))
            ) : (
              <p className="text-spotify-light-gray text-center">
                No favorite songs added.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Uploaded Albums */}
      <div className="mt-8 w-full p-6">
        <h3 className="text-3xl font-bold mb-4 text-spotify-blue text-center">
          Uploaded Albums
        </h3>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {user.uploads.length > 0 ? (
              user.uploads.map((album: Album, index: number) => (
                <AlbumCard
                  key={index}
                  title={album.title}
                  artist={album.artist}
                  coverImage={album.coverImage}
                  songs={album.songs.length}
                  releaseDate={album.releaseDate}
                />
              ))
            ) : (
              <p className="text-spotify-light-gray text-center">
                No uploaded albums yet.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
