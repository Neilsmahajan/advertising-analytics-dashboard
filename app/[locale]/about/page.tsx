import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function AboutPage() {
  const t = useTranslations("About");
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-12 max-w-4xl">
          {t("title")}
        </h1>

        {/* Mission Statement */}
        <p className="text-xl mb-16 max-w-4xl">{t("missionStatement")}</p>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("whatWeDo")}</h2>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">{t("unifiedAnalytics")}</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">{t("realTimeInsights")}</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">{t("scalableSolutions")}</span>
              </div>
            </li>
          </ul>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("whyChooseUs")}</h2>
          <p className="text-xl mb-6">{t("whyChooseUsDescription")}</p>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("saveTime")}</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("competitiveEdge")}</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("focusOnGrowth")}</div>
            </li>
          </ul>
        </section>

        {/* Our Vision Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("ourVision")}</h2>
          <p className="text-xl max-w-4xl">{t("ourVisionDescription")}</p>
        </section>

        {/* Call to Action */}
        <section className="text-xl">
          <p>{t("callToAction")}</p>
        </section>
      </div>
    </div>
  );
}
