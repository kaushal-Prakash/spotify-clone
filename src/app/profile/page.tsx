import AlbumCard from "@/components/AlbumCard/AlbumCard";
import Navbar from "@/components/Navbar/Navbar";
import SongCard from "@/components/SongCard/SongCard";
import Image from "next/image";
import React from "react";

const ProfilePage = () => {
  const user = {
    username: "asdad",
    email: "mail@gmail.com",
    favorites: [
      {
        title: "New Song",
        artist: "Arjit",
        genre: "Pop",
        duration: 210,
        coverImage: "/album.jpg",
        audio: "",
        createdAt: new Date(),
      },
    ],
    uploadedSongs: [
      {
        title: "Nya Song",
        artist: "Arjit",
        genre: "Rock",
        duration: 180,
        coverImage: "/album.jpg",
        audio: "",
        createdAt: new Date(),
      },
      {
        title: "Nya Song",
        artist: "Arjit",
        genre: "Rock",
        duration: 180,
        coverImage: "/album.jpg",
        audio: "",
        createdAt: new Date(),
      },
      {
        title: "Nya Song",
        artist: "Arjit",
        genre: "Rock",
        duration: 180,
        coverImage: "/album.jpg",
        audio: "",
        createdAt: new Date(),
      },
      {
        title: "Nya Song",
        artist: "Arjit",
        genre: "Rock",
        duration: 180,
        coverImage: "/album.jpg",
        audio: "",
        createdAt: new Date(),
      },
      {
        title: "Nya Song",
        artist: "Arjit",
        genre: "Rock",
        duration: 180,
        coverImage: "/album.jpg",
        audio: "",
        createdAt: new Date(),
      },
      {
        title: "Nya Song",
        artist: "Arjit",
        genre: "Rock",
        duration: 180,
        coverImage: "/album.jpg",
        audio: "",
        createdAt: new Date(),
      },
    ],
    uploadedAlbums: [
      {
        title: "Best of Arjit",
        artist: "Arjit",
        coverImage: "/album.jpg",
        songs: [],
        releaseDate: new Date("2025-01-12"),
        genre: "Bollywood",
      },
    ],
  };

  return (
    <div className="bg-spotify-black min-h-screen text-spotify-white">
      <Navbar />
      <div className="flex flex-col items-center p-6">
        <h2 className="text-5xl font-bold mt-12 mb-6 text-spotify-green">Profile</h2>
        <div className="bg-spotify-medium-gray w-full p-6 rounded-lg flex  md:flex-row justify-between items-center shadow-lg">
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

      <div className="mt-8 w-full p-6">
        <h3 className="text-3xl font-bold mb-4 text-spotify-purple text-center">
          Favorite Songs
        </h3>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {user.favorites.length > 0 ? (
              user.favorites.map((song, index) => (
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

      <div className="mt-8 w-full p-6">
        <h3 className="text-3xl font-bold mb-4 text-spotify-purple text-center">
          Uploaded Songs
        </h3>
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {user.uploadedSongs.length > 0 ? (
              user.uploadedSongs.map((song, index) => (
                <SongCard key={index} {...song} />
              ))
            ) : (
              <div className="col-span-full flex justify-center">
                <p className="text-spotify-light-gray">
                  No uploaded songs yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 w-full p-6">
        <h3 className="text-3xl font-bold mb-4 text-spotify-blue text-center">
          Uploaded Albums
        </h3>
        <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
          {user.uploadedAlbums.length > 0 ? (
            user.uploadedAlbums.map((album, index) => (
              <AlbumCard key={index} {...album} />
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
