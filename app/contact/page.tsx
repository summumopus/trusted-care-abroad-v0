import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8">
            We're here to help! Reach out to us with any questions or feedback.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <Mail className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">Email Us</h3>
              <p className="text-gray-600 dark:text-gray-400">For general inquiries, please email us at:</p>
              <a href="mailto:info@trustedcareabroad.com" className="text-blue-600 hover:underline mt-2">
                info@trustedcareabroad.com
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <Phone className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">Call Us</h3>
              <p className="text-gray-600 dark:text-gray-400">You can reach us by phone during business hours:</p>
              <a href="tel:+1-800-123-4567" className="text-blue-600 hover:underline mt-2">
                +1 (800) 123-4567
              </a>
            </div>

            <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
              <MapPin className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">Our Office</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Trusted Care Abroad HQ
                <br />
                123 Global Health Way
                <br />
                Medical City, CA 90210
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
