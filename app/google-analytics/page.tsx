import CollapsibleSection from "@/components/collapsible-section";
import QueryForm from "@/app/google-analytics/query-form";

export default function GoogleAnalyticsPage() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          GOOGLE ANALYTICS
        </h1>

        {/* Instructions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-lg mb-6">
            Follow These Steps To Use This Application With Your Google
            Analytics Data:
          </p>
          <ol className="space-y-4 list-decimal pl-6">
            <li>Go to your Google Analytics Dashboard.</li>
            <li>
              Navigate to Admin &gt; Account &gt; Account access management
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>
                  Add the following email:
                  google-analytics@advertising-analytics-444021.iam.serviceaccount.com
                </li>
                <li>Grant Viewer role access.</li>
              </ul>
            </li>
            <li>
              Get your Google Analytics Property ID (e.g., 469573948) from Admin
              &gt; Property &gt; Property details.
            </li>
            <li>
              Enter the Property ID below, along with the desired date range,
              and click Get Analytics.
            </li>
          </ol>

          {/* Tutorial Section */}
          <div className="mt-8">
            <CollapsibleSection title="VIEW TUTORIAL">
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/xh9EpVkA2QY"
                  title="Google Analytics Tutorial"
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
  );
}
