"use client";
import React from "react";

export default function Button({
  label,
  color,
  onClick,
}: {
  label: string;
  color: string;
  onClick?: () => void;
}) {
  return (
    <button
      className={`px-4 py-2 rounded-full font-semibold text-white hover:opacity-80 transition-opacity`}
      style={{ backgroundColor: color }}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
