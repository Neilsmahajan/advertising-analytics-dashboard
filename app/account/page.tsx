import QuerySection from "@/app/account/query-section";
import AccountInfo from "@/app/account/account-info";
import React from "react";

// These would come from your Firebase Firestore
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

export default function AccountPage() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        <AccountInfo />
        {/* Saved Queries Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Saved Queries</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <QuerySection key={service} title={`${service} Queries`}>
                <div className="pl-4 opacity-50">
                  No saved queries yet. Queries will appear here once you save
                  them.
                </div>
              </QuerySection>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
