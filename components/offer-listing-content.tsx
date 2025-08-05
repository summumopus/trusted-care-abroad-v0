"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { getAllProviders } from "@/lib/data"
import { OfferCard } from "@/components/offer-card"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Filter, SlidersHorizontal, X, Star, Award, Plane, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import type { Provider } from "@/lib/data"

export function OfferListingContent() {
  const searchParams = useSearchParams()
  const initialProcedure = searchParams.get("procedure") || ""
  const initialTimeline = searchParams.get("timeline") || ""
  const initialMinBudget = searchParams.get("minBudget") ? Number.parseInt(searchParams.get("minBudget")!) : 0
  const initialMaxBudget = searchParams.get("maxBudget") ? Number.parseInt(searchParams.get("maxBudget")!) : 100000
  const initialCountry = searchParams.get("country") || "all-countries"
  const initialLanguage = searchParams.get("language") || ""

  const [filters, setFilters] = useState({
    procedure: initialProcedure,
    timeline: initialTimeline,
    budget: [initialMinBudget, initialMaxBudget],
    country: initialCountry,
    language: initialLanguage,
    accreditation: [] as string[],
    services: [] as string[],
    rating: 0,
  })
  const [sortOption, setSortOption] = useState<string>("price-asc")
  const [providers, setProviders] = useState<Provider[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await getAllProviders()
        setProviders(data)
      } catch (err) {
        console.error("Failed to fetch providers:", err)
        setError("Failed to load medical offers. Please try again later.")
      } finally {
        setLoading(false)
      }
    }
    fetchProviders()
  }, [])

  const formatBudget = (value: number) => {
    if (value >= 100000) return "100k+"
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
    return value.toString()
  }

  const filteredAndSortedProviders = useMemo(() => {
    const filtered = providers.filter((provider) => {
      const matchesProcedure = filters.procedure
        ? provider.procedure.toLowerCase().includes(filters.procedure.toLowerCase())
        : true

      const matchesTimeline = filters.timeline
        ? provider.availability.toLowerCase().includes(filters.timeline.toLowerCase()) ||
          filters.timeline === "flexible"
        : true

      const providerPrice = Number.parseFloat(provider.priceRange.split("-")[0]?.replace(/[^0-9.]/g, "") || "0")
      const matchesBudget = providerPrice >= filters.budget[0] && providerPrice <= filters.budget[1]

      const matchesCountry =
        filters.country && filters.country !== "all-countries"
          ? provider.location.country.toLowerCase() === filters.country.toLowerCase()
          : true

      const matchesLanguage =
        filters.language && filters.language !== "none"
          ? provider.languages.some((lang) => lang.toLowerCase() === filters.language.toLowerCase())
          : true

      const matchesAccreditation =
        filters.accreditation.length === 0 ||
        filters.accreditation.some((acc) => provider.tags.some((tag) => tag.toLowerCase().includes(acc.toLowerCase())))

      const matchesServices =
        filters.services.length === 0 ||
        filters.services.some((service) =>
          provider.services.some((s) => s.toLowerCase().includes(service.toLowerCase())),
        )

      const matchesRating =
        filters.rating === 0 ||
        (provider.reviews &&
          provider.reviews.length > 0 &&
          provider.reviews.some((review) => Number.parseFloat(review.score) >= filters.rating))

      return (
        matchesProcedure &&
        matchesTimeline &&
        matchesBudget &&
        matchesCountry &&
        matchesLanguage &&
        matchesAccreditation &&
        matchesServices &&
        matchesRating
      )
    })

    // Sort logic
    filtered.sort((a, b) => {
      if (sortOption === "price-asc") {
        const priceA = Number.parseFloat(a.priceRange.split("-")[0]?.replace(/[^0-9.]/g, "") || "0")
        const priceB = Number.parseFloat(b.priceRange.split("-")[0]?.replace(/[^0-9.]/g, "") || "0")
        return priceA - priceB
      } else if (sortOption === "price-desc") {
        const priceA = Number.parseFloat(a.priceRange.split("-")[0]?.replace(/[^0-9.]/g, "") || "0")
        const priceB = Number.parseFloat(b.priceRange.split("-")[0]?.replace(/[^0-9.]/g, "") || "0")
        return priceB - priceA
      } else if (sortOption === "rating-desc") {
        const ratingA = a.reviews?.[0] ? Number.parseFloat(a.reviews[0].score) : 0
        const ratingB = b.reviews?.[0] ? Number.parseFloat(b.reviews[0].score) : 0
        return ratingB - ratingA
      } else if (sortOption === "location-asc") {
        return a.location.country.localeCompare(b.location.country) || a.location.city.localeCompare(b.location.city)
      } else if (sortOption === "availability-asc") {
        return a.availability.localeCompare(b.availability)
      }
      return 0
    })

    return filtered
  }, [providers, filters, sortOption])

  const handleAccreditationChange = (accreditation: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      accreditation: checked
        ? [...prev.accreditation, accreditation]
        : prev.accreditation.filter((a) => a !== accreditation),
    }))
  }

  const handleServicesChange = (service: string, checked: boolean) => {
    setFilters((prev) => ({
      ...prev,
      services: checked ? [...prev.services, service] : prev.services.filter((s) => s !== service),
    }))
  }

  const handleClearFilter = (filterName: keyof typeof filters | "budgetRange") => {
    if (filterName === "budgetRange") {
      setFilters((prev) => ({ ...prev, budget: [0, 100000] }))
    } else if (filterName === "procedure") {
      setFilters((prev) => ({ ...prev, procedure: "" }))
    } else if (filterName === "accreditation") {
      setFilters((prev) => ({ ...prev, accreditation: [] }))
    } else if (filterName === "services") {
      setFilters((prev) => ({ ...prev, services: [] }))
    } else if (filterName === "rating") {
      setFilters((prev) => ({ ...prev, rating: 0 }))
    } else {
      setFilters((prev) => ({ ...prev, [filterName]: "all-countries" }))
    }
  }

  const activeFiltersCount = Object.values(filters).filter(
    (value) =>
      (typeof value === "string" && value !== "" && value !== "none" && value !== "all-countries") ||
      (Array.isArray(value) && value.length > 0 && !(value.length === 2 && value[0] === 0 && value[1] === 100000)) ||
      (typeof value === "number" && value > 0),
  ).length

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-600 dark:text-gray-400">Loading offers...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 text-center text-red-600 dark:text-red-400">
        <p className="text-lg">{error}</p>
        <Button onClick={() => window.location.reload()} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">Medical Offers</h1>

      {/* Filter and Sort Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {filters.procedure && (
            <Badge variant="secondary" className="py-1 px-3">
              Procedure: {filters.procedure}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleClearFilter("procedure")} />
            </Badge>
          )}
          {filters.timeline && filters.timeline !== "ASAP" && (
            <Badge variant="secondary" className="py-1 px-3">
              Timeline: {filters.timeline}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleClearFilter("timeline")} />
            </Badge>
          )}
          {(filters.budget[0] !== 0 || filters.budget[1] !== 100000) && (
            <Badge variant="secondary" className="py-1 px-3">
              Budget: ${formatBudget(filters.budget[0])} - ${formatBudget(filters.budget[1])}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleClearFilter("budgetRange")} />
            </Badge>
          )}
          {filters.country && filters.country !== "all-countries" && (
            <Badge variant="secondary" className="py-1 px-3">
              Country: {filters.country}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleClearFilter("country")} />
            </Badge>
          )}
          {filters.language && filters.language !== "none" && (
            <Badge variant="secondary" className="py-1 px-3">
              Language: {filters.language}
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleClearFilter("language")} />
            </Badge>
          )}
          {filters.accreditation.length > 0 && (
            <Badge variant="secondary" className="py-1 px-3">
              Accreditation: {filters.accreditation.length} selected
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleClearFilter("accreditation")} />
            </Badge>
          )}
          {filters.services.length > 0 && (
            <Badge variant="secondary" className="py-1 px-3">
              Services: {filters.services.length} selected
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleClearFilter("services")} />
            </Badge>
          )}
          {filters.rating > 0 && (
            <Badge variant="secondary" className="py-1 px-3">
              Rating: {filters.rating}+ stars
              <X className="ml-1 h-3 w-3 cursor-pointer" onClick={() => handleClearFilter("rating")} />
            </Badge>
          )}
          {activeFiltersCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                setFilters({
                  procedure: "",
                  timeline: "ASAP",
                  budget: [0, 100000],
                  country: "all-countries",
                  language: "none",
                  accreditation: [],
                  services: [],
                  rating: 0,
                })
              }
              className="text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              Clear All
            </Button>
          )}
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end">
          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
              <SelectItem value="rating-desc">Highest Rated</SelectItem>
              <SelectItem value="location-asc">Location (A-Z)</SelectItem>
              <SelectItem value="availability-asc">Availability</SelectItem>
            </SelectContent>
          </Select>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                className="md:hidden bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
              >
                <Filter className="h-4 w-4 mr-2" /> Filters
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-[350px] sm:w-[400px] bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-800 overflow-y-auto"
            >
              <SheetHeader>
                <SheetTitle className="text-gray-900 dark:text-gray-50">Filter Offers</SheetTitle>
              </SheetHeader>
              <div className="grid gap-6 py-4">
                <div className="space-y-2">
                  <Label htmlFor="filter-procedure" className="text-gray-700 dark:text-gray-300">
                    Procedure
                  </Label>
                  <Input
                    id="filter-procedure"
                    value={filters.procedure}
                    onChange={(e) => setFilters({ ...filters, procedure: e.target.value })}
                    placeholder="e.g., Hair Transplant"
                    className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-transparent"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filter-budget" className="text-gray-700 dark:text-gray-300">
                    Budget Range
                  </Label>
                  <Slider
                    id="filter-budget"
                    min={0}
                    max={100000}
                    step={1000}
                    value={filters.budget}
                    onValueChange={(value) => setFilters({ ...filters, budget: value })}
                    className="my-4 [&>span:first-child]:bg-blue-600"
                  />
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                    <span>${formatBudget(filters.budget[0])}</span>
                    <span>${formatBudget(filters.budget[1])}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    Minimum Rating
                  </Label>
                  <Select
                    value={filters.rating.toString()}
                    onValueChange={(value) => setFilters({ ...filters, rating: Number.parseFloat(value) })}
                  >
                    <SelectTrigger className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      <SelectValue placeholder="Any rating" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      <SelectItem value="0">Any rating</SelectItem>
                      <SelectItem value="3">3+ stars</SelectItem>
                      <SelectItem value="4">4+ stars</SelectItem>
                      <SelectItem value="4.5">4.5+ stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Award className="h-4 w-4" />
                    Accreditation & Certifications
                  </Label>
                  {["JCI Accredited", "ISO Certified", "NABH Accredited", "Accredited"].map((acc) => (
                    <div key={acc} className="flex items-center space-x-2">
                      <Checkbox
                        id={acc}
                        checked={filters.accreditation.includes(acc)}
                        onCheckedChange={(checked) => handleAccreditationChange(acc, checked as boolean)}
                      />
                      <Label htmlFor={acc} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        {acc}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-3">
                  <Label className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Plane className="h-4 w-4" />
                    Travel Services
                  </Label>
                  {["Airport pickup", "Accommodation", "Translator service", "Follow-up care"].map((service) => (
                    <div key={service} className="flex items-center space-x-2">
                      <Checkbox
                        id={service}
                        checked={filters.services.includes(service)}
                        onCheckedChange={(checked) => handleServicesChange(service, checked as boolean)}
                      />
                      <Label htmlFor={service} className="text-sm text-gray-700 dark:text-gray-300 cursor-pointer">
                        {service}
                      </Label>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filter-timeline" className="text-gray-700 dark:text-gray-300 flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Timeline
                  </Label>
                  <Select
                    value={filters.timeline}
                    onValueChange={(value) => setFilters({ ...filters, timeline: value })}
                  >
                    <SelectTrigger
                      id="filter-timeline"
                      className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="ASAP">ASAP (within 2 weeks)</SelectItem>
                      <SelectItem value="1 month">Within 1 month</SelectItem>
                      <SelectItem value="3 months">Within 3 months</SelectItem>
                      <SelectItem value="flexible">Flexible</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filter-country" className="text-gray-700 dark:text-gray-300">
                    Country
                  </Label>
                  <Select value={filters.country} onValueChange={(value) => setFilters({ ...filters, country: value })}>
                    <SelectTrigger
                      id="filter-country"
                      className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      <SelectItem value="all-countries">All Countries</SelectItem>
                      <SelectItem value="Turkey">Turkey</SelectItem>
                      <SelectItem value="Thailand">Thailand</SelectItem>
                      <SelectItem value="Mexico">Mexico</SelectItem>
                      <SelectItem value="South Korea">South Korea</SelectItem>
                      <SelectItem value="India">India</SelectItem>
                      <SelectItem value="Germany">Germany</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="filter-language" className="text-gray-700 dark:text-gray-300">
                    Language
                  </Label>
                  <Select
                    value={filters.language}
                    onValueChange={(value) => setFilters({ ...filters, language: value })}
                  >
                    <SelectTrigger
                      id="filter-language"
                      className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                    >
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
                      <SelectItem value="none">Any</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Spanish">Spanish</SelectItem>
                      <SelectItem value="German">German</SelectItem>
                      <SelectItem value="Arabic">Arabic</SelectItem>
                      <SelectItem value="Turkish">Turkish</SelectItem>
                      <SelectItem value="Korean">Korean</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {filteredAndSortedProviders.length === 0 ? (
        <div className="text-center py-12 text-gray-600 dark:text-gray-400">
          <SlidersHorizontal className="mx-auto h-12 w-12 mb-4" />
          <p className="text-xl font-semibold">No offers found matching your criteria.</p>
          <p className="mt-2">Try adjusting your filters or search terms.</p>
          <Button
            onClick={() =>
              setFilters({
                procedure: "",
                timeline: "ASAP",
                budget: [0, 100000],
                country: "all-countries",
                language: "none",
                accreditation: [],
                services: [],
                rating: 0,
              })
            }
            className="mt-6 bg-blue-600 hover:bg-blue-700 text-white"
          >
            Clear Filters
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProviders.map((provider) => (
            <OfferCard key={provider.id} provider={provider} />
          ))}
        </div>
      )}
    </div>
  )
}
