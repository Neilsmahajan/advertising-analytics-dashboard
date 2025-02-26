"use client";

import QueryForm from "@/components/query-form";
import GoogleAdsResultsSection from "./google-ads-results-section";
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
export default function GoogleAdsQueryForm() {
  const t = useTranslations("GoogleAdsQueryForm");
  const queryFields = {
    customerId: t("customerId"),
  };
  const [results, setResults] = useState<{
    average_cost: number;
    average_cpc: number;
    average_cpm: number;
    clicks: number;
    conversions: number;
    engagements: number;
  }>({
    average_cost: 0,
    average_cpc: 0,
    average_cpm: 0,
    clicks: 0,
    conversions: 0,
    engagements: 0,
  });
  const [showResults, setShowResults] = useState(false);
  const [queryName] = useState("Query Name");
  const [queryData, setQueryData] = useState<Record<string, unknown>>({});
  const [user] = useAuthState(auth);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  let passthrough_val = "";

  const handleAnalyze = async (queryData: {
    [key: string]: string | number | Date;
  }) => {
    if (queryData.customerId) {
      try {
        const response = await axios.post(
          "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/analyze_google_ads_function",
          // "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/analyze_google_ads_function",
          {
            customerId: queryData.customerId,
            currentUrl: window.location.href,
            passthrough_val: passthrough_val,
          },
        );
        console.log("Analysis result:", response.data);
        setShowResults(true);
        setResults(response.data);
        setQueryData(queryData);
      } catch (error) {
        console.error("Error analyzing Google Ads data:", error);
      }
    }
  };

  const handleAuthenticate = async () => {
    try {
      const response = await axios.post(
        "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/authenticate_google_ads_function",
        // "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/authenticate_google_ads_function",
        {},
      );
      console.log(
        "Redirecting to Google Ads authentication page:",
        response.data.url,
      );
      passthrough_val = response.data.passthroughVal;
      window.open(response.data.url, "_blank");
    } catch (error) {
      console.error("Error during Google Ads authentication:", error);
    }
  };

  return (
    <div>
      {!code ? (
        <Button
          onClick={handleAuthenticate}
          className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
        >
          {t("connectWithGoogleAds")}
        </Button>
      ) : (
        <QueryForm
          service="Google Ads"
          queryFields={queryFields}
          ResultsComponent={(props) => (
            <GoogleAdsResultsSection
              {...props}
              userInfo={{
                name: user?.displayName || "",
                email: user?.email || "",
              }}
              queryInfo={{ service: "Google Ads", queryName, queryData }}
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
