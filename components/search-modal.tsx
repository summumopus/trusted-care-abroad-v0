"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AnimatePresence, motion } from "framer-motion"

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
  initialProcedure: string
  initialCountry: string
}

export function SearchModal({ isOpen, onClose, initialProcedure, initialCountry }: SearchModalProps) {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(0)
  const [timeline, setTimeline] = useState<string>("ASAP")
  const [budget, setBudget] = useState<number[]>([1000, 50000])
  const [country, setCountry] = useState<string>(initialCountry === "all-countries" ? "all-countries" : initialCountry)
  const [language, setLanguage] = useState<string>("none")

  useEffect(() => {
    if (!isOpen) {
      // Reset state when modal closes
      setCurrentStep(0)
      setTimeline("ASAP")
      setBudget([1000, 50000])
      setCountry(initialCountry === "all-countries" ? "all-countries" : initialCountry)
      setLanguage("none")
    }
  }, [isOpen, initialCountry])

  const formatBudget = (value: number) => {
    if (value >= 100000) return "100k+"
    if (value >= 1000) return `${(value / 1000).toFixed(0)}k`
    return value.toString()
  }

  const questions = [
    {
      title: "When are you looking to travel?",
      description: "This helps us find providers with suitable availability.",
      content: (
        <RadioGroup value={timeline} onValueChange={setTimeline} className="flex flex-col space-y-3 w-full">
          <div className="flex items-center space-x-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <RadioGroupItem value="ASAP" id="timeline-asap" className="border-blue-600 text-blue-600" />
            <Label htmlFor="timeline-asap" className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300">
              ASAP (within 2 weeks)
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <RadioGroupItem value="1 month" id="timeline-1month" className="border-blue-600 text-blue-600" />
            <Label htmlFor="timeline-1month" className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300">
              Within 1 month
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <RadioGroupItem value="3 months" id="timeline-3months" className="border-blue-600 text-blue-600" />
            <Label htmlFor="timeline-3months" className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300">
              Within 3 months
            </Label>
          </div>
          <div className="flex items-center space-x-2 p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
            <RadioGroupItem value="flexible" id="timeline-flexible" className="border-blue-600 text-blue-600" />
            <Label htmlFor="timeline-flexible" className="flex-1 cursor-pointer text-gray-700 dark:text-gray-300">
              Flexible
            </Label>
          </div>
        </RadioGroup>
      ),
      canProceed: timeline !== "",
    },
    {
      title: "What's your estimated budget range?",
      description: "This helps us filter offers that fit your financial plan.",
      content: (
        <div className="w-full px-4">
          <Slider
            min={0}
            max={100000}
            step={1000}
            value={budget}
            onValueChange={setBudget}
            className="my-8 [&>span:first-child]:bg-blue-600"
          />
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
            <span>${formatBudget(budget[0])}</span>
            <span>${formatBudget(budget[1])}</span>
          </div>
          <div className="flex justify-between text-xs mt-2 text-gray-500 dark:text-gray-500">
            <span>Budget</span>
            <span>Premium</span>
          </div>
        </div>
      ),
      canProceed: true,
    },
    {
      title: "Do you have a country preference?",
      description: "This is optional, but can narrow down your search.",
      content: (
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="w-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800">
            <SelectValue placeholder="Select Country" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <SelectItem value="all-countries">Select Country</SelectItem>
            <SelectItem value="Turkey">Turkey</SelectItem>
            <SelectItem value="Thailand">Thailand</SelectItem>
            <SelectItem value="Mexico">Mexico</SelectItem>
            <SelectItem value="South Korea">South Korea</SelectItem>
            <SelectItem value="India">India</SelectItem>
            <SelectItem value="Germany">Germany</SelectItem>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
          </SelectContent>
        </Select>
      ),
      canProceed: true,
    },
    {
      title: "Do you have any language requirements?",
      description: "This is optional, but can help find providers with staff speaking your language.",
      content: (
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-full border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800">
            <SelectValue placeholder="Select a language (optional)" />
          </SelectTrigger>
          <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
            <SelectItem value="none">No preference</SelectItem>
            <SelectItem value="English">English</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="German">German</SelectItem>
            <SelectItem value="Arabic">Arabic</SelectItem>
            <SelectItem value="Turkish">Turkish</SelectItem>
            <SelectItem value="Korean">Korean</SelectItem>
          </SelectContent>
        </Select>
      ),
      canProceed: true,
    },
  ]

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      // Last question, navigate to offers page
      const queryParams = new URLSearchParams()
      queryParams.append("procedure", initialProcedure)
      if (timeline !== "ASAP") queryParams.append("timeline", timeline)
      queryParams.append("minBudget", budget[0].toString())
      queryParams.append("maxBudget", budget[1].toString())
      if (country !== "all-countries") queryParams.append("country", country)
      if (language !== "none") queryParams.append("language", language)

      router.push(`/offers?${queryParams.toString()}`)
      onClose()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const currentQuestion = questions[currentStep]

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] p-0 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl shadow-xl overflow-hidden">
        <div className="bg-white dark:bg-gray-800 p-6 border-b border-gray-200 dark:border-gray-700">
          <DialogHeader className="text-center">
            <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              {currentQuestion.title}
            </DialogTitle>
            <DialogDescription className="text-gray-500 dark:text-gray-400">
              {currentQuestion.description}
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="p-6">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={currentStep}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              custom={1}
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="flex justify-center items-center min-h-[200px] w-full"
            >
              <div className="w-full bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6">
                {currentQuestion.content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <ChevronLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!currentQuestion.canProceed}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {currentStep < questions.length - 1 ? "Next" : "Show Offers"}
            {currentStep < questions.length - 1 && <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
