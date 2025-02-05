"use client";

import QueryForm from "@/components/query-form";
import GoogleAdsResultsSection from "@/app/google-ads/google-ads-results-section";
import React, { useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

/**
 *
 * @constructor
 */
export default function GoogleAdsQueryForm() {
  const queryFields = {
    customerId: "Customer ID",
    startDate: "Start Date",
    endDate: "End Date",
  };

  const [results, setResults] = useState<Record<string, unknown>>({});
  const [showResults, setShowResults] = useState(false);
  const [queryName] = useState("Query Name");
  const [queryData, setQueryData] = useState<Record<string, unknown>>({});

  const [user] = useAuthState(auth);

  const handleAnalyze = async (queryData: {
    [key: string]: string | number | Date;
  }) => {
    if (queryData.customerId && queryData.startDate && queryData.endDate) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/analyze_google_ads_function",
          {
            customerId: queryData.customerId,
            startDate: queryData.startDate,
            endDate: queryData.endDate,
          },
        );
        console.log("Analysis result:", response.data);
        setShowResults(true);
        setResults(response.data);
        setQueryData(queryData);
      } catch (error) {
        if (
          axios.isAxiosError(error) &&
          error.response &&
          error.response.status === 500
        ) {
          console.error("Error analyzing Google Ads data:", error);
          alert(
            "Please complete the OAuth2 flow by clicking the link in the terminal and try again.",
          );
        } else {
          console.error("Error analyzing Google Ads data:", error);
        }
      }
    }
  };

  return (
    <QueryForm
      service="Google Ads"
      queryFields={queryFields}
      ResultsComponent={(props) => (
        <GoogleAdsResultsSection
          {...props}
          userInfo={{ name: user?.displayName || "", email: user?.email || "" }}
          queryInfo={{ service: "Google Ads", queryName, queryData }}
        />
      )}
      onAnalyze={handleAnalyze}
      results={results}
      showResults={showResults}
    />
  );
}
