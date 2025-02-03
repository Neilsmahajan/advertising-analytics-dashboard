"use client";

import ResultsSection from "@/components/results-section";
import React from "react";

interface GoogleAnalyticsResultsSectionProps {
  results: {
    rows?: {
      date: string;
      sessions: string;
      bounceRate: string;
      keyEvents: string;
    }[];
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
 * @constructor
 */
export default function GoogleAnalyticsResultsSection({
  results,
  userInfo,
  queryInfo,
}: GoogleAnalyticsResultsSectionProps) {
  const convertedResults = {
    ...results,
    rows: results.rows?.map(row => ({
      ...row,
      sessions: parseFloat(row.sessions),
      bounceRate: parseFloat(row.bounceRate),
    })),
  };

  return (
    <ResultsSection
      results={convertedResults}
      userInfo={userInfo}
      queryInfo={queryInfo}
    />
  );
}
