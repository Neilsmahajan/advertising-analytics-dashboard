"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { useTranslations, useLocale } from "next-intl";

interface MetaAdsResultsSectionProps {
  results: {
    data?: {
      campaign_id: string;
      campaign_name: string;
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
 * @param param0
 * @returns
 */
export default function MetaAdsResultsSection({
  results,
  userInfo,
  queryInfo,
}: MetaAdsResultsSectionProps) {
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
          // Added translated headers for Meta Ads
          translatedHeaders: {
            campaignId: t("campaignId"),
            campaignName: t("campaignName"),
            dateStart: t("dateStart"),
            dateStop: t("dateStop"),
            impressions: t("impressions"),
            clicks: t("clicks"),
            spend: t("spend"),
            uniqueClicks: t("uniqueClicks"),
            cpm: t("cpm"),
            reach: t("reach"),
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
        <div>
          {results.data ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-blue-200">
                <thead className="bg-[#47adbf]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("campaignId") || "Campaign ID"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("campaignName") || "Campaign Name"}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("dateStart")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("dateStop")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("impressions")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("clicks")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("spend")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("uniqueClicks")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("cpm")}
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                      {t("reach")}
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-blue-50 divide-y divide-blue-200">
                  {results.data.map((row, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.campaign_id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.campaign_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.date_start}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.date_stop}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.impressions}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.clicks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.spend}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.unique_clicks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.cpm}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                        {row.reach}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
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
          <pre className="text-white/60 whitespace-pre-wrap break-all">
            {JSON.stringify(queryInfo.queryData, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
}
