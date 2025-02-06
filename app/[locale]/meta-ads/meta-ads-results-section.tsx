"use client";

import ResultsSection from "@/components/results-section";
import React from "react";

interface MetaAdsResultsSectionProps {
  results: {
    data?: {
      date_start: string;
      date_stop: string;
      impressions: string;
      clicks: string;
      spend: string;
      unique_clicks: string;
      cpm: string;
      reach: string;
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
 * @param param0 
 * @returns 
 */
export default function MetaAdsResultsSection({
  results,
  userInfo,
  queryInfo,
}: MetaAdsResultsSectionProps) {
  const convertedResults = {
    ...results,
    data: results.data?.map((row) => ({
      ...row,
      impressions: parseInt(row.impressions),
      clicks: parseInt(row.clicks),
      spend: parseFloat(row.spend),
      unique_clicks: parseInt(row.unique_clicks),
      cpm: parseFloat(row.cpm),
      reach: parseInt(row.reach),
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
