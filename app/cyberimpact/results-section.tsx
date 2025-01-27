"use client";

import { Button } from "@/components/ui/button";
import React from "react";

/**
 *
 * @constructor
 */
export default function ResultsSection() {
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
        <h3 className="text-xl font-bold mb-4">Results:</h3>
        <div className="bg-white/10 rounded-lg p-6">
          {/* This will be populated with actual results */}
          <p className="text-white/60">
            Results will appear here after analysis
          </p>
        </div>
      </div>
    </div>
  );
}
