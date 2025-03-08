"use client";

import { Link } from "@/i18n/routing";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import React from "react";
import { useTranslations } from "next-intl";

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
    company: [
      t("home"),
      t("about"),
      t("contactUs"),
      t("privacyPolicy"),
      t("account"),
    ],
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

  // Helper to determine link URL
  const getLinkUrl = (link: string) => {
    if (link === t("home")) return "/";
    if (link === t("about")) return "/about";
    if (link === t("contactUs")) return "/contact-us";
    if (link === t("privacyPolicy")) return "/privacy-policy";
    if (link === t("account")) return user ? "/account" : "#";
    if (link === t("facebook"))
      return "https://www.facebook.com/advertisinganalyticsdashboard/";
    if (link === t("instagram"))
      return "https://www.instagram.com/advertisinganalyticsdashboard/";
    if (link === t("linkedin"))
      return "https://www.linkedin.com/company/advertisinganalyticsdashboard/";
    if (link === t("servicesList.trackingData")) return "/tracking-data";
    if (link === t("servicesList.googleAnalytics")) return "/google-analytics";
    if (link === t("servicesList.googleAds")) return "/google-ads";
    if (link === t("servicesList.metaAds")) return "/meta-ads";
    if (link === t("servicesList.microsoftAds")) return "/microsoft-ads";
    if (link === t("servicesList.xAds")) return "/x-ads";
    if (link === t("servicesList.tiktokAds")) return "/tiktok-ads";
    if (link === t("servicesList.linkedinAds")) return "/linkedin-ads";
    if (link === t("servicesList.pinterestAds")) return "/pinterest-ads";
    if (link === t("servicesList.snapchatAds")) return "/snapchat-ads";
    if (link === t("servicesList.amazonAds")) return "/amazon-ads";
    if (link === t("servicesList.spotifyAds")) return "/spotify-ads";
    if (link === t("servicesList.mailchimp")) return "/mailchimp";
    if (link === t("servicesList.cyberimpact")) return "/cyberimpact";
    return "#";
  };

  return (
    <footer className="bg-[#00BFFF] text-white py-12">
      <div className="container mx-auto px-4">
        {/* Primary Links (Company & Socials) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold mb-2">{t("company") || "Company"}</h3>
            {footerLinks.company.map((link) => (
              <Link
                key={link}
                href={getLinkUrl(link)}
                onClick={
                  link === t("account") && !user ? handleSignIn : undefined
                }
                className="block py-2 hover:underline"
              >
                {link}
              </Link>
            ))}
          </div>
          <div>
            <h3 className="font-bold mb-2">{t("socials") || "Socials"}</h3>
            {footerLinks.socials.map((link) => (
              <Link
                key={link}
                href={getLinkUrl(link)}
                className="block py-2 hover:underline"
                {...(link === t("facebook") ||
                link === t("instagram") ||
                link === t("linkedin")
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
        {/* Services Links Section */}
        <div className="mt-8">
          <h3 className="font-bold mb-4">{t("services") || "Services"}</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {footerLinks.services.map((link) => (
              <Link
                key={link}
                href={getLinkUrl(link)}
                className="block py-2 hover:underline"
              >
                {link}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
