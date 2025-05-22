// File: components/Toolbar.tsx
"use client";

import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, RectangleHorizontal, Type, Eraser, MousePointer2 } from 'lucide-react';

interface ToolbarProps { }

export const Toolbar = ({ }: ToolbarProps) => {
    return (
        // --- Toolbar Container ---
        // w-full h-full: Fills the dimensions allocated by its parent in Room.tsx.
        // flex items-center: Arranges buttons horizontally, centered vertically.
        // gap-x-3: Adds horizontal space between buttons.
        // bg-white: Explicitly sets background (though parent already has it).
        // px-4: Provides internal horizontal padding for the content.
        <div className="w-full h-full flex items-center gap-x-3 bg-white px-4 shadow-sm">
            <div className='flex flex-col sm:flex-row items-center gap-y-2'>
                <Button variant="ghost" size="icon" aria-label="Select tool">
                    <MousePointer2 className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Pen tool">
                    <Pencil className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Shape tool">
                    <RectangleHorizontal className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Text tool">
                    <Type className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" aria-label="Eraser tool">
                    <Eraser className="h-5 w-5" />
                </Button>
            </div>

        </div>
    );
};