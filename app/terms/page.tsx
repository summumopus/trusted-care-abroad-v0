import { remark } from "remark"
import html from "remark-html"

const termsOfUseMarkdown = `
# Terms of Use

## 1. Acceptance of Terms
By accessing and using Trusted Care Abroad, you accept and agree to be bound by these Terms of Use. If you do not agree to these terms, please do not use the site.

## 2. Informational Purpose Only
The content on this site is for informational purposes only. We do not endorse, recommend, or guarantee any medical services or providers.

## 3. No Medical Advice
Nothing on this site constitutes professional medical advice, diagnosis, or treatment. Always seek advice from a qualified healthcare provider for medical issues.

## 4. Limitation of Liability
We are not responsible for any actions taken based on the information found on this website. All services, pricing, and provider details are subject to change.

## 5. User Responsibility
You are solely responsible for your use of the website and any resulting decisions.

## 6. Third-Party Links
This website may contain links to external websites. We are not responsible for the content, privacy policies, or practices of those sites.

## 7. Modifications
We reserve the right to modify these Terms of Use at any time. Your continued use of the site constitutes your acceptance of the updated terms.
`

export default async function TermsOfUsePage() {
  const processedContent = await remark().use(html).process(termsOfUseMarkdown)
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
