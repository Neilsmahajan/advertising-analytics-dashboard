import CollapsibleSection from "@/components/collapsible-section";
import MetaAdsQueryForm from "@/app/[locale]/meta-ads/meta-ads-query-form";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function MetaAdsPage() {
  const t = useTranslations("MetaAdsPage");
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <div className="flex items-center justify-start mb-6">
          <Image
            src="/meta-ads-logo.png"
            alt="Meta Ads Logo"
            width={50}
            height={50}
            className="max-w-full mr-4"
          />
          <h1 className="text-4xl md:text-6xl font-bold">{t("title")}</h1>
        </div>
        {/* Instructions Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-4">{t("instructions")}</h2>
          <p className="text-lg mb-6">{t("followTheseSteps")}</p>
          <ol className="space-y-4 list-decimal pl-6">
            <li>{t("goToMetaAdsDashboard")}</li>
            <li>{t("logInAndNavigate")}</li>
            <li>{t("noteAdAccountId")}</li>
            <li>{t("underAccountsApps")}</li>
            <li>{t("navigateToUsers")}</li>
            <li>{t("retrieveAccessToken")}</li>
            <li>{t("enterAdAccountId")}</li>
          </ol>

          {/* Tutorial Section */}
          <div className="mt-8">
            <CollapsibleSection title={t("viewTutorial")}>
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
        <MetaAdsQueryForm />
      </div>
    </div>
  );
}
