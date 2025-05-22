// Located in: app/page.tsx (or src/app/page.tsx)

import { Button } from "@/components/ui/button"; // Import the Button component

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-4xl font-bold mb-8">Collaborative Whiteboard</h1>

      {/* Use the ShadCN Button component
      <Button variant="outline" size="lg" onClick={() => alert("Button Clicked!")}>
        Click Me!
      </Button> */}

      {/* You can add more buttons with different variants */}
      <div className="flex gap-4 mt-4">
         <h1>Hi!</h1>
      </div>
    </main>
  );
}
