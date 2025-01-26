'use client';

import { Button } from "@/components/ui/button"

export default function ScrollToVideoSection() {
  const scrollToVideoSection = () => {
    const element = document.getElementById("video-section")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <Button
      size="lg"
      variant="default"
      className="text-white bg-[#0077be] hover:bg-[#005f9e]"
      onClick={scrollToVideoSection}
    >
      WATCH VIDEO
    </Button>
  )
}