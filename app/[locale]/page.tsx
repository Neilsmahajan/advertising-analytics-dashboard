import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import ScrollToSupportedPlatforms from "@/app/[locale]/scroll-to-supported-platforms";
import ScrollToVideoSection from "@/app/[locale]/scroll-to-video-section";
import SignUpButton from "@/app/[locale]/sign-up-button";
import React from "react";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function Home() {
  const t = useTranslations("Home");
  const features = [
    {
      title: t("features.trackingData.title"),
      description: t("features.trackingData.description"),
    },
    {
      title: t("features.unifiedDashboard.title"),
      description: t("features.unifiedDashboard.description"),
    },
    {
      title: t("features.realTimeData.title"),
      description: t("features.realTimeData.description"),
    },
    {
      title: t("features.multipleAccounts.title"),
      description: t("features.multipleAccounts.description"),
    },
  ];

  const steps = [
    {
      number: 1,
      title: t("steps.connectAccounts.title"),
      description: t("steps.connectAccounts.description"),
    },
    {
      number: 2,
      title: t("steps.analyzeTrackData.title"),
      description: t("steps.analyzeTrackData.description"),
    },
    {
      number: 3,
      title: t("steps.optimizeScale.title"),
      description: t("steps.optimizeScale.description"),
    },
  ];

  const logos = [
    "tracking-data-logo.png",
    "google-analytics-logo.png",
    "google-ads-logo.png",
    "meta-ads-logo.png",
    "microsoft-ads-logo.png",
    "tiktok-ads-logo.png",
    "x-ads-logo.png",
    "linkedin-ads-logo.png",
    "pinterest-ads-logo.png",
    "snapchat-ads-logo.png",
    "amazon-ads-logo.png",
    "spotify-ads-logo.png",
    "mailchimp-logo.png",
    "cyberimpact-logo.png",
  ];

  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {t("title")}
          </h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            {t("description")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ScrollToSupportedPlatforms />
            <ScrollToVideoSection />
            <SignUpButton />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            {t("keyFeaturesTitle")}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-white/10 border-none">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-white/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section id="supported-platforms" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">{t("supportedPlatformsTitle")}</h2>
          <p className="text-xl mb-12">
            {t("supportedPlatformsDescription")}
          </p>
          <div className="flex justify-center flex-wrap gap-4">
            {logos.map((logo) => {
              const pageLink = `/${logo.replace("-logo.png", "")}`;
              return (
                <Link key={logo} href={pageLink}>
                  <Image
                    src={`/${logo}`}
                    alt={logo.replace("-logo.png", "")}
                    width={50}
                    height={50}
                    className="max-w-full"
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">{t("howItWorksTitle")}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-2xl font-bold mb-4">
                  {step.number}. {step.title}
                </div>
                <p className="text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">
            {t("readyToTransformTitle")}
          </h2>
          <iframe
            src="https://www.youtube.com/embed/xh9EpVkA2QY"
            title="Advertising Analytics Dashboard Demo"
            className="aspect-video w-full max-w-4xl mx-auto mb-12 rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="flex justify-center gap-4">
            <ScrollToSupportedPlatforms />
            <SignUpButton />
          </div>
        </div>
      </section>
    </div>
  );
}
