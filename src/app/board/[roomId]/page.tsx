// File: app/board/[roomId]/page.tsx

import React from 'react'; // Standard import for React components

// Import the provider component we created earlier.
// This provider handles the Liveblocks connection setup.
import { LiveblocksProvider } from "@/components/LiveblocksProvider";

// Import the client component that will contain the actual whiteboard UI and logic.
// This component will use Liveblocks hooks and needs to run on the client.
import { Room } from "@/components/Room";

// Define the TypeScript interface for the props that Next.js will pass to this page component.
interface BoardPageProps {
  params: {
    // The key here (`roomId`) must match the name of the dynamic segment folder (`[roomId]`).
    roomId: string;
  };
}

/**
 * BoardPage Component
 *
 * This component renders a specific collaborative whiteboard based on the URL.
 * It runs as a React Server Component by default.
 * It extracts the roomId from the URL and uses it to initialize the Liveblocks connection
 * via the LiveblocksProvider, which in turn renders the client-side Room component.
 */
const BoardPage = ({ params }: BoardPageProps) => {
  // --- Access the roomId ---
  // Destructure the roomId directly from the params object provided by Next.js.
  const roomId = params.roomId;

  // --- Server-side log for verification ---
  // Helps confirm the correct ID is received when accessing different board URLs.
  console.log(`[BoardPage Server Component] Rendering board for roomId: ${roomId}`);

  // --- Basic Validation ---
  if (!roomId) {
    // Handle the case where roomId might be missing or invalid
    return <div>Error: Invalid or missing Room ID provided in the URL.</div>;
  }

  // --- Render the Liveblocks Provider and Room ---
  // Pass the extracted `roomId` to the LiveblocksProvider.
  // The LiveblocksProvider (a Client Component wrapper) will then handle
  // the connection and authentication for this specific room.
  // The actual whiteboard UI (`Room` component) is rendered *inside* the provider,
  // ensuring it only renders after the connection is ready (due to ClientSideSuspense
  // inside LiveblocksProvider) and has access to the Liveblocks context.
  return (
    <LiveblocksProvider roomId={roomId}>
      {/* The Room component contains the client-side logic and UI for the whiteboard */}
      <Room />
    </LiveblocksProvider>
  );
};

// Export the component as the default export for this page route.
export default BoardPage;