"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { useTranslations } from "next-intl";

interface Campaign {
  CampaignId: string | number;
  CampaignName: string;
  Impressions: number;
  Clicks: number;
  Spend: number;
}

interface MicrosoftAdsResultsSectionProps {
  results: {
    total_impressions: number;
    total_clicks: number;
    total_spend: number;
    campaigns?: Campaign[];
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
export default function MicrosoftAdsResultsSection({
  results,
  userInfo,
  queryInfo,
}: MicrosoftAdsResultsSectionProps) {
  const t = useTranslations("ResultsSection");

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
          // Added translated headers for Microsoft Ads
          translatedHeaders: {
            totals: {
              totalImpressions: t("totalImpressions"),
              totalClicks: t("totalClicks"),
              totalSpend: t("totalSpend"),
            },
            campaigns: {
              campaignId: t("campaignId"),
              campaignName: t("campaignName"),
              impressions: t("impressions"),
              clicks: t("clicks"),
              spend: t("spend"),
            },
          },
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
        <h3 className="text-xl font-bold mb-4">{t("results")}</h3>
        <div className="bg-white/10 rounded-lg p-6">
          <p>
            <strong>{t("totalImpressions")}</strong>{" "}
            {results?.total_impressions ?? 0}
          </p>
          <p>
            <strong>{t("totalClicks")}</strong> {results?.total_clicks ?? 0}
          </p>
          <p>
            <strong>{t("totalSpend")}</strong> {results?.total_spend ?? 0.0}
          </p>
        </div>
      </div>
      {results.campaigns && results.campaigns.length > 0 && (
        <div>
          <h3 className="text-xl font-bold mb-4">{t("campaignDetails")}</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-blue-200">
              <thead className="bg-[#47adbf]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("campaignId")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("campaignName")}
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
                </tr>
              </thead>
              <tbody className="bg-blue-50 divide-y divide-blue-200">
                {results.campaigns.map((c: Campaign, index: number) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {c.CampaignId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {c.CampaignName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {c.Impressions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {c.Clicks}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {c.Spend}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
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
