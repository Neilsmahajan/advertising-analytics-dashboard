"use client";

import { Button } from "@/components/ui/button";
import React from "react";

interface TrackingDataResultsSectionProps {
  results: {
    analytics_tags?: string[];
    message?: string;
  };
}

/**
 *
 * @constructor
 */
export default function TrackingDataResultsSection({
  results,
}: TrackingDataResultsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white">
          DOWNLOAD REPORT
        </Button>
        <Button className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white">
          EMAIL REPORT
        </Button>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">
          Analytics And Tracking Tags Found:
        </h3>
        <div className="bg-white/10 rounded-lg p-6">
          {results && results.analytics_tags ? (
            <ul className="list-disc list-inside text-white/60">
              {results.analytics_tags.map((tag: string, index: number) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          ) : (
            <p className="text-white/60">
              {results && results.message
                ? results.message
                : "Results will appear here after analysis"}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
