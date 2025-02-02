"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";

interface GoogleAnalyticsResultsSectionProps {
  results: {
    rows?: {
      date: string;
      sessions: string;
      bounceRate: string;
      keyEvents: string;
    }[];
  };
  userInfo: {
    name: string;
    email: string;
  };
  queryInfo: {
    service: string;
    queryName: string;
    queryData: Record<string, unknown>;
  };
}

/**
 *
 * @constructor
 */
export default function GoogleAnalyticsResultsSection({
  results,
  userInfo,
  queryInfo,
}: GoogleAnalyticsResultsSectionProps) {
  const handleDownloadReport = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/generate_report_function",
        {
          userInfo,
          queryInfo,
          results,
        },
        { responseType: "blob" }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "report.pdf");
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Button
          className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
          onClick={handleDownloadReport}
        >
          DOWNLOAD REPORT
        </Button>
        <Button className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white">
          EMAIL REPORT
        </Button>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Google Analytics Results:</h3>
        <div className="bg-white/10 rounded-lg p-6">
          {results && results.rows ? (
            <ul className="list-disc list-inside text-white/60">
              {results.rows.map((row, index) => (
                <li key={index}>
                  Date: {row.date}, Sessions: {row.sessions}, Bounce Rate: {row.bounceRate}, Key Events: {row.keyEvents}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white/60">
              Results will appear here after analysis
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
