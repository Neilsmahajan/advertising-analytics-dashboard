"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";

interface ResultsSectionProps {
  results: {
    rows?: {
      date: string;
      sessions: number;
      bounceRate: number;
      keyEvents: string;
    }[];
    analytics_tags?: string[];
    data?: {
      date_start: string;
      date_stop: string;
      impressions: number;
      clicks: number;
      spend: number;
      unique_clicks: number;
      cpm: number;
      reach: number;
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
export default function ResultsSection({
  results,
  userInfo,
  queryInfo,
}: ResultsSectionProps) {
  const handleDownloadReport = async () => {
    try {
      const response = await axios.post(
        "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/generate_report_function",
        {
          userInfo,
          queryInfo,
          results,
          service: queryInfo.service,
        },
        { responseType: "blob" },
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
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Results:</h3>
        <div className="bg-white/10 rounded-lg p-6">
          {queryInfo.service === "Google Analytics" && results.rows ? (
            <table className="min-w-full bg-white/10 text-white/60">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">Date</th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Sessions
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Bounce Rate
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Key Events
                  </th>
                </tr>
              </thead>
              <tbody>
                {results.rows.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.date}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.sessions}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.bounceRate}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.keyEvents}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : queryInfo.service === "Tracking Data" &&
            results.analytics_tags ? (
            <ul className="list-disc list-inside text-white/60">
              {results.analytics_tags.map((tag: string, index: number) => (
                <li key={index}>{tag}</li>
              ))}
            </ul>
          ) : queryInfo.service === "Meta Ads" && results.data ? (
            <table className="min-w-full bg-white/10 text-white/60">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Date Start
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Date Stop
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Impressions
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">Clicks</th>
                  <th className="py-2 px-4 border-b border-gray-200">Spend</th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Unique Clicks
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">CPM</th>
                  <th className="py-2 px-4 border-b border-gray-200">Reach</th>
                </tr>
              </thead>
              <tbody>
                {results.data.map((row, index) => (
                  <tr key={index}>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.date_start}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.date_stop}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.impressions}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.clicks}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.spend}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.unique_clicks}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.cpm}
                    </td>
                    <td className="py-2 px-4 border-b border-gray-200">
                      {row.reach}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-white/60">
              Results will appear here after analysis
            </p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">Query Information:</h3>
        <div className="bg-white/10 rounded-lg p-6">
          <p>
            <strong>Service:</strong> {queryInfo.service}
          </p>
          <p>
            <strong>Query Name:</strong> {queryInfo.queryName}
          </p>
          <p>
            <strong>Query Data:</strong>
          </p>
          <pre className="text-white/60">
            {JSON.stringify(queryInfo.queryData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
