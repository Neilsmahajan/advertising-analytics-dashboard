import CollapsibleSection from "@/components/collapsible-section";
import QueryForm from "@/app/meta-ads/query-form";
import React from "react";

/**
 *
 * @constructor
 */
export default function MetaAdsPage() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">META ADS</h1>

        {/* Instructions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-lg mb-6">
            Follow These Steps To Use This Application With Your Meta Ads Data:
          </p>
          <ol className="space-y-4 list-decimal pl-6">
            <li>Go to your Meta Ads Dashboard</li>
            <li>Log in and navigate to Business Settings on the bottom left</li>
            <li>Note your Ad Account ID on the top left drop down</li>
            <li>
              Under Accounts&gt;Apps&gt;Add and create an App if you have not
              created one already
            </li>
            <li>
              Navigate to Users&gt;System Users&gt;Add and create an admin
              system user with access to your app and any other assets if you
              have not created one
            </li>
            <li>
              Retrieve your access token for the system user by clicking
              Generate Token with the maximum permissions
            </li>
            <li>
              Enter your Ad Account ID and Access Token below, along with the
              desired date range, and click Get Analytics
            </li>
          </ol>

          {/* Tutorial Section */}
          <div className="mt-8">
            <CollapsibleSection title="VIEW TUTORIAL">
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/xh9EpVkA2QY"
                  title="Meta Ads Tutorial"
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
