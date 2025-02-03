"use client";

import QueryForm from "@/components/query-form";
import TrackingDataResultsSection from "@/app/tracking-data/tracking-data-results-section";
import React, { useState } from "react";
import axios from "axios";
import { auth } from "@/lib/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";

/**
 *
 * @constructor
 */
export default function TrackingDataQueryForm() {
  const queryFields = {
    websiteURL: "Website URL",
  };

  const [results, setResults] = useState<Record<string, unknown>>({});
  const [showResults, setShowResults] = useState(false);
  const [queryName] = useState("Query Name");
  const [queryData, setQueryData] = useState<Record<string, unknown>>({});

  const [user] = useAuthState(auth);

  const handleAnalyze = async (queryData: {
    [key: string]: string | number | Date;
  }) => {
    if (queryData.websiteURL) {
      try {
        const response = await axios.post(
          "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/analyze_tracking_data_function",
          {
            url: queryData.websiteURL,
          },
        );
        console.log("Analysis result:", response.data);
        setShowResults(true);
        setResults(response.data);
        setQueryData(queryData);
      } catch (error) {
        console.error("Error analyzing website:", error);
      }
    }
  };

  return (
    <QueryForm
      service="Tracking Data"
      queryFields={queryFields}
      ResultsComponent={(props) => (
        <TrackingDataResultsSection
          {...props}
          userInfo={{
            name: user?.displayName || "User Name",
            email: user?.email || "user@example.com",
          }}
          queryInfo={{
            service: "Tracking Data",
            queryName: queryName,
            queryData: queryData,
          }}
        />
      )}
      onAnalyze={handleAnalyze}
      results={results}
      showResults={showResults}
    />
  );
}
