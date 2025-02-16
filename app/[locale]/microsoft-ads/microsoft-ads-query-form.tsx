"use client";

import QueryForm from "@/components/query-form";
import MicrosoftAdsResultsSection from "@/app/[locale]/microsoft-ads/microsoft-ads-results-section";
import React, { useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslations } from "next-intl";

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

  const [results, setResults] = useState<Record<string, unknown>>({});
  const [showResults, setShowResults] = useState(false);
  const [queryName] = useState("Query Name");
  const [queryData, setQueryData] = useState<Record<string, unknown>>({});

  const [user] = useAuthState(auth);

  const handleAnalyze = async (queryData: {
    [key: string]: string | number | Date;
  }) => {
    if (queryData.accountId && queryData.customerId) {
      try {
        const response = await axios.post(
          "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/analyze_microsoft_ads_function",
          {
            accountId: queryData.accountId,
            customerId: queryData.customerId,
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

  return (
    <QueryForm
      service="Microsoft Ads"
      queryFields={queryFields}
      ResultsComponent={(props) => (
        <MicrosoftAdsResultsSection
          {...props}
          userInfo={{ name: user?.displayName || "", email: user?.email || "" }}
          queryInfo={{ service: "Meta Ads", queryName, queryData }}
        />
      )}
      onAnalyze={handleAnalyze}
      results={results}
      showResults={showResults}
    />
  );
}
