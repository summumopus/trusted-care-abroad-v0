import type { Provider } from "@/lib/data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, DollarSign, Languages, Phone, Mail, Globe, Star, Info } from "lucide-react"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"

interface ProviderDetailsProps {
  provider: Provider
}

export function ProviderDetails({ provider }: ProviderDetailsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-3xl font-bold text-gray-900 dark:text-gray-50">{provider.name}</CardTitle>
            <p className="text-lg text-gray-600 dark:text-gray-400 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-blue-500" />
              {provider.location.address}, {provider.location.city}, {provider.location.country}
            </p>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Services Offered</h3>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-1">
                {provider.services.map((service, index) => (
                  <li key={index}>{service}</li>
                ))}
              </ul>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Pricing & Availability</h3>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                  <span className="font-medium">Price Range:</span> {provider.priceRange}
                </p>
                <p className="flex items-center text-gray-700 dark:text-gray-300 mt-2">
                  <Info className="h-5 w-5 mr-2 text-orange-500" />
                  <span className="font-medium">Availability:</span> {provider.availability}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Languages Spoken</h3>
                <p className="flex items-center text-gray-700 dark:text-gray-300">
                  <Languages className="h-5 w-5 mr-2 text-purple-500" />
                  {provider.languages.join(", ")}
                </p>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800 dark:text-gray-100">Public Reviews</h3>
              {provider.reviews && provider.reviews.length > 0 ? (
                <div className="space-y-3">
                  {provider.reviews.map((review, index) => (
                    <div key={index} className="flex items-center text-gray-700 dark:text-gray-300">
                      <Star className="h-4 w-4 mr-2 text-yellow-500 fill-yellow-500" />
                      <span>
                        {review.source}: {review.score} (
                        <Link
                          href={review.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline dark:text-blue-400"
                        >
                          View Reviews
                        </Link>
                        )
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-400">No public reviews found for this provider.</p>
              )}
            </div>
          </CardContent>
        </Card>

        {provider.mapEmbedUrl && (
          <Card className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
            <CardHeader className="p-6 pb-4">
              <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Location Map</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600">
                <iframe
                  src={provider.mapEmbedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Provider Location"
                ></iframe>
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="lg:col-span-1 space-y-8">
        <Card className="rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-100">Contact Provider</CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <Button asChild className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              <a href={`tel:${provider.contact.phone}`}>
                <Phone className="h-4 w-4 mr-2" /> Call Now
              </a>
            </Button>
            <Button
              asChild
              className="w-full bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <a href={`mailto:${provider.contact.email}`}>
                <Mail className="h-4 w-4 mr-2" /> Email
              </a>
            </Button>
            <Button
              asChild
              className="w-full bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <a href={provider.contact.website} target="_blank" rel="noopener noreferrer">
                <Globe className="h-4 w-4 mr-2" /> Visit Website
              </a>
            </Button>
            <Button
              asChild
              className="w-full bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
            >
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(provider.location.address + ", " + provider.location.city + ", " + provider.location.country)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MapPin className="h-4 w-4 mr-2" /> Get Directions
              </a>
            </Button>
          </CardContent>
        </Card>

        <Card className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950 text-yellow-800 dark:text-yellow-200 rounded-lg shadow-md">
          <CardHeader className="p-6 pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Info className="h-5 w-5" /> Important Disclaimer
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 pt-0 text-sm space-y-2">
            <p>
              {"We do not verify or guarantee any service or pricing listed here. Information is for reference only."}
            </p>
            <p>
              {
                "You are solely responsible for doing your own due diligence before engaging with any medical service provider."
              }
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
