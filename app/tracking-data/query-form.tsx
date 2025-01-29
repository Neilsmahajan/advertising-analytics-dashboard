import QueryForm from "@/components/query-form";
import ResultsSection from "@/app/tracking-data/results-section";
import React from "react";

/**
 *
 * @constructor
 */
export default function TrackingDataQueryForm() {
  const queryFields = {
    websiteURL: "Website URL",
  };

  return (
    <QueryForm
      service="Tracking Data"
      queryFields={queryFields}
      ResultsComponent={ResultsSection}
    />
  );
}
