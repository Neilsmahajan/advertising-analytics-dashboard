"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import axios from "axios";
import { useTranslations, useLocale } from "next-intl";

interface Campaign {
  id: string | number;
  name: string;
  average_cost: number;
  average_cpc: number;
  average_cpm: number;
  clicks: number;
  conversions: number;
  engagements: number;
}

interface GoogleAdsResultsSectionProps {
  results: { campaigns: Campaign[] };
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
          // Added translated headers for Google Ads
          translatedHeaders: {
            campaignId: t("campaignId"),
            campaignName: t("campaignName"),
            averageCost: t("averageCost"),
            averageCpc: t("averageCpc"),
            averageCpm: t("averageCpm"),
            clicks: t("clicks"),
            conversions: t("conversions"),
            engagements: t("engagements"),
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
        <h3 className="text-xl font-bold mb-4">{t("results")}</h3>
        <div className="bg-white/10 rounded-lg p-6">
          {results.campaigns && results.campaigns.length > 0 ? (
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
                    {t("averageCost")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("averageCpc")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("averageCpm")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("clicks")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("conversions")}
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">
                    {t("engagements")}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-blue-50 divide-y divide-blue-200">
                {results.campaigns.map((campaign: Campaign) => (
                  <tr key={campaign.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {campaign.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {campaign.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {Number(campaign.average_cost).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {Number(campaign.average_cpc).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {Number(campaign.average_cpm).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {Number(campaign.clicks).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {Number(campaign.conversions).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-900">
                      {Number(campaign.engagements).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>{t("noResultsFound")}</p>
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
