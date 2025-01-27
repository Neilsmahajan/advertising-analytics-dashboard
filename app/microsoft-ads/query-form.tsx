"use client"

import {useState} from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import ResultsSection from "@/app/microsoft-ads/results-section"

export default function QueryForm() {
    const [queryName, setQueryName] = useState("")
    const [accountId, setAccountId] = useState("")
    const [accessToken, setAccessToken] = useState("")
    const [startDate, setStartDate] = useState("")
    const [endDate, setEndDate] = useState("")
    const [, setSelectedQuery] = useState("")
    const [showResults, setShowResults] = useState(false)

    const handleQuerySelect = (value: string) => {
        setSelectedQuery(value)
        if (value === "new") {
            setQueryName("")
            setAccountId("")
            setAccessToken("")
            setStartDate("")
            setEndDate("")
        } else {
            // This will be replaced with actual Firebase data fetching
            console.log("Fetching query:", value)
        }
    }

    const handleGetData = () => {
        if (accountId && accessToken && startDate && endDate) {
            setShowResults(true)
            // This will be replaced with actual analysis logic
            console.log("Fetching data:", {accountId, accessToken, startDate, endDate})
        }
    }

    const handleSaveQuery = () => {
        // This will be replaced with actual Firebase save logic
        console.log("Saving query:", {queryName, accountId, accessToken, startDate, endDate})
    }

    return (
        <section className="space-y-6 max-w-4xl">
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium mb-2">Previous Queries</label>
                    <Select onValueChange={handleQuerySelect}>
                        <SelectTrigger className="bg-white/20 border-none text-white">
                            <SelectValue placeholder="Select a previous query or create new"/>
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
                    <label className="block text-sm font-medium mb-2">Account ID</label>
                    <Input
                        type="text"
                        placeholder="Enter Ad Account ID"
                        value={accountId}
                        onChange={(e) => setAccountId(e.target.value)}
                        className="bg-white/20 border-none text-white placeholder:text-white/60"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-2">Access Token</label>
                    <Input
                        type="password"
                        placeholder="Enter Access Token"
                        value={accessToken}
                        onChange={(e) => setAccessToken(e.target.value)}
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
            {showResults && <ResultsSection/> }
        </section>
    )
}