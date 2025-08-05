export default function HelpPage() {
  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900 dark:text-gray-50">
              How Can We Help You?
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400">
              Find answers to common questions about using Trusted Care Abroad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Getting Started</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>• Enter your desired medical procedure in the search bar</li>
                <li>• Optionally select a preferred country</li>
                <li>• Answer a few questions to get personalized results</li>
                <li>• Browse and compare medical providers</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Understanding Results</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>• Price ranges are estimates and may vary</li>
                <li>• Contact providers directly for accurate quotes</li>
                <li>• Check reviews and credentials independently</li>
                <li>• Always consult with medical professionals</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Safety & Research</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>• Verify provider credentials and certifications</li>
                <li>• Research the facility and location</li>
                <li>• Understand the procedure and risks involved</li>
                <li>• Plan for recovery and follow-up care</li>
              </ul>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Important Disclaimers</h3>
              <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                <li>• We do not verify or endorse any providers</li>
                <li>• Information is for reference only</li>
                <li>• You are responsible for your own due diligence</li>
                <li>• Always seek professional medical advice</li>
              </ul>
            </div>
          </div>

          <div className="mt-12 text-center bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8">
            <h3 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-gray-50">Still Need Help?</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              If you can't find the answer you're looking for, feel free to contact us directly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:info@trustedcareabroad.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md transition-colors"
              >
                Email Support
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 bg-transparent border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
              >
                Contact Page
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
