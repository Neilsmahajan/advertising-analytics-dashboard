"use client";

import ResultsSection from "@/components/results-section";
import React from "react";

interface TrackingDataResultsSectionProps {
  results: {
    analytics_tags?: string[];
    message?: string;
  };
  userInfo: {
    name: string;
    email: string;
  };
  queryInfo: {
    service: string;
    queryName: string;
    queryData: Record<string, unknown>;
  };
}

/**
 *
 * @param param0
 * @returns
 */
export default function TrackingDataResultsSection({
  results,
  userInfo,
  queryInfo,
}: TrackingDataResultsSectionProps) {
  return (
    <ResultsSection
      results={results}
      userInfo={userInfo}
      queryInfo={queryInfo}
    />
  );
}
