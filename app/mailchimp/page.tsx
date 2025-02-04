import CollapsibleSection from "@/components/collapsible-section";
import Image from "next/image";
import React from "react";

/**
 *
 * @constructor
 */
export default function MailchimpAdsPage() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <div className="flex items-center justify-start mb-6">
          <Image
            src="/mailchimp-logo.png"
            alt="Mailchimp Logo"
            width={50}
            height={50}
            className="max-w-full mr-4"
          />
          <h1 className="text-4xl md:text-6xl font-bold">MAILCHIMP ADS</h1>
        </div>
        {/* Instructions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">Instructions</h2>
          <p className="text-lg mb-6">
            Follow These Steps To Use This Application With Your Mailchimp Ads
            Data:
          </p>
          <ol className="space-y-4 list-decimal pl-6">
            <li>In development...</li>
          </ol>

          {/* Tutorial Section */}
          <div className="mt-8">
            <CollapsibleSection title="VIEW TUTORIAL">
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/xh9EpVkA2QY"
                  title="Mailchimp Ads Tutorial"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CollapsibleSection>
          </div>
        </section>
      </div>
    </div>
  );
}
