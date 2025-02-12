"use client";

import { Button } from "@/components/ui/button";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @constructor
 */
export default function ScrollToVideoSection() {
  const t = useTranslations("Home.buttons");
  const scrollToVideoSection = () => {
    const element = document.getElementById("video-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      size="lg"
      variant="default"
      className="text-white bg-[#0077be] hover:bg-[#005f9e]"
      onClick={scrollToVideoSection}
    >
      {t("watchVideo")}
    </Button>
  );
}
