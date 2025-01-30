import QueryForm from "@/components/query-form";
import ResultsSection from "@/app/google-analytics/results-section";
import React from "react";

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

  return (
    <QueryForm
      service="Google Analytics"
      queryFields={queryFields}
      ResultsComponent={ResultsSection}
      onAnalyze={() => {}}
      results={{}}
      showResults={false}
    />
  );
}
