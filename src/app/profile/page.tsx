/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import AlbumCard from "@/components/AlbumCard/AlbumCard";
import Navbar from "@/components/Navbar/Navbar";
import SongCard from "@/components/SongCard/SongCard";
import { Album, UserStore } from "@/store/store";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AlbumCardLoading } from "../loading";
import SongCardSkeleton from "@/components/feeds/SongCardSkeleton";

const ProfilePage = () => {
  const user = UserStore<any>((state) => state.userData);
  const updateUser = UserStore((state) => state.updateData);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!user || Object.keys(user).length === 0) {
        try {
          const res = await axios.get("/api/auth/get-details");
          updateUser(res.data.user);
        } catch (error) {
          console.error("Error fetching data:", error);
          toast.error("User details failed to load!");
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false); 
      }
    };

    fetchData();
  }, [user, updateUser]);

  return (
    <div className="bg-spotify-black min-h-screen text-spotify-white">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <h2 className="text-5xl font-extrabold mt-12 mb-6 text-spotify-green">
          Profile
        </h2>

        {/* Profile Info Section */}
        <div className="bg-spotify-medium-gray bg-opacity-80 backdrop-blur-lg w-full p-8 rounded-2xl flex flex-col md:flex-row justify-between items-center shadow-2xl transition-all duration-300 hover:scale-[1.02]">
          <div className="text-center md:text-left">
            <p className="text-3xl font-bold">{user?.username || "Guest"}</p>
            <p className="text-lg text-spotify-light-gray">
              {user?.email || "No email available"}
            </p>
          </div>
          <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-spotify-green shadow-lg">
            <Image
              src="/profile/brush.jpg"
              layout="fill"
              objectFit="cover"
              alt="Profile Picture"
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Favorite Songs Section */}
      <div className="mt-12 w-full px-6">
        <h3 className="text-4xl font-extrabold mb-6 text-spotify-purple text-center">
          Favorite Songs
        </h3>
        <div className="w-full">
          {" "}
          {/* Ensure full width */}
          {isLoading ? ( // Show skeleton if data is loading
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <SongCardSkeleton key={index} />
              ))}
            </div>
          ) : user?.favorites?.length > 0 ? ( // Show data if available
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {user.favorites.map((song: any, index: number) => (
                <SongCard key={index} {...song} />
              ))}
            </div>
          ) : (
            // Show message if no favorites
            <div className="flex justify-center items-center min-h-[150px]">
              <p className="text-spotify-light-gray text-xl text-center">
                No favorite songs yet.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Uploaded Albums Section */}
      <div className="mt-12 w-full px-6">
        <h3 className="text-4xl font-extrabold mb-6 text-spotify-blue text-center">
          Uploaded Albums
        </h3>
        <div className="flex justify-center pb-16">
          {isLoading ? ( // Show skeleton if data is loading
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <AlbumCardLoading key={index} />
              ))}
            </div>
          ) : user?.uploads?.length > 0 ? ( // Show data if available
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
              {user.uploads.map((album: Album, index: number) => (
                <AlbumCard
                  key={index}
                  id={album._id}
                  title={album.title}
                  artist={album.artist}
                  coverImage={album.coverImage}
                  songs={album.songs.length}
                  releaseDate={album.releaseDate}
                />
              ))}
            </div>
          ) : (
            // Show message if no albums
            <div className="flex justify-center items-center min-h-[150px]">
              <p className="text-spotify-light-gray text-xl text-center">
                No uploaded albums yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
