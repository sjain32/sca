// File: components/Whiteboard.tsx

"use client";

// Import useRef and useEffect
import React, { useRef, useEffect } from 'react';
// Import Fabric.js
import { fabric } from 'fabric';

interface WhiteboardProps {
  // Currently no props needed
}

/**
 * Whiteboard Component
 *
 * Initializes Fabric.js, stores the instance, and configures
 * initial canvas properties like width, height, and background color.
 */
export const Whiteboard = ({}: WhiteboardProps) => {
  // Ref for the HTML canvas element itself
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Ref to store the Fabric.js Canvas instance
  const fabricRef = useRef<fabric.Canvas | null>(null);

  useEffect(() => {
    const canvasElement = canvasRef.current;
    // Ensure canvas element exists and fabric instance isn't already initialized
    if (canvasElement && !fabricRef.current) {

      // Get the dimensions of the parent container (<main> element)
      // offsetWidth and offsetHeight provide the layout dimensions including padding and border.
      const container = canvasElement.parentElement;
      const initialWidth = container?.offsetWidth || 500; // Fallback width
      const initialHeight = container?.offsetHeight || 500; // Fallback height

      // --- Initialize Fabric Canvas ---\
      const canvas = new fabric.Canvas(canvasElement, {
        // We don't set width/height here anymore, we'll set it via methods below
        // backgroundColor: '#f0f0f0', // Can still set it here, or below
      });

      // --- Configure Canvas Properties ---
      // Set the background color using the Fabric API
      canvas.setBackgroundColor('#FFFFFF', canvas.renderAll.bind(canvas)); // Use white background, re-render after setting

      // Set the dimensions of the Fabric canvas drawing buffer
      canvas.setWidth(initialWidth);
      canvas.setHeight(initialHeight);

      // Tell Fabric.js to re-render the canvas with the new dimensions and background
      // Although setBackgroundColor calls renderAll, setting width/height might not automatically.
      // It's good practice to call renderAll after property changes.
      canvas.renderAll();

      // --- Store the instance in the ref ---
      fabricRef.current = canvas;

      console.log(`Fabric.js canvas initialized. Dimensions: ${initialWidth}x${initialHeight}`);

      // TODO: Implement dynamic resizing on window resize
      // TODO: Add event listeners

      // --- Cleanup Function ---
      return () => {
        console.log("Disposing Fabric.js canvas instance and clearing ref");
        const currentFabricCanvas = fabricRef.current;
        if (currentFabricCanvas) {
          currentFabricCanvas.dispose();
          fabricRef.current = null;
        }
      };
    }
  }, []); // Run only on mount

  return (
    // The parent <main> element provides the size context for the canvas
    <main className="relative w-full h-full bg-neutral-100 touch-none">
      <canvas
        ref={canvasRef}
        id="canvas"
        className="w-full h-full" // CSS handles layout size
        // width/height attributes are now controlled by Fabric.js
      />
    </main>
  );
};