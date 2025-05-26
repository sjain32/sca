import { LiveObject } from "@liveblocks/client";

// types/liveblocks.ts (ensure it covers text)
export type CanvasObject = LiveObject<{
  type: 'path' | 'rect' | 'circle' | 'text' | 'string'; // Include 'text'
  data: {
      id: string; // Unique identifier is crucial
      ownerConnectionId?: number;
      // Add properties specific to text if needed for stricter typing
      text?: string;
      fontSize?: number;
      // Allow other Fabric props
      [key: string]: any;
  };
}>;