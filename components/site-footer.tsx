import Link from "next/link"

export function SiteFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 py-8 px-4 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-4">
        <nav className="flex flex-wrap justify-center md:justify-start gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400">
          <Link href="/disclaimer" className="hover:underline">
            Disclaimer
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Use
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact Us
          </Link>
        </nav>
        <p className="text-xs text-gray-500 dark:text-gray-500 max-w-md md:text-right">
          Trusted Care Abroad is a free public data curation project. We do not verify or endorse any medical service
          provider. Information is for reference only.
        </p>
      </div>
    </footer>
  )
}
