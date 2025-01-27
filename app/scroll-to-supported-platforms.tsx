"use client";

import { Button } from "@/components/ui/button";

export default function ScrollToSupportedPlatforms() {
  const scrollToSupportedPlatforms = () => {
    const element = document.getElementById("supported-platforms");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Button
      size="lg"
      variant="default"
      className="text-white bg-[#0077be] hover:bg-[#005f9e]"
      onClick={scrollToSupportedPlatforms}
    >
      EXPLORE SERVICES
    </Button>
  );
}
