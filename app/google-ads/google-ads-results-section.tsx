import React from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface GoogleAdsResultsSectionProps {
  results: {
    average_cost?: number;
    average_cpc?: number;
    average_cpm?: number;
    clicks?: number;
    conversions?: number;
    engagements?: number;
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
export default function GoogleAdsResultsSection({
  results,
  userInfo,
  queryInfo,
}: GoogleAdsResultsSectionProps) {
  const handleDownloadReport = async () => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/generate_report_function",
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
          {results ? (
            <table className="min-w-full bg-white/10 text-white/60">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Average Cost
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Average CPC
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Average CPM
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">Clicks</th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Conversions
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    Engagements
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {results.average_cost}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {results.average_cpc}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {results.average_cpm}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {results.clicks}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {results.conversions}
                  </td>
                  <td className="py-2 px-4 border-b border-gray-200">
                    {results.engagements}
                  </td>
                </tr>
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
