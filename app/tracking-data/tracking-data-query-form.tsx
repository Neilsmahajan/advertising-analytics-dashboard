"use client";

import QueryForm from "@/components/query-form";
import TrackingDataResultsSection from "@/app/tracking-data/tracking-data-results-section";
import React, { useState } from "react";
import axios from "axios";

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
      } catch (error) {
        console.error("Error analyzing website:", error);
      }
    }
  };

  return (
    <QueryForm
      service="Tracking Data"
      queryFields={queryFields}
      ResultsComponent={TrackingDataResultsSection}
      onAnalyze={handleAnalyze}
      results={results}
      showResults={showResults}
    />
  );
}
