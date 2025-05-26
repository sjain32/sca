// File: components/Toolbar.tsx
"use client";
import { Tool } from './Whiteboard';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, RectangleHorizontal, Type, Eraser, MousePointer2, Circle } from 'lucide-react';

interface ToolbarProps {
    activeTool: Tool;
    setActiveTool: React.Dispatch<React.SetStateAction<Tool>>;
    onUndo: () => void;
    onRedo: () => void;
}
export const Toolbar = ({ }: ToolbarProps) => {
    return (
        
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
                <Button variant="ghost" size="icon" aria-label="Shape tool">
                    <Circle className="h-5 w-5" />
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