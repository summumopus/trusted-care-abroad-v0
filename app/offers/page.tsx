import { Suspense } from "react"
import { OfferListingContent } from "@/components/offer-listing-content"

export default function OffersPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <Suspense fallback={<div>Loading offers...</div>}>
        <OfferListingContent />
      </Suspense>
    </div>
  )
}
