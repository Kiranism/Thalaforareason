"use client";
import React from "react";
import ConfettiExplosion from "react-confetti-explosion";

export default function Celebration({
  isExploading = false,
}: {
  isExploading: boolean;
}) {
  return (
    <>
      {isExploading && (
        <ConfettiExplosion width={4000} particleCount={200} duration={3000} />
      )}
    </>
  );
}
