import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function PrivacyPolicyPage() {
  const t = useTranslations("PrivacyPolicy");
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-8">{t("title")}</h1>

        {/* Introduction */}
        <p className="text-xl mb-16 max-w-4xl">
          {t("introduction")}
        </p>

        {/* Information We Collect Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("informationWeCollect")}</h2>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">{t("personalInformation")}</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">{t("usageData")}</span>
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">{t("adPlatformData")}</span>
              </div>
            </li>
          </ul>
        </section>

        {/* How We Use Your Information Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("howWeUseYourInformation")}</h2>
          <p className="text-xl mb-6">{t("howWeUseYourInformationDescription")}</p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("provideAccess")}</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("improveExperience")}</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("communicateUpdates")}</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("maintainSecurity")}</div>
            </li>
          </ul>
        </section>

        {/* Data Protection Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("dataProtection")}</h2>
          <p className="text-xl">
            {t("dataProtectionDescription")}
          </p>
        </section>

        {/* Sharing Your Information Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("sharingYourInformation")}</h2>
          <p className="text-xl">
            {t("sharingYourInformationDescription")}
          </p>
        </section>

        {/* Your Rights Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("yourRights")}</h2>
          <p className="text-xl mb-6">{t("yourRightsDescription")}</p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("accessUpdate")}</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("deleteAccount")}</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>{t("optOut")}</div>
            </li>
          </ul>
        </section>

        {/* Changes To This Policy Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("changesToPolicy")}</h2>
          <p className="text-xl">
            {t("changesToPolicyDescription")}
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">{t("contactUs")}</h2>
          <p className="text-xl">
            {t("contactUsDescription")}{" "}
            <a href="/contact-us" className="underline hover:text-white/90">
              {t("contactUs")}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
