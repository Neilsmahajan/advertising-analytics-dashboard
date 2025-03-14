import CollapsibleSection from "@/components/collapsible-section";
import MicrosoftAdsQueryForm from "./microsoft-ads-query-form";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function MicrosoftAdsPage() {
  const t = useTranslations("MicrosoftAdsPage");
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <div className="flex items-center justify-start mb-6">
          <Image
            src="/microsoft-ads-logo.png"
            alt="Microsoft Ads Logo"
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
            <li>{t("clickConnect")}</li>
            <li>{t("logInToMicrosoft")}</li>
            <li>{t("clickTheCampaigns")}</li>
          </ol>

          {/* Tutorial Section */}
          <div className="mt-8">
            <CollapsibleSection title={t("viewTutorial")}>
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/x9Ft4vY9BRk"
                  title="Microsoft Ads Tutorial"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </CollapsibleSection>
          </div>
        </section>

        {/* Query Form Section */}
        <MicrosoftAdsQueryForm />
      </div>
    </div>
  );
}
