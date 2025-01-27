"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResultsSection from "@/app/tracking-data/results-section";
import React from "react";

/**
 *
 * @constructor
 */
export default function QueryForm() {
  const [queryName, setQueryName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [, setSelectedQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleQuerySelect = (value: string) => {
    setSelectedQuery(value);
    if (value === "new") {
      setQueryName("");
      setWebsiteUrl("");
    } else {
      console.log("Fetching query:", value);
    }
  };

  const handleAnalyze = () => {
    if (websiteUrl) {
      setShowResults(true);
      console.log("Analyzing website:", websiteUrl);
    }
  };

  const handleSaveQuery = () => {
    console.log("Saving query:", { queryName, websiteUrl });
  };

  return (
    <section className="space-y-6 max-w-4xl">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">
            Previous Queries
          </label>
          <Select onValueChange={handleQuerySelect}>
            <SelectTrigger className="bg-white/20 border-none text-white">
              <SelectValue placeholder="Select a previous query or create new" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New Query</SelectItem>
              <SelectItem value="example1">Example Query 1</SelectItem>
              <SelectItem value="example2">Example Query 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Query Name</label>
          <div className="flex gap-4">
            <Input
              type="text"
              placeholder="Enter query name"
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              className="bg-white/20 border-none text-white placeholder:text-white/60"
            />
            <Button
              onClick={handleSaveQuery}
              className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
            >
              SAVE QUERY
            </Button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Website URL</label>
          <div className="flex gap-4">
            <Input
              type="url"
              placeholder="Enter website URL"
              value={websiteUrl}
              onChange={(e) => setWebsiteUrl(e.target.value)}
              className="bg-white/20 border-none text-white placeholder:text-white/60"
            />
            <Button
              onClick={handleAnalyze}
              className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
            >
              ANALYZE WEBSITE
            </Button>
          </div>
        </div>
      </div>
      {showResults && <ResultsSection />}
    </section>
  );
}
