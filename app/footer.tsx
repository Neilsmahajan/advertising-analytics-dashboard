"use client";

import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import React from "react";

const footerLinks = {
  company: ["Home", "About", "Contact Us", "Privacy Policy", "Account"],
  socials: ["Instagram", "Facebook", "LinkedIn"],
  services: [
    "Tracking Data",
    "Google Analytics",
    "Google Ads",
    "Meta Ads",
    "Microsoft Ads",
    "X Ads",
    "TikTok Ads",
    "LinkedIn Ads",
    "Pinterest Ads",
    "Snapchat Ads",
    "Amazon Ads",
    "Spotify Ads",
    "Mailchimp",
    "Cyberimpact",
  ],
};

/**
 *
 * @constructor
 */
export default function Footer() {
  const [user] = useAuthState(auth);
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
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
                      link === "Home"
                        ? "/public"
                        : link === "Facebook"
                          ? "https://www.facebook.com/advertisinganalyticsdashboard/"
                          : link === "Instagram"
                            ? "https://www.instagram.com/advertisinganalyticsdashboard/"
                            : link === "LinkedIn"
                              ? "https://www.linkedin.com/company/advertisinganalyticsdashboard/"
                              : link === "Account" && !user
                                ? "#"
                                : `/${link.toLowerCase().replace(" ", "-")}`
                    }
                    onClick={
                      link === "Account" && !user ? handleSignIn : undefined
                    }
                    className="block py-2 hover:underline"
                    {...(link === "Facebook"
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
