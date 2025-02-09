import React from "react";

const AlbumCardSkeleton = () => {
  return (
    <div className="relative bg-spotify-dark-gray p-4 rounded-2xl shadow-md w-64 animate-pulse">
      {/* Album Cover Skeleton */}
      <div className="relative w-full h-60 rounded-xl overflow-hidden bg-spotify-medium-gray">
        {/* Placeholder for Image */}
        <div className="absolute inset-0 bg-spotify-light-gray opacity-20"></div>
      </div>

      {/* Album Details Skeleton */}
      <div className="mt-4 text-center">
        {/* Title Skeleton */}
        <div className="h-6 bg-spotify-medium-gray rounded-full w-3/4 mx-auto"></div>
        {/* Artist Skeleton */}
        <div className="h-4 bg-spotify-medium-gray rounded-full w-1/2 mx-auto mt-2"></div>
        {/* Release Date Skeleton */}
        <div className="h-4 bg-spotify-medium-gray rounded-full w-1/2 mx-auto mt-2"></div>
        {/* Songs Count Skeleton */}
        <div className="h-4 bg-spotify-medium-gray rounded-full w-1/2 mx-auto mt-2"></div>

        {/* Action Button Skeleton */}
        <div className="mt-4 w-full py-2 bg-spotify-medium-gray rounded-full"></div>
      </div>
    </div>
  );
};

export default AlbumCardSkeleton;