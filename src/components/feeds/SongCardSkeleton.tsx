import React from "react";

const SongCardSkeleton: React.FC = () => {
  return (
    <div className="bg-spotify-dark-gray border-2 border-spotify-green min-w-64 max-w-72 p-4 rounded-lg shadow-lg relative animate-pulse">
      {/* Cover Image Skeleton */}
      <div className="relative h-48 w-full mb-4 rounded-lg overflow-hidden bg-spotify-medium-gray">
        {/* Placeholder for Image */}
        <div className="absolute inset-0 bg-spotify-light-gray opacity-20"></div>
      </div>

      {/* Song Details Skeleton */}
      <div className="flex flex-col space-y-2">
        {/* Title Skeleton */}
        <div className="h-6 bg-spotify-medium-gray rounded-full w-3/4"></div>
        {/* Artist Skeleton */}
        <div className="h-4 bg-spotify-medium-gray rounded-full w-1/2"></div>
        {/* Genre and Duration Skeleton */}
        <div className="flex justify-between items-center">
          <div className="h-4 bg-spotify-medium-gray rounded-full w-1/3"></div>
          <div className="h-4 bg-spotify-medium-gray rounded-full w-1/4"></div>
        </div>
      </div>

      {/* Favorite Button Skeleton */}
      <div className="absolute top-4 right-4 h-6 w-6 bg-spotify-medium-gray rounded-full"></div>
    </div>
  );
};

export default SongCardSkeleton;