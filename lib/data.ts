// This file now fetches data from Supabase.
// Ensure your Supabase environment variables are set up correctly.

import { getServerSupabaseClient } from "./supabase"

export interface Provider {
  id: string
  name: string
  location: {
    city: string
    country: string
    address: string
  }
  procedure: string
  priceRange: string // e.g., "$5,000 - $7,000"
  languages: string[]
  tags: string[] // e.g., "Accredited", "Airport pickup"
  availability: string // e.g., "Next 2 weeks", "Flexible"
  contact: {
    phone: string
    email: string
    website: string
  }
  services: string[]
  reviews: {
    source: string
    url: string
    score: string
  }[]
  mapEmbedUrl?: string // Google Maps embed URL
}

export async function getAllProviders(): Promise<Provider[]> {
  // Use the server-side Supabase client for data fetching in Server Components/APIs
  const supabase = getServerSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not initialized for getAllProviders. Check environment variables.")
    return [] // Return empty array if Supabase is not configured
  }

  const { data, error } = await supabase.from("providers").select("*")

  if (error) {
    console.error("Error fetching providers:", error)
    return []
  }
  return data as Provider[]
}

export async function getProviderById(id: string): Promise<Provider | undefined> {
  // Use the server-side Supabase client for data fetching in Server Components/APIs
  const supabase = getServerSupabaseClient()
  if (!supabase) {
    console.error("Supabase client not initialized for getProviderById. Check environment variables.")
    return undefined // Return undefined if Supabase is not configured
  }

  const { data, error } = await supabase.from("providers").select("*").eq("id", id).single()

  if (error) {
    console.error(`Error fetching provider with ID ${id}:`, error)
    return undefined
  }
  return data as Provider
}
