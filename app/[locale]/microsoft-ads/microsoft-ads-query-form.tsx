"use client";

import QueryForm from "@/components/query-form";
import MicrosoftAdsResultsSection from "@/app/[locale]/microsoft-ads/microsoft-ads-results-section";
import React, { useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 *
 * @returns
 */
export default function MicrosoftAdsQueryForm() {
  const t = useTranslations("MicrosoftAdsQueryForm");
  const queryFields = {
    accountId: t("accountId"),
    customerId: t("customerId"),
  };

  const [results, setResults] = useState<{
    total_impressions: number;
    total_clicks: number;
    total_spend: number;
  }>({
    total_impressions: 0,
    total_clicks: 0,
    total_spend: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const [queryName] = useState("Query Name");
  const [queryData, setQueryData] = useState<Record<string, unknown>>({});
  const [user] = useAuthState(auth);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const handleAnalyze = async (queryData: {
    [key: string]: string | number | Date;
  }) => {
    if (queryData.accountId && queryData.customerId) {
      try {
        const response = await axios.post(
          "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/analyze_microsoft_ads_function",
          // "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/analyze_microsoft_ads_function",
          {
            accountId: queryData.accountId,
            customerId: queryData.customerId,
            currentUrl: window.location.href,
          },
        );
        console.log("Analysis result:", response.data);
        setShowResults(true);
        setResults(response.data);
        setQueryData(queryData);
      } catch (error) {
        console.error("Error analyzing Microsoft Ads data:", error);
      }
    }
  };

  const handleAuthenticate = async () => {
    try {
      const response = await axios.post(
        "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/authenticate_microsoft_ads_function",
        // "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/authenticate_microsoft_ads_function",
        {},
      );
      console.log(
        "Redirecting to Microsoft Ads authentication page:",
        response.data.url,
      );
      window.open(response.data.url, "_blank");
    } catch (error) {
      console.error("Error during Microsoft Ads authentication:", error);
    }
  };

  return (
    <div>
      {!code ? (
        <Button
          onClick={handleAuthenticate}
          className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
        >
          Connect with Microsoft Ads
        </Button>
      ) : (
        <QueryForm
          service="Microsoft Ads"
          queryFields={queryFields}
          ResultsComponent={(props) => (
            <MicrosoftAdsResultsSection
              {...props}
              userInfo={{
                name: user?.displayName || "",
                email: user?.email || "",
              }}
              queryInfo={{ service: "Microsoft Ads", queryName, queryData }}
              results={results}
            />
          )}
          onAnalyze={handleAnalyze}
          results={results}
          showResults={showResults}
        />
      )}
    </div>
  );
}
