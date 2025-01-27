import CollapsibleSection from "@/components/collapsible-section"
import QueryForm from "@/app/google-analytics/query-form"

export default function GoogleAdsPage() {


  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">GOOGLE ADS</h1>

        {/* Instructions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-lg mb-6">Follow These Steps To Use This Application With Your Google Ads Data:</p>
          <ol className="space-y-4 list-decimal pl-6">
            <li>Go to your Google Ads Dashboard</li>
            <li>Log in and select your Google Ads Account</li>
            <li>
              Get your Customer ID from the top right (e.g., 683-961-6266) for the account that you would like to fetch
              data from
            </li>
            <li>Enter your customer ID below, along with the desired date range, and click Get Data.</li>
          </ol>

          {/* Tutorial Section */}
          <div className="mt-8">
            <CollapsibleSection title="VIEW TUTORIAL">
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/xh9EpVkA2QY"
                  title="Google Ads Tutorial"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CollapsibleSection>
          </div>
        </section>

        {/* Query Form Section */}
        <QueryForm />
      </div>
    </div>
  )
}

