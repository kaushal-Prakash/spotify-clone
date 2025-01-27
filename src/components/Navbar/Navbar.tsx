"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { BiLibrary } from "react-icons/bi";
import { BsSearch } from "react-icons/bs";
import Image from "next/image";
import axios from "axios";
import { toast } from "react-toastify";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false); // State for user menu
  const [searchQuery, setSearchQuery] = useState("");
  
  const userMenuRef = useRef<HTMLDivElement | null>(null); // Ref for user menu
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = async () => {
    try{
        const res = await axios.get("/api/auth/user-logout");
        console.log(res);
        const {message,success} = res.data;
        if(success){
          toast.success(message);
        }
        else {
          toast.error(message);
        }
        setTimeout(() => {
          window.location.href = "/login"; 
        }, 1500);
    }catch(err){
        console.log(err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black text-white px-4 py-3">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image src="/icon.png" width={40} height={40} alt="Spotify Logo" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-6">
          <NavItem href="/" icon={<GoHome size={20} />} label="Home" />
          <div className="relative">
            {/* Search Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="bg-gray-800 text-white px-10 py-2 rounded-full w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Search..."
            />
            <BsSearch size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
          <NavItem href="/library" icon={<BiLibrary size={20} />} label="Library" />
        </div>

        {/* Profile Icon (Right) */}
        <div className="relative">
          <button onClick={handleUserMenuToggle} className="hidden md:block">
            <FaUserCircle size={24} className="text-gray-300 hover:text-white" />
          </button>

          {/* User Menu Popup */}
          {isUserMenuOpen && (
            <div ref={userMenuRef} className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg text-white z-10">
              <Link
                href="/profile"
                className="block px-4 py-2 hover:bg-gray-700 hover:rounded-lg"
                onClick={() => setIsUserMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <GoHome size={24} /> : <BsSearch size={24} />} 
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden mt-3 space-y-3 text-center">
          <NavItem href="/" icon={<GoHome size={20} />} label="Home" />
          <NavItem href="/search" icon={<BsSearch size={20} />} label="Search" />
          <NavItem href="/library" icon={<BiLibrary size={20} />} label="Library" />
          <NavItem href="/profile" icon={<FaUserCircle size={20} />} label="Profile" />
        </div>
      )}
    </nav>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <Link href={href} className="flex items-center gap-2 text-gray-300 hover:text-white">
      {icon}
      <span>{label}</span>
    </Link>
  );
}
