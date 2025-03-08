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
        <div className="grid grid-cols-5 gap-4">
          {/* Column 1: Company links */}
          <div>
            <h3 className="font-bold mb-2">{t("company") || "Company"}</h3>
            {footerLinks.company.map((link) => (
              <Link
                key={link}
                href={getLinkUrl(link)}
                onClick={
                  link === t("account") && !user ? handleSignIn : undefined
                }
                className="block py-1 text-sm hover:underline"
              >
                {link}
              </Link>
            ))}
          </div>
          {/* Column 2: Socials links */}
          <div>
            <h3 className="font-bold mb-2">{t("socials") || "Socials"}</h3>
            {footerLinks.socials.map((link) => (
              <Link
                key={link}
                href={getLinkUrl(link)}
                className="block py-1 text-sm hover:underline"
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
          {/* Column 3: First 5 Services links */}
          <div>
            <h3 className="font-bold mb-2">{t("services") || "Services"}</h3>
            {footerLinks.services.slice(0, 5).map((link) => (
              <Link
                key={link}
                href={getLinkUrl(link)}
                className="block py-1 text-sm hover:underline"
              >
                {link}
              </Link>
            ))}
          </div>
          {/* Column 4: Next 5 Services links */}
          <div>
            {/* Empty heading to align with first column */}
            <h3 className="font-bold mb-2">&nbsp;</h3>
            {footerLinks.services.slice(5, 10).map((link) => (
              <Link
                key={link}
                href={getLinkUrl(link)}
                className="block py-1 text-sm hover:underline"
              >
                {link}
              </Link>
            ))}
          </div>
          {/* Column 5: Remaining Services links (4 items) */}
          <div>
            <h3 className="font-bold mb-2">&nbsp;</h3>
            {footerLinks.services.slice(10).map((link) => (
              <Link
                key={link}
                href={getLinkUrl(link)}
                className="block py-1 text-sm hover:underline"
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
