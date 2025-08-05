import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    // For a production environment, consider using a free or more cost-effective model
    // and implement rate limiting or other security measures.
    const { text } = await generateText({
      model: openai("gpt-4"), // Placeholder: Replace with a free model if available for production
      prompt: messages[messages.length - 1].content,
      system:
        "You are a helpful assistant for Trusted Care Abroad. Provide concise and helpful information about medical travel, but do not give medical advice or make specific recommendations. Always remind users to do their own due diligence.",
    })

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error("Error in chat API:", error)
    return NextResponse.json({ error: "Failed to generate response" }, { status: 500 })
  }
}
