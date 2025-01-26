import CollapsibleSection from "@/components/collapsible-section"
import QueryForm from "./query-form"

export default function TrackingDataPage() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">FIND ANALYTICS AND TRACKING DATA</h1>
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-lg mb-6">
            Enter your website URL to find all of the Analytics and Tracking tags on your website.
          </p>
          <CollapsibleSection title="VIEW TUTORIAL">
            <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/xh9EpVkA2QY"
                title="Tracking Data Tutorial"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </CollapsibleSection>
        </section>
        <QueryForm />
      </div>
    </div>
  )
}

