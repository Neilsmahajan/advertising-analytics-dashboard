"use client";

import QueryForm from "@/components/query-form";
import GoogleAdsResultsSection from "./google-ads-results-section";
import React, { useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslations } from "next-intl";
import { useSearchParams, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 *
 * @returns
 */
export default function GoogleAdsQueryForm() {
  const t = useTranslations("GoogleAdsQueryForm");
  const { locale } = useParams();
  const queryFields = {
    customerId: t("customerId"),
    startDate: t("startDate"),
    endDate: t("endDate"),
  };
  const [results, setResults] = useState<{
    campaigns: {
      id: string | number;
      name: string;
      average_cost: number;
      average_cpc: number;
      average_cpm: number;
      clicks: number;
      conversions: number;
      engagements: number;
    }[];
  }>({
    campaigns: [],
  });
  const [showResults, setShowResults] = useState(false);
  const [queryName] = useState("Query Name");
  const [queryData, setQueryData] = useState<Record<string, unknown>>({});
  const [user] = useAuthState(auth);
  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  const [isLoading, setIsLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);

  const handleAnalyze = async (queryData: {
    [key: string]: string | number | Date;
  }) => {
    if (!queryData.customerId || !queryData.startDate || !queryData.endDate) {
      alert(
        "Please fill in all required fields: Customer ID, Start Date, End Date.",
      );
      return;
    }
    if (queryData.startDate > queryData.endDate) {
      alert("Start date must be before end date.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/analyze_google_ads_function",
        // "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/analyze_google_ads_function",
        {
          customerId: queryData.customerId,
          startDate: queryData.startDate,
          endDate: queryData.endDate,
          currentUrl: window.location.href,
          lang: locale, // <-- add language parameter
        },
      );
      console.log("Analysis result:", response.data);
      setResults({
        ...response.data,
        campaigns: response.data.campaigns || [],
      });
      setQueryData(queryData);
      setShowResults(true);
    } catch (error) {
      console.error("Error analyzing Google Ads data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthenticate = async () => {
    try {
      setAuthLoading(true);
      const response = await axios.post(
        "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/authenticate_google_ads_function",
        // "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/authenticate_google_ads_function",
        {
          lang: locale, // <-- add language parameter
        },
      );
      console.log(
        "Redirecting to Google Ads authentication page:",
        response.data.url,
      );
      window.open(response.data.url, "_blank");
    } catch (error) {
      console.error("Error during Google Ads authentication:", error);
    } finally {
      setAuthLoading(false);
    }
  };

  return (
    <div>
      {!code ? (
        <>
          <Button
            onClick={handleAuthenticate}
            className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
          >
            {t("connectWithGoogleAds")}
          </Button>
          {authLoading && <p>{t("loading") || "Loading..."}</p>}
        </>
      ) : (
        <>
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
          {isLoading && <p>{t("loading") || "Loading..."}</p>}
        </>
      )}
    </div>
  );
}
