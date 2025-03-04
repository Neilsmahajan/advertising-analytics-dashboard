"use client";

import QueryForm from "@/components/query-form";
import GoogleAnalyticsResultsSection from "@/app/[locale]/google-analytics/google-analytics-results-section";
import React, { useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function GoogleAnalyticsQueryForm() {
  const t = useTranslations("GoogleAnalyticsQueryForm");
  const queryFields = {
    propertyID: t("propertyId"),
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
    if (!queryData.propertyID || !queryData.startDate || !queryData.endDate) {
      alert(
        "Please fill in all required fields: Property ID, Start Date, End Date.",
      );
    }
    if (queryData.startDate > queryData.endDate) {
      alert("Start date must be before end date.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(
        // "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/analyze_google_analytics_function",
        "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/analyze_google_analytics_function",
        {
          propertyId: queryData.propertyID,
          startDate: queryData.startDate,
          endDate: queryData.endDate,
        },
      );
      console.log("Analysis result:", response.data);
      setShowResults(true);
      setResults(response.data);
      setQueryData(queryData);
    } catch (error) {
      console.error("Error analyzing Google Analytics data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <QueryForm
        service="Google Analytics"
        queryFields={queryFields}
        ResultsComponent={(props) => (
          <GoogleAnalyticsResultsSection
            {...props}
            userInfo={{
              name: user?.displayName || "",
              email: user?.email || "",
            }}
            queryInfo={{ service: "Google Analytics", queryName, queryData }}
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
