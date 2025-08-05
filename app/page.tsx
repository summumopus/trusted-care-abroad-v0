"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HowItWorks } from "@/components/how-it-works"
import { SearchModal } from "@/components/search-modal"
import { Search } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "sonner"

const commonProcedures = [
  "Hair Transplant",
  "Dental Implants",
  "Knee Replacement",
  "Cosmetic Surgery",
  "Eye Surgery (LASIK)",
  "Heart Bypass",
  "Fertility Treatment",
  "Spine Surgery",
  "Weight Loss Surgery",
  "Cancer Treatment",
]

const commonCountries = [
  "Turkey",
  "Thailand",
  "Mexico",
  "South Korea",
  "India",
  "Germany",
  "United States",
  "Canada",
  "United Kingdom",
  "Australia",
]

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCountry, setSelectedCountry] = useState("all-countries")

  const handleSearch = () => {
    if (searchQuery.trim() === "") {
      toast.error("Please enter a medical procedure to search.")
      return
    }
    setIsModalOpen(true)
  }

  return (
    <div className="flex flex-col">
      {/* Hero Section - Distinct from Header */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 py-16 md:py-24 px-4 text-center border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">
            Find Your Trusted Care Abroad
          </h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto">
            Discover and compare medical service providers globally.
          </p>

          <div className="w-full max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 flex flex-col sm:flex-row items-center gap-3 border border-gray-200 dark:border-gray-700">
            <div className="relative flex-1 w-full">
              <Input
                type="text"
                placeholder="Enter the procedure you're looking for (e.g., Hair Transplant)"
                className="w-full py-4 px-4 text-lg border-none focus-visible:ring-offset-0 focus-visible:ring-transparent bg-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                list="procedures-list"
              />
              <datalist id="procedures-list">
                {commonProcedures.map((procedure) => (
                  <option key={procedure} value={procedure} />
                ))}
              </datalist>
            </div>

            <Select value={selectedCountry} onValueChange={setSelectedCountry}>
              <SelectTrigger className="w-full sm:w-[200px] py-4 px-4 text-lg border-none focus:ring-0 focus:ring-offset-0 bg-transparent">
                <SelectValue placeholder="Country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-countries">All Countries</SelectItem>
                {commonCountries.map((country) => (
                  <SelectItem key={country} value={country}>
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              type="submit"
              className="w-full sm:w-auto px-6 py-4 text-lg bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md"
              onClick={handleSearch}
              disabled={searchQuery.trim() === ""}
            >
              <Search className="h-5 w-5 mr-2" /> Search
            </Button>
          </div>
        </div>
      </div>

      {/* How it Works Section */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        <HowItWorks />
      </div>

      <SearchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialProcedure={searchQuery}
        initialCountry={selectedCountry}
      />
    </div>
  )
}
