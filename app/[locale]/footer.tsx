"use client";

import { Link } from "@/i18n/routing";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @constructor
 */
export default function Footer() {
  const t = useTranslations("Footer");
  const [user] = useAuthState(auth);
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
  };

  const footerLinks = {
    company: [t("home"), t("about"), t("contactUs"), t("privacyPolicy"), t("account")],
    socials: [t("instagram"), t("facebook"), t("linkedin")],
    services: [
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
    ],
  };

  return (
    <footer className="bg-[#00BFFF] text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-8">
          {[...Array(6)].map((_, rowIndex) => (
            <div key={rowIndex} className="col-span-2 sm:col-span-1">
              {[
                ...footerLinks.company,
                ...footerLinks.socials,
                ...footerLinks.services,
              ]
                .slice(rowIndex * 4, (rowIndex + 1) * 4)
                .map((link) => (
                  <Link
                    key={link}
                    href={
                      link === t("home")
                        ? "/public"
                        : link === t("facebook")
                          ? "https://www.facebook.com/advertisinganalyticsdashboard/"
                          : link === t("instagram")
                            ? "https://www.instagram.com/advertisinganalyticsdashboard/"
                            : link === t("linkedin")
                              ? "https://www.linkedin.com/company/advertisinganalyticsdashboard/"
                              : link === t("account") && !user
                                ? "#"
                                : `/${link.toLowerCase().replace(" ", "-")}`
                    }
                    onClick={
                      link === t("account") && !user ? handleSignIn : undefined
                    }
                    className="block py-2 hover:underline"
                    {...(link === t("facebook")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                  >
                    {link}
                  </Link>
                ))}
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
