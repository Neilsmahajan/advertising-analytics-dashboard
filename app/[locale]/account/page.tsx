import QuerySection from "@/app/[locale]/account/query-section";
import AccountInfo from "@/app/[locale]/account/account-info";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function AccountPage() {
  const t = useTranslations("Account");
  const services = [
    t("servicesList.trackingData"),
    t("servicesList.googleAnalytics"),
    t("servicesList.googleAds"),
    t("servicesList.metaAds"),
    t("servicesList.microsoftAds"),
    t("servicesList.xAds"),
    t("servicesList.tiktokAds"),
    t("servicesList.linkedinAds"),
    t("servicesList.pinterestAds"),
    t("servicesList.snapchatAds"),
    t("servicesList.amazonAds"),
    t("servicesList.spotifyAds"),
    t("servicesList.mailchimp"),
    t("servicesList.cyberimpact"),
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
