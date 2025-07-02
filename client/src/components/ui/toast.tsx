// toast.tsx
"use client";
import * as React from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { X } from "lucide-react";
import { cn } from "../../lib/utils";

export function Toast({ type = "success", message }: { type: string, message: string }) {
  return (
    <ToastPrimitives.Provider swipeDirection="right">
      <ToastPrimitives.Root className="bg-white border rounded-md shadow-md p-4">
        <div className="flex justify-between">
          <span className={type === "success" ? "text-green-600" : "text-red-600"}>
            {message}
          </span>
          <ToastPrimitives.Close>
            <X className="h-4 w-4 cursor-pointer" />
          </ToastPrimitives.Close>
        </div>
      </ToastPrimitives.Root>
      <ToastPrimitives.Viewport />
    </ToastPrimitives.Provider>
  );
}
