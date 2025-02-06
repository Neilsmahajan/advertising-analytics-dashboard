import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

/**
 *
 * @returns
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        <Skeleton className="h-12 w-48 bg-white/20 mb-4" />
        <Skeleton className="h-6 w-72 bg-white/20 mb-12" />

        {/* Profile Information Section */}
        <div className="mb-12">
          <Skeleton className="h-8 w-40 bg-white/20 mb-6" />
          <div className="space-y-4">
            <Skeleton className="h-12 w-full max-w-md bg-white/20" />
            <Skeleton className="h-12 w-full max-w-md bg-white/20" />
            <Skeleton className="h-10 w-24 bg-white/20 mt-4" />
          </div>
        </div>

        {/* Saved Queries Section */}
        <div>
          <Skeleton className="h-8 w-40 bg-white/20 mb-6" />
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-12 w-full bg-white/20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
