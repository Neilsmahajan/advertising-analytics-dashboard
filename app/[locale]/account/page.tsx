import QuerySection from "@/app/[locale]/account/query-section";
import AccountInfo from "@/app/[locale]/account/account-info";
import React from "react";

/**
 * 
 * @returns 
 */
export default function AccountPage() {
  const services = [
    "Tracking Data",
    "Google Analytics",
    "Google Ads",
    "Meta Ads",
    "Microsoft Ads",
    "TikTok Ads",
    "X Ads",
    "LinkedIn Ads",
    "Pinterest Ads",
    "Snapchat Ads",
    "Amazon Ads",
    "Spotify Ads",
    "Mailchimp",
    "Cyberimpact",
  ];

  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        <AccountInfo />
        {/* Saved Queries Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Saved Queries</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <QuerySection key={service} title={service} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
