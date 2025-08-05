import { remark } from "remark"
import html from "remark-html"

const privacyPolicyMarkdown = `
# Privacy Policy

Trusted Care Abroad respects your privacy. This Privacy Policy explains how we collect, use, and protect any information that may be gathered when you use our site.

## 1. Data Collection
Currently, we do not collect or store any personal data from our users. In the future, if we begin to collect data, we will update this policy accordingly.

## 2. Cookies and Tracking
We may use basic cookies or analytics tools to improve performance and understand user behavior. These tools do not collect personally identifiable information.

## 3. Data Sharing
We do not sell, trade, or otherwise transfer any user information to outside parties.

## 4. External Links
Our website contains links to third-party sites. We are not responsible for the privacy practices or content of those sites.

## 5. Security
We are committed to ensuring your information is secure. While we do not collect sensitive data now, we will follow best practices if that changes.

## 6. Updates
This policy may be updated periodically. Please check back to stay informed about how we protect your data.
`

export default async function PrivacyPolicyPage() {
  const processedContent = await remark().use(html).process(privacyPolicyMarkdown)
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
