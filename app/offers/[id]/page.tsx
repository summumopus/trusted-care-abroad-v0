import { getProviderById } from "@/lib/data"
import { ProviderDetails } from "@/components/provider-details"
import { notFound } from "next/navigation"

interface ProviderDetailPageProps {
  params: {
    id: string
  }
}

export default async function ProviderDetailPage({ params }: ProviderDetailPageProps) {
  const provider = await getProviderById(params.id) // Await the async function

  if (!provider) {
    notFound()
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <ProviderDetails provider={provider} />
      </div>
    </div>
  )
}
