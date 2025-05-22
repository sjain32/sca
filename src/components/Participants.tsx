// File: components/Participants.tsx

// This component will display dynamic data based on user presence
// and use client-side hooks, so it must be a Client Component.
"use client";

import React from 'react';
// Import ShadCN Avatar components for later use
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define props interface (empty for now, might receive user limit, etc. later)
interface ParticipantsProps {
  // No props needed for the basic structure
}

/**
 * Participants Component
 *
 * Displays the list of users currently present in the whiteboard room.
 * Will use Liveblocks presence hooks (`useOthers`) later.
 */
export const Participants = ({}: ParticipantsProps) => {
  // In a future step, we will use Liveblocks hooks here:
  // const others = useOthers();
  // const currentUser = useSelf(); // To potentially exclude self or highlight

  // Placeholder content until Liveblocks integration
  const participantCount = 0; // Replace with actual count later (e.g., others.length + 1)

  return (
    // Main container for the participants list.
    // `w-full h-full` makes it fill the allocated space in Room.tsx.
    // `flex flex-col items-center justify-center`: Centers the placeholder text for now.
    // Will likely change to display avatars in a row/column.
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Placeholder text indicating the purpose and future content */}\
      {/* You can customize this initial placeholder look */}
      <p className="text-xs text-muted-foreground">
        {participantCount > 0 ? `${participantCount} users online` : "Participants"}
      </p>
      {/* Avatars will be rendered here later using a map function */}
      {/* Example:
        <div className="flex space-x-2">
          {others.map(({ connectionId, info }) => (
             <Avatar key={connectionId}>
               <AvatarImage src={info?.picture} alt={info?.name} />
               <AvatarFallback>{info?.name?.[0] || 'G'}</AvatarFallback>
             </Avatar>
          ))}
        </div>
      */}
    </div>
  );
};