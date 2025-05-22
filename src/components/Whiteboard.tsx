// File: components/Whiteboard.tsx
"use client";

import React from 'react';

interface WhiteboardProps {}

export const Whiteboard = ({}: WhiteboardProps) => {
  return (
    // --- Main Canvas Container ---
    // relative: Potential positioning context for future elements (e.g., cursors).
    // w-full h-full: Fills the 'flex-1' area allocated in Room.tsx.
    // bg-neutral-100: Distinct background color for the drawing area.
    // touch-none: Prevents default touch behaviors like scrolling during drawing.
    <main className="relative w-full h-full bg-neutral-100 touch-none">
      {/* --- Canvas Element --- */}
      {/* id="canvas": Used by JavaScript (Fabric.js) to target this element.
          w-full h-full: Makes the canvas element fill its parent <main> container visually.
                       The actual pixel dimensions are set later by the library. */}
      <canvas
        id="canvas"
        className="w-full h-full"
      />
    </main>
  );
};