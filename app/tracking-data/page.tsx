"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CollapsibleSection from "@/components/collapsible-section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function TrackingDataPage() {
  const [queryName, setQueryName] = useState("")
  const [websiteUrl, setWebsiteUrl] = useState("")
  const [selectedQuery, setSelectedQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleQuerySelect = (value: string) => {
    setSelectedQuery(value)
    if (value === "new") {
      setQueryName("")
      setWebsiteUrl("")
    } else {
      // This will be replaced with actual Firebase data fetching
      console.log("Fetching query:", value)
    }
  }

  const handleAnalyze = () => {
    if (websiteUrl) {
      setShowResults(true)
      // This will be replaced with actual analysis logic
      console.log("Analyzing website:", websiteUrl)
    }
  }

  const handleSaveQuery = () => {
    // This will be replaced with actual Firebase save logic
    console.log("Saving query:", { queryName, websiteUrl })
  }

  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">FIND ANALYTICS AND TRACKING DATA</h1>

        {/* Instructions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-lg mb-6">
            Enter your website URL to find all of the Analytics and Tracking tags on your website.
          </p>

          {/* Tutorial Section */}
          <CollapsibleSection title="VIEW TUTORIAL">
            <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/xh9EpVkA2QY"
                title="Tracking Data Tutorial"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CollapsibleSection>
        </section>

        {/* Query Form Section */}
        <section className="space-y-6 max-w-4xl">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Previous Queries</label>
              <Select onValueChange={handleQuerySelect}>
                <SelectTrigger className="bg-white/20 border-none text-white">
                  <SelectValue placeholder="Select a previous query or create new" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New Query</SelectItem>
                  {/* This will be populated with Firebase data */}
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
                <Button onClick={handleSaveQuery} className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white">
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
                <Button onClick={handleAnalyze} className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white">
                  ANALYZE WEBSITE
                </Button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          {showResults && (
            <div className="space-y-6">
              <div className="flex gap-4">
                <Button className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white">DOWNLOAD REPORT</Button>
                <Button className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white">EMAIL REPORT</Button>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Analytics And Tracking Tags Found:</h3>
                <div className="bg-white/10 rounded-lg p-6">
                  {/* This will be populated with actual results */}
                  <p className="text-white/60">Results will appear here after analysis</p>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

