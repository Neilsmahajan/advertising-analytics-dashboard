"use client";

import QueryForm from "@/components/query-form";
import MetaAdsResultsSection from "@/app/[locale]/meta-ads/meta-ads-results-section";
import React, { useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function MetaAdsQueryForm() {
  const t = useTranslations("MetaAdsQueryForm");
  const queryFields = {
    adAccountId: t("adAccountId"),
    accessToken: t("accessToken"),
    startDate: t("startDate"),
    endDate: t("endDate"),
  };

  const [results, setResults] = useState<Record<string, unknown>>({});
  const [showResults, setShowResults] = useState(false);
  const [queryName] = useState("Query Name");
  const [queryData, setQueryData] = useState<Record<string, unknown>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [user] = useAuthState(auth);

  const handleAnalyze = async (queryData: {
    [key: string]: string | number | Date;
  }) => {
    if (
      queryData.adAccountId &&
      queryData.accessToken &&
      queryData.startDate &&
      queryData.endDate
    ) {
      try {
        setIsLoading(true);
        const response = await axios.post(
          "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/analyze_meta_ads_function",
          // "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/analyze_meta_ads_function",
          {
            adAccountId: queryData.adAccountId,
            accessToken: queryData.accessToken,
            startDate: queryData.startDate,
            endDate: queryData.endDate,
          },
        );
        console.log("Analysis result:", response.data);
        setShowResults(true);
        setResults(response.data);
        setQueryData(queryData);
      } catch (error) {
        console.error("Error analyzing Meta Ads data:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      <QueryForm
        service="Meta Ads"
        queryFields={queryFields}
        ResultsComponent={(props) => (
          <MetaAdsResultsSection
            {...props}
            userInfo={{
              name: user?.displayName || "",
              email: user?.email || "",
            }}
            queryInfo={{ service: "Meta Ads", queryName, queryData }}
          />
        )}
        onAnalyze={handleAnalyze}
        results={results}
        showResults={showResults}
      />
      {isLoading && <p>{t("loading") || "Loading..."}</p>}
    </>
  );
}
