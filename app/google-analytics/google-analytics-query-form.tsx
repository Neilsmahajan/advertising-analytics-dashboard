"use client";

import QueryForm from "@/components/query-form";
import GoogleAnalyticsResultsSection from "@/app/google-analytics/google-analytics-results-section";
import React, { useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

/**
 *
 * @constructor
 */
export default function GoogleAnalyticsQueryForm() {
  const queryFields = {
    propertyID: "Property ID",
    startDate: "Start Date",
    endDate: "End Date",
  };

  const [results, setResults] = useState<Record<string, unknown>>({});
  const [showResults, setShowResults] = useState(false);

  const [user] = useAuthState(auth);

  const handleAnalyze = async (queryData: {
    [key: string]: string | number | Date;
  }) => {
    if (queryData.propertyID && queryData.startDate && queryData.endDate) {
      try {
        const response = await axios.post(
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
      } catch (error) {
        console.error("Error analyzing Google Analytics data:", error);
      }
    }
  };

  return (
    <QueryForm
      service="Google Analytics"
      queryFields={queryFields}
      ResultsComponent={(props) => (
        <GoogleAnalyticsResultsSection
          {...props}
          userInfo={{ name: user?.displayName || "", email: user?.email || "" }}
          queryInfo={{ service: "Google Analytics", queryName: "Query Name", queryData: {} }}
        />
      )}
      onAnalyze={handleAnalyze}
      results={results}
      showResults={showResults}
    />
  );
}
