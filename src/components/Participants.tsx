// File: components/Participants.tsx

// This component uses Liveblocks hooks and renders dynamic UI
"use client";

import React from 'react';
// Import Liveblocks hooks and the Presence type (ensure path is correct)
import { useOthers, useSelf } from "@liveblocks/react";
import { Presence } from '@/types/liveblocks';
// Import ShadCN UI components for displaying avatars and tooltips
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Constant to limit the number of avatars shown directly to prevent clutter
const MAX_SHOWN_AVATARS = 2;

/**
 * Participants Component
 *
 * Displays avatars of users currently present in the Liveblocks room.
 * It fetches collaborator data using useOthers and useSelf hooks
 * and renders avatars with tooltips for names.
 */
export const Participants = () => {
  // Hook to get the list of *other* users in the room.
  // The generic <Presence> types the `user.presence` field within each user object.
  const others = useOthers<Presence>();

  // Hook to get information about the current user (self).
  // This is useful for displaying the user's own avatar differently.
  const currentUser = useSelf<Presence>();

  // Calculate if there are more users than the display limit
  const hasMoreUsers = others.length > MAX_SHOWN_AVATARS;

  // Helper function to generate initials from a name string
  const getInitials = (name?: string | null): string => {
    if (!name) return "G"; // Default to 'G' for Guest if name is missing
    const names = name.trim().split(" ");
    const firstInitial = names[0]?.[0]?.toUpperCase() || "";
    const lastInitial = names.length > 1 ? names[names.length - 1]?.[0]?.toUpperCase() : "";
    // Return one or two initials
    return firstInitial + (lastInitial || ""); // e.g., "JD" for "John Doe", "J" for "John"
  };

  return (
    // Use TooltipProvider at the root level if you have multiple tooltips
    <TooltipProvider>
      {/* Main container for the participants list */}
      {/* `flex items-center`: Aligns avatars horizontally and vertically centered. */}
      {/* `space-x-2`: Adds horizontal spacing between avatars. */}
      {/* `h-full`: Takes the full height allocated by its parent in Room.tsx. */}
      <div className="flex items-center space-x-2 h-full">

        {/* Render current user's avatar (if currentUser exists) */}
        {currentUser && (
          <Tooltip>
            <TooltipTrigger asChild>
              {/* Apply a distinct border to highlight the current user's avatar */}
              <Avatar className="h-8 w-8 border-2 border-blue-500">
                {/* Attempt to load the picture from user metadata (currentUser.info) */}
                <AvatarImage
                  src={currentUser.info?.picture}
                  alt={currentUser.info?.name || "You"}
                />
                {/* Fallback displays initials or 'Y' if no image/name */}
                <AvatarFallback className="text-xs font-semibold bg-neutral-100">
                  {getInitials(currentUser.info?.name) || 'Y'}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            {/* Tooltip content shows the full name or "You" on hover */}
            <TooltipContent>
              <p>{currentUser.info?.name || "You"}</p>
            </TooltipContent>
          </Tooltip>
        )}

        {/* Render avatars for other users up to the MAX_SHOWN_AVATARS limit */}
        {/* `others.slice(0, MAX_SHOWN_AVATARS)` creates a subset of the others array */}
        {others.slice(0, MAX_SHOWN_AVATARS).map(({ connectionId, info }) => (
          // Each item in the map needs a unique key; connectionId is perfect.
          <Tooltip key={connectionId}>
            <TooltipTrigger asChild>
              <Avatar className="h-8 w-8 border-2 border-neutral-300">
                {/* Attempt to load picture from other user's metadata (info) */}
                <AvatarImage
                  src={info?.picture}
                  alt={info?.name || "Guest"}
                />
                {/* Fallback displays initials or 'G' (Guest) */}
                <AvatarFallback className="text-xs font-semibold bg-neutral-100">
                  {getInitials(info?.name)}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            {/* Tooltip content shows the guest's name or "Guest" */}
            <TooltipContent>
              <p>{info?.name || "Guest"}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {/* If there are more users than the limit, show a numerical "+N" indicator */}
        {hasMoreUsers && (
          <Tooltip>
            <TooltipTrigger asChild>
              {/* This avatar represents the count of remaining users */}
              <Avatar className="h-8 w-8 border-2 border-neutral-300 bg-neutral-200 flex items-center justify-center">
                <AvatarFallback className="text-xs font-semibold">
                  +{others.length - MAX_SHOWN_AVATARS}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{others.length - MAX_SHOWN_AVATARS} more user(s)</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
};