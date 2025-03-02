"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { useTranslations, useLocale } from "next-intl";

interface GoogleAnalyticsResultsSectionProps {
  results: {
    rows?: {
      date: string;
      sessions: number;
      bounceRate: number;
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
 * @param param0
 * @returns
 */
export default function GoogleAnalyticsResultsSection({
  results,
  userInfo,
  queryInfo,
}: GoogleAnalyticsResultsSectionProps) {
  const t = useTranslations("ResultsSection");
  const locale = useLocale();

  const handleDownloadReport = async () => {
    try {
      const response = await axios.post(
        "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/generate_report_function",
        // "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/generate_report_function",
        {
          userInfo,
          queryInfo,
          results,
          service: queryInfo.service,
          // Add translated headers for French localization
          translatedHeaders: {
            date: t("date"),
            sessions: t("sessions"),
            bounceRate: t("bouceRate"),
            keyEvents: t("keyEvents"),
          },
          locale,
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
          {t("downloadReport")}
        </Button>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4"></h3>
        <div className="bg-white/10 rounded-lg p-6">
          {results.rows ? (
            <table className="min-w-full bg-white/10 text-white/60">
              <thead>
                <tr>
                  <th className="py-2 px-4 border-b border-gray-200">
                    {t("date")}
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    {t("sessions")}
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    {t("bouceRate")}
                  </th>
                  <th className="py-2 px-4 border-b border-gray-200">
                    {t("keyEvents")}
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
          ) : (
            <p className="text-white/60">{t("resultsWillAppear")}</p>
          )}
        </div>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4">{t("queryInformation")}</h3>
        <div className="bg-white/10 rounded-lg p-6">
          <p>
            <strong>{t("service")}</strong> {queryInfo.service}
          </p>
          <p>
            <strong>{t("queryName")}</strong> {queryInfo.queryName}
          </p>
          <p>
            <strong>{t("queryData")}</strong>
          </p>
          <pre className="text-white/60">
            {JSON.stringify(queryInfo.queryData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
