import { Search, Handshake, Phone } from "lucide-react"

export function HowItWorks() {
  const steps = [
    {
      icon: <Search className="h-10 w-10 text-blue-600" />,
      title: "Tell us what you’re looking for",
      description: "Enter your desired medical procedure in the search bar.",
    },
    {
      icon: <Handshake className="h-10 w-10 text-blue-600" />,
      title: "Get curated offers",
      description: "Receive a tailored list of providers matching your specific needs.",
    },
    {
      icon: <Phone className="h-10 w-10 text-blue-600" />,
      title: "Contact provider directly",
      description: "Connect with your chosen provider to arrange your medical care.",
    },
  ]

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center text-gray-900 dark:text-gray-50">How it Works</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {steps.map((step, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
          >
            <div className="mb-4 p-3 rounded-full bg-blue-50 dark:bg-blue-900/20">{step.icon}</div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-50">{step.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{step.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
