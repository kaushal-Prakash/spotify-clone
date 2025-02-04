"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

export default function AdminLogin() {
  const [form, setForm] = useState({ email: "", password: "" });
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/admin-login", form);
      if(res.data.status == 200){
        toast.success("Logged in successfully!");
      }else{
        toast.error("Some error occurred ! try agsin ...");
      }
      router.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-spotify-black">
      <div className="bg-spotify-black p-8 rounded-xl shadow-lg w-96 border-spotify-green border-2">
        <h2 className="text-white text-2xl font-bold mb-4">Admin Panel 🔐</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-white mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-2 rounded bg-gray-700 text-white focus:outline-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-spotify-green rounded-full ease-in font-semibold transition duration-300 text-white py-2 hover:bg-spotify-white hover:text-spotify-green"
          >
            Admin Login
          </button>
        </form>
        <div className="mt-6 text-center text-spotify-light-gray text-sm">
          <p>Not an admin?</p>
          <Link href="/login" className="font-semibold">
            User Login
          </Link>
        </div>
      </div>
    </div>
  );
}
