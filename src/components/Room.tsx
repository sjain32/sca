// File: components/Room.tsx

// This component MUST be a Client Component to use Liveblocks hooks
"use client";

import { useOthers, useMyPresence, useRoom } from "@liveblocks/react"; // Example hook imports

/**
 * This component will contain the main whiteboard application UI,
 * including the canvas, toolbar, participants, etc.
 * It uses Liveblocks hooks, so it must be a Client Component.
 */
export function Room() {
  // Example usage of Liveblocks hooks (will be expanded in later steps)
  // const others = useOthers();
  // const [myPresence, updateMyPresence] = useMyPresence();
  // const room = useRoom();

  // console.log("Room connection status:", room.connection);
  // console.log("Number of other users:", others.length);

  return (
    <div className="flex flex-col h-screen w-screen items-center justify-center">
      <h1 className="text-2xl font-bold mb-4">Collaborative Whiteboard Room</h1>
      <p className="text-muted-foreground">
        (Whiteboard Canvas and Toolbar will be implemented here)
      </p>
      {/* Placeholder for the actual whiteboard canvas and UI elements */}
      {/* We will add Fabric.js canvas integration, toolbar, etc., in later steps */}
    </div>
  );
}