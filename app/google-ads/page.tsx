"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CollapsibleSection } from "@/components/collapsible-section"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function GoogleAdsPage() {
  const [queryName, setQueryName] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [selectedQuery, setSelectedQuery] = useState("")
  const [showResults, setShowResults] = useState(false)

  const handleQuerySelect = (value: string) => {
    setSelectedQuery(value)
    if (value === "new") {
      setQueryName("")
      setCustomerId("")
      setStartDate("")
      setEndDate("")
    } else {
      // This will be replaced with actual Firebase data fetching
      console.log("Fetching query:", value)
    }
  }

  const handleGetData = () => {
    if (customerId && startDate && endDate) {
      setShowResults(true)
      // This will be replaced with actual analysis logic
      console.log("Fetching data:", { customerId, startDate, endDate })
    }
  }

  const handleSaveQuery = () => {
    // This will be replaced with actual Firebase save logic
    console.log("Saving query:", { queryName, customerId, startDate, endDate })
  }

  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">GOOGLE ADS</h1>

        {/* Instructions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-lg mb-6">Follow These Steps To Use This Application With Your Google Ads Data:</p>
          <ol className="space-y-4 list-decimal pl-6">
            <li>Go to your Google Ads Dashboard</li>
            <li>Log in and select your Google Ads Account</li>
            <li>
              Get your Customer ID from the top right (e.g., 683-961-6266) for the account that you would like to fetch
              data from
            </li>
            <li>Enter your customer ID below, along with the desired date range, and click Get Data.</li>
          </ol>

          {/* Tutorial Section */}
          <div className="mt-8">
            <CollapsibleSection title="VIEW TUTORIAL">
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/xh9EpVkA2QY"
                  title="Google Ads Tutorial"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CollapsibleSection>
          </div>
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
              <label className="block text-sm font-medium mb-2">Customer ID</label>
              <Input
                type="text"
                placeholder="Enter Customer ID"
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                className="bg-white/20 border-none text-white placeholder:text-white/60"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="bg-white/20 border-none text-white placeholder:text-white/60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="bg-white/20 border-none text-white placeholder:text-white/60"
                />
              </div>
            </div>

            <div className="pt-4">
              <Button onClick={handleGetData} className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white">
                GET DATA
              </Button>
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
                <h3 className="text-xl font-bold mb-4">Results:</h3>
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

