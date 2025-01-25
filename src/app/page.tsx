"use client";
import Link from "next/link";
import { useState } from "react";
import { FaSpotify } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

export default function Home() {
  const [popup, setPopup] = useState(false);

  const handlePopupClick = () => {
    setPopup(!popup);
    console.log(popup);
  };

  return (
    <div className="min-h-screen bg-spotify-black text-white flex flex-col items-center justify-center px-6 relative">
      {/* Hero Section */}
      <div className="text-center max-w-3xl">
        <FaSpotify className="text-6xl text-spotify-green mx-auto mb-4" />
        <h1 className="text-5xl font-bold leading-tight">
          Experience Music Like Never Before
        </h1>
        <p className="text-lg text-spotify-light-gray mt-4">
          Discover millions of songs, create playlists, and enjoy an immersive
          music experience with our Spotify Clone.
        </p>

        {/* Call to Action Buttons */}
        <div className="mt-6 flex gap-4 justify-center">
          <button
            onClick={() => handlePopupClick()} // ✅ Open Popup
            className="bg-spotify-green text-black font-semibold px-6 py-3 rounded-full text-lg hover:bg-spotify-dark-green transition-all"
          >
            Get Started
          </button>
          <Link
            href="About"
            className="border border-spotify-green text-spotify-green font-semibold px-6 py-3 rounded-full text-lg hover:bg-spotify-green hover:text-black transition-all"
          >
            Learn More
          </Link>
        </div>
      </div>

      {/* ✅ Popup Modal */}
      {popup && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-spotify-dark-gray p-6 rounded-lg shadow-lg w-96 text-center relative">
            {/* Close Button */}
            <button
              className="absolute top-3 right-3 text-white text-2xl hover:text-spotify-green"
              onClick={() => handlePopupClick()} // ✅ Close Popup
            >
              <IoClose />
            </button>
            <h2 className="text-2xl font-bold mb-4">Welcome!</h2>
            <p className="text-spotify-light-gray mb-6">
              Choose an option to continue
            </p>

            {/* Login & Signup Buttons */}
            <div className="flex flex-col gap-4">
              <Link
                href="/login"
                className="bg-spotify-green text-black py-2 rounded-full font-semibold hover:bg-spotify-dark-green transition-all"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="border border-spotify-green text-spotify-green py-2 rounded-full font-semibold hover:bg-spotify-green hover:text-black transition-all"
              >
                Sign Up
              </Link>
            </div>

            {/* Admin Login Link */}
            <Link
              href="/admin/login"
              className="text-white mt-6 block text-sm hover:text-spotify-green transition-all"
            >
              Admin Login?
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
