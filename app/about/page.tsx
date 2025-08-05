import { remark } from "remark"
import html from "remark-html"

const aboutUsMarkdown = `
# About Trusted Care Abroad

Welcome to Trusted Care Abroad, your comprehensive platform for discovering and comparing medical service providers globally. Our mission is to empower individuals seeking medical care outside their home country by providing curated, publicly available information in an accessible format.

## Our Vision

We believe that everyone deserves access to quality healthcare options, regardless of geographical boundaries. By centralizing information on international medical providers, we aim to simplify the complex process of medical travel, making it more transparent and manageable for patients worldwide.

## What We Do

Trusted Care Abroad acts as an informational hub. We gather and present data on various medical procedures, price ranges, languages spoken, and other essential details from a diverse range of international clinics and hospitals. Our platform is designed to help you:

*   **Explore Options:** Browse a wide array of medical services and providers across different countries.
*   **Compare Details:** Easily compare key information such as pricing, availability, and patient reviews.
*   **Connect Directly:** Facilitate direct contact between you and your chosen medical provider.

## Our Commitment to Transparency

We are a public data curation project. It's important to understand that while we strive to provide useful information, we do not verify or endorse any specific medical service provider. All information is presented "as is," and we strongly encourage users to conduct their own thorough due diligence and consult with qualified medical professionals before making any healthcare decisions.

Thank you for choosing Trusted Care Abroad as your resource for international medical care.
`

export default async function AboutPage() {
  const processedContent = await remark().use(html).process(aboutUsMarkdown)
  const contentHtml = processedContent.toString()

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-950 min-h-screen">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8">
          <article className="prose dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
          </article>
        </div>
      </div>
    </div>
  )
}
