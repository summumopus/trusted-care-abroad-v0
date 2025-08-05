import { remark } from "remark"
import html from "remark-html"

const disclaimerMarkdown = `
# Disclaimer

Trusted Care Abroad provides an informational platform that curates publicly available data about medical service providers around the world. We do not offer medical advice, do not verify the accuracy of third-party data, and do not guarantee the quality, safety, or effectiveness of any listed provider or procedure.

All information is presented "as is" and is subject to change without notice. Users are solely responsible for their choices and are strongly encouraged to conduct their own research and consult with qualified medical professionals before making any healthcare-related decisions.

Trusted Care Abroad does not accept any liability for any loss, damage, or harm that may result from the use of our website or the services of any provider listed herein.
`

export default async function DisclaimerPage() {
  const processedContent = await remark().use(html).process(disclaimerMarkdown)
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
