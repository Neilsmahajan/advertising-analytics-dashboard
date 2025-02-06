"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @constructor
 */
export default function Navbar() {
  const t = useTranslations("Navbar");
  const [user] = useAuthState(auth);
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
  };

  const services = [
    t("servicesList.trackingData"),
    t("servicesList.googleAnalytics"),
    t("servicesList.googleAds"),
    t("servicesList.metaAds"),
    t("servicesList.microsoftAds"),
    t("servicesList.tiktokAds"),
    t("servicesList.xAds"),
    t("servicesList.linkedinAds"),
    t("servicesList.pinterestAds"),
    t("servicesList.snapchatAds"),
    t("servicesList.amazonAds"),
    t("servicesList.spotifyAds"),
    t("servicesList.mailchimp"),
    t("servicesList.cyberimpact"),
  ];

  const languages = [t("languages.english"), t("languages.french")];

  useEffect(() => {
    document.body.classList.add("overflow-y-scroll");
    return () => {
      document.body.classList.remove("overflow-y-scroll");
    };
  }, []);
  return (
    <nav className="fixed top-0 w-full bg-white z-50 border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/cropped-advertising-analytics-dashboard-logo.png"
                alt="Advertising Analytics Dashboard Logo"
                width={40}
                height={40}
              />
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-sm font-medium">
                {t("home")}
              </Link>
              <Link href="/about" className="text-sm font-medium">
                {t("about")}
              </Link>
              <Link href="/contact-us" className="text-sm font-medium">
                {t("contactUs")}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  {t("language")} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {languages.map((lang) => (
                  <DropdownMenuItem key={lang}>{lang}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <Link href="/account">
                <Button variant="ghost">{t("account")}</Button>
              </Link>
            ) : (
              <Button variant="ghost" onClick={handleSignIn}>
                {t("signIn")}
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  {t("services")} <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {services.map((service) => (
                  <DropdownMenuItem key={service} asChild>
                    <Link href={`/${service.toLowerCase().replace(/ /g, "-")}`}>
                      {service}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
