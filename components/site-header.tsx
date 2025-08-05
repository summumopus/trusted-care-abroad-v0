import Link from "next/link"
import { HelpCircle } from "lucide-react"

export function SiteHeader() {
  return (
    <header className="bg-white dark:bg-gray-900 py-3 px-4 md:px-6 shadow-sm border-b border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex items-center justify-between h-12">
        <Link href="/" className="text-xl font-bold tracking-tight text-blue-600">
          Trusted Care Abroad
        </Link>
        <nav className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
          <Link href="/help" className="flex items-center gap-1 hover:underline">
            <HelpCircle className="h-4 w-4" />
            Help
          </Link>
        </nav>
      </div>
    </header>
  )
}
