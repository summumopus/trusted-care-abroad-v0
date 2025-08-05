import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Languages, Tag, CalendarDays } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Provider } from "@/lib/data"

interface OfferCardProps {
  provider: Provider
}

export function OfferCard({ provider }: OfferCardProps) {
  return (
    <Card className="w-full max-w-sm mx-auto shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
      <CardHeader className="p-4 pb-2">
        <CardTitle className="text-xl font-bold text-gray-900 dark:text-gray-50">{provider.name}</CardTitle>
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
          <MapPin className="h-4 w-4 mr-1 text-blue-500" />
          {provider.location.city}, {provider.location.country}
        </p>
      </CardHeader>
      <CardContent className="p-4 pt-2 space-y-2 text-sm">
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <span className="font-semibold mr-2">Procedure:</span> {provider.procedure}
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <DollarSign className="h-4 w-4 mr-1 text-green-600" />
          <span className="font-semibold mr-2">Price Range:</span> {provider.priceRange}
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <Languages className="h-4 w-4 mr-1 text-purple-500" />
          <span className="font-semibold mr-2">Languages:</span> {provider.languages.join(", ")}
        </div>
        <div className="flex items-center text-gray-700 dark:text-gray-300">
          <CalendarDays className="h-4 w-4 mr-1 text-orange-500" />
          <span className="font-semibold mr-2">Availability:</span> {provider.availability}
        </div>
        <div className="flex flex-wrap gap-2 pt-3">
          {provider.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="flex items-center gap-1 text-xs px-2 py-1">
              <Tag className="h-3 w-3" /> {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="p-4 border-t bg-gray-50 dark:bg-gray-900">
        <Link href={`/offers/${provider.id}`} className="w-full">
          <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">View Offer</Button>
        </Link>
      </CardFooter>
    </Card>
  )
}
