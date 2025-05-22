
// File: app/api/liveblocks-auth/route.ts

import { Liveblocks } from "@liveblocks/node"; // Import the Node.js SDK for server-side operations
import { NextRequest, NextResponse } from "next/server"; // Import Next.js server types for handling requests and responses

// --- 1. Initialize the Liveblocks Node.js client ---

// Retrieve the secret key securely from environment variables.
// This ensures your sensitive key is not hardcoded in the source code.
const secretKey = process.env.LIVEBLOCKS_SECRET_KEY;

// Critical Check: Ensure the secret key is actually set in your .env.local file.
// If this key is missing, authentication cannot proceed, and the app won't work correctly.
// It's better to fail early and loudly in this case.
if (!secretKey) {
  console.error("🔴 ERROR: LIVEBLOCKS_SECRET_KEY is not set in environment variables.");
  console.error("Please add LIVEBLOCKS_SECRET_KEY=your_secret_key to your .env.local file.");
  // Throwing an error prevents the server from starting in an insecure/non-functional state.
  throw new Error("LIVEBLOCKS_SECRET_KEY is not configured. Server cannot start.");
}

// Instantiate the Liveblocks client using the secret key.
// All subsequent interactions with the Liveblocks API via this instance
// will be authenticated using this key.
const liveblocks = new Liveblocks({
  secret: secretKey,
});

// --- 2. Define the API Route Handler (POST method) ---

// Export an asynchronous function named POST.
// Next.js App Router automatically maps HTTP POST requests to `/api/liveblocks-auth`
// to this function.
export async function POST(request: NextRequest) {
  // --- 3. User Identification ---
  // For Liveblocks to know *who* is connecting, we need to provide user information.
  // In a real application, you would typically integrate this with your authentication system
  // (like NextAuth.js, Clerk, Supabase Auth, etc.) to get the currently logged-in user's details.

  // Example using a hypothetical session object (e.g., from NextAuth.js):
  // const session = await getServerSession(authOptions); // Fetch user session
  // if (!session || !session.user) {
  //   // If no user is logged in, deny access.
  //   return new NextResponse("Unauthorized: User not logged in", { status: 401 });
  // }
  //
  // // Extract relevant user information from the session.
  // const userId = session.user.id; // Use a stable, unique ID from your database/auth provider.
  // const userInfo = {
  //   name: session.user.name || "Anonymous", // Provide a name
  // picture: session.user.image || "/default-avatar.png", // Provide an avatar URL
  //   // You can add any other relevant metadata here.
  // };

  // --- Placeholder User Info (REMOVE IN PRODUCTION) ---
  // Since we haven't implemented authentication yet, we'll use placeholder data.
  // IMPORTANT: For a real application, replace this with actual, unique, and stable user IDs.
  // Using random IDs like this means a user will appear as a *new* user on every page refresh.
  const userId = `user_${Math.random().toString(36).slice(2, 9)}`; // Temporary pseudo-unique ID
  const userInfo = {
    name: `Guest ${userId.substring(5)}`, // Example name
    picture: `https://avatar.vercel.sh/${userId}.png`, // Example dynamic avatar URL
    // Add any other info needed for presence (e.g., color)
    color: `hsl(${Math.random() * 360}, 90%, 60%)`
  };
  // --- End Placeholder User Info ---

  // Identify the user to Liveblocks.
  // This step associates the connection request with a specific user profile (userId and userInfo).
  // This information is used for presence features (showing who is in the room).
  try {
    // This call doesn't return anything critical for the auth flow itself,
    // but registers the user's metadata with Liveblocks for this session.
    await liveblocks.identifyUser(userId, { userInfo });
    console.log(`👤 User identified: ${userId} (${userInfo.name})`);
  } catch (error) {
    console.error("🔴 ERROR identifying user to Liveblocks:", error);
    // If identifying the user fails, return an internal server error.
    return new NextResponse("Internal Server Error during user identification", { status: 500 });
  }

  // --- 4. Room Authorization ---
  // The client application (Liveblocks React SDK) will send the ID of the room
  // the user wants to join in the request body.

  let room: string;
  try {
    // Parse the JSON body of the incoming request.
    const body = await request.json();
    // Extract the 'room' property from the parsed body.
    room = body.room;

    // Validate that the 'room' property exists.
    if (!room) {
      console.warn("⚠️ WARN: Missing 'room' in request body");
      return new NextResponse("Bad Request: Missing 'room' in request body", { status: 400 });
    }
  } catch (error) {
    // Handle cases where the request body is not valid JSON.
    console.error("🔴 ERROR parsing request body:", error);
    return new NextResponse("Bad Request: Invalid request body format", { status: 400 });
  }

  // Now, authorize the identified user for the specific room.
  // This is the core step where Liveblocks checks if the user (identified by userId)
  // should be allowed into the requested room.
  // The secret key used to initialize `liveblocks` implicitly grants the permission
  // to perform this authorization check.
  try {
    // `authorizeUser` asks Liveblocks: "Can `userId` access `room`?"
    // If yes, Liveblocks generates a short-lived access token.
    const session = liveblocks.prepareSession(userId, { userInfo });
    session.allow(room, session.FULL_ACCESS);
    const { status, body } = await session.authorize();

    // Check if authorization was successful
    if (status !== 200) {
        console.error(`Liveblocks authorization failed with status ${status}: ${body}`);
        return new NextResponse(body, { status });
    }
    // Check if Liveblocks successfully authorized the user.
    if (status !== 200) {
        // Log the error from Liveblocks for debugging.
        console.error(`🔴 ERROR: Liveblocks authorization failed for user ${userId} in room ${room}. Status: ${status}, Body: ${body}`);
        // Forward the status and error message from Liveblocks to the client.
        return new NextResponse(body, { status });
    }

    // Authorization successful!
    // The `body` contains the access token generated by Liveblocks.
    console.log(`✅ User ${userId} authorized for room ${room}. Sending token...`);

    // Send the access token (in the `body`) back to the client with a 200 OK status.
    // The Liveblocks client library in the browser will use this token to establish
    // the actual WebSocket connection to the requested room.
    return new NextResponse(body, { status });

  } catch (error) {
    // Handle any unexpected errors during the authorization process.
    console.error(`🔴 ERROR authorizing user ${userId} for room ${room}:`, error);
    // Return a generic internal server error response to the client.
    return new NextResponse("Internal Server Error during authorization", { status: 500 });
  }
}
