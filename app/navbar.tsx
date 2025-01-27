"use client";

import Link from "next/link";
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

const services = [
  "Tracking Data",
  "Google Analytics",
  "Google Ads",
  "Meta Ads",
  "Microsoft Ads",
  "TikTok Ads",
  "X Ads",
  "LinkedIn Ads",
  "Pinterest Ads",
  "Snapchat Ads",
  "Amazon Ads",
  "Spotify Ads",
  "Mailchimp",
  "Cyberimpact",
];

const languages = ["English", "French"];

/**
 *
 * @constructor
 */
export default function Navbar() {
  const [user] = useAuthState(auth);
  const provider = new GoogleAuthProvider();

  const handleSignIn = () => {
    signInWithPopup(auth, provider).catch((error) => {
      console.error("Error signing in with Google: ", error);
    });
  };

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
                Home
              </Link>
              <Link href="/about" className="text-sm font-medium">
                About
              </Link>
              <Link href="/contact-us" className="text-sm font-medium">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  English <ChevronDown className="h-4 w-4" />
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
                <Button variant="ghost">Account</Button>
              </Link>
            ) : (
              <Button variant="ghost" onClick={handleSignIn}>
                Sign In
              </Button>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1">
                  Services <ChevronDown className="h-4 w-4" />
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
