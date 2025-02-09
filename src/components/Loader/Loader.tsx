import { FaHeadphones } from "react-icons/fa";
import "./LoadingAnimation.css";

export default function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
      <div className="relative flex items-center justify-center headphone-container">
        <FaHeadphones className="text-6xl text-blue-400 headphone" />
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
      </div>
      <p className="mt-6 text-xl font-semibold tracking-wider text-blue-300 animate-pulse">
        Stay Tuned
      </p>
    </div>
  );
}
