import "./loading.css";

export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center bg-spotify-black text-white text-2xl font-semibold">
      <span className="mr-1">Loading</span>
      <span className="dot-animation">.</span>
      <span className="dot-animation animation-delay-200">.</span>
      <span className="dot-animation animation-delay-400">.</span>
    </div>
  );
}
