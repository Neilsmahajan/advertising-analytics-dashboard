"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { useTranslations } from "next-intl";

interface GoogleAdsResultsSectionProps {
  results: {
    average_cost: number;
    average_cpc: number;
    average_cpm: number;
    clicks: number;
    conversions: number;
    engagements: number;
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
export default function GoogleAdsResultsSection({
  results,
  userInfo,
  queryInfo,
}: GoogleAdsResultsSectionProps) {
  const t = useTranslations("ResultsSection");

  const handleDownloadReport = async () => {
    try {
      const response = await axios.post(
        // "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/generate_report_function",
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
          {t("downloadReport")}
        </Button>
      </div>
      <div>
        <h3 className="text-xl font-bold mb-4"></h3>
        <div className="bg-white/10 rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4">{t("results")}</h3>
          <div className="bg-white/10 rounded-lg p-6">
            <p>
              <strong>{t("averageCost")}</strong> {results?.average_cost ?? 0}
            </p>
            <p>
              <strong>{t("averageCpc")}</strong> {results?.average_cpc ?? 0}
            </p>
            <p>
              <strong>{t("averageCpm")}</strong> {results?.average_cpm ?? 0.0}
            </p>
            <p>
              <strong>{t("clicks")}</strong> {results?.clicks ?? 0.0}
            </p>
            <p>
              <strong>{t("conversions")}</strong> {results?.conversions ?? 0.0}
            </p>
            <p>
              <strong>{t("engagements")}</strong> {results?.engagements ?? 0.0}
            </p>
          </div>
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
