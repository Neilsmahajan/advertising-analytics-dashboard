import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import ScrollToSupportedPlatforms from "@/app/scroll-to-supported-platforms"
import ScrollToVideoSection from "@/app/scroll-to-video-section"
import SignUpButton from "@/app/sign-up-button"

const features = [
  {
    title: "Tracking Data",
    description: "Find all analytics tags and tracking services on any website.",
  },
  {
    title: "Unified Dashboard",
    description: "Fetch data from Google, Meta, TikTok, and more in one interface.",
  },
  {
    title: "Real-Time Data",
    description: "Multi-platform tracking with real-time insights.",
  },
  {
    title: "Multiple Accounts",
    description: "Save multiple ad accounts and switch between saved metrics seamlessly.",
  },
]

const steps = [
  {
    number: 1,
    title: "Connect Your Accounts",
    description: "Securely sync your ad platforms in just a few clicks",
  },
  {
    number: 2,
    title: "Analyze And Track Data",
    description: "Gain valuable insights with real-time performance metrics",
  },
  {
    number: 3,
    title: "Optimize And Scale",
    description: "Improve your campaigns and maximize your advertising ROI",
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">ADVERTISING ANALYTICS DASHBOARD</h1>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto">
            Manage And Analyze All Your Advertising Campaigns In One Unified Dashboard. Gain Insights, Track
            Performance, And Optimize Results Effortlessly.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <ScrollToSupportedPlatforms />
            <ScrollToVideoSection />
            <SignUpButton />
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features (Why Use This Tool?)</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Card key={feature.title} className="bg-white/10 border-none">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-white/80">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Platforms Section */}
      <section id="supported-platforms" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Supported Platforms</h2>
          <p className="text-xl mb-12">Seamlessly Track Data And Integrate With:</p>
          <div className="flex justify-center">
            <Image
              src="/LogosButtonsList.png"
              alt="Supported Platforms"
              width={800}
              height={50}
              className="max-w-full"
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="text-center">
                <div className="text-2xl font-bold mb-4">
                  {step.number}. {step.title}
                </div>
                <p className="text-white/80">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section id="video-section" className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-12">Ready To Transform Your Advertising Strategy?</h2>
          <iframe
            src="https://www.youtube.com/embed/xh9EpVkA2QY"
            title="Advertising Analytics Dashboard Demo"
            className="aspect-video w-full max-w-4xl mx-auto mb-12 rounded-lg"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
          <div className="flex justify-center gap-4">
            <ScrollToSupportedPlatforms />
            <SignUpButton />
          </div>
        </div>
      </section>
    </div>
  )
}

