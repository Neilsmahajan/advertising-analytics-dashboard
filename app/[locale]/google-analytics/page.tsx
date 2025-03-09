import CollapsibleSection from "@/components/collapsible-section";
import QueryForm from "@/app/[locale]/google-analytics/google-analytics-query-form";
import Image from "next/image";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function GoogleAnalyticsPage() {
  const t = useTranslations("GoogleAnalyticsPage");
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <div className="flex items-center justify-start mb-6">
          <Image
            src="/google-analytics-logo.png"
            alt="Google Analytics Logo"
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
            <li>{t("goToGoogleAnalyticsDashboard")}</li>
            <li>
              {t("navigateToAdmin")}
              <ul className="list-disc pl-6 mt-2 space-y-2">
                <li>{t("addTheFollowing")}</li>
                <li>{t("grantViewerRoll")}</li>
              </ul>
            </li>
            <li>{t("getYourGoogle")}</li>
            <li>{t("enterTheProperty")}</li>
          </ol>

          {/* Tutorial Section */}
          <div className="mt-8">
            <CollapsibleSection title={t("viewTutorial")}>
              <div className="aspect-video w-full max-w-4xl mx-auto rounded-lg overflow-hidden">
                <iframe
                  src="https://youtu.be/Gwl51a4Zh3k"
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
