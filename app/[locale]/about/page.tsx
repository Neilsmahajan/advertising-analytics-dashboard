import React from "react";

/**
 * 
 * @returns 
 */
export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-12 max-w-4xl">
          ABOUT ADVERTISING ANALYTICS DASHBOARD
        </h1>

        {/* Mission Statement */}
        <p className="text-xl mb-16 max-w-4xl">
          AT ADVERTISING ANALYTICS DASHBOARD, OUR MISSION IS TO SIMPLIFY THE WAY
          BUSINESSES MANAGE AND OPTIMIZE THEIR ADVERTISING CAMPAIGNS. WHETHER
          YOU&#39;RE A SMALL BUSINESS OWNER OR PART OF A LARGE ENTERPRISE, WE
          PROVIDE THE TOOLS YOU NEED TO TRACK PERFORMANCE, GAIN INSIGHTS, AND
          MAXIMIZE THE IMPACT OF YOUR MARKETING STRATEGIES.
        </p>

        {/* What We Do Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">What We Do:</h2>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">Unified Analytics:</span>
                {" Consolidate data from multiple ad platforms in one place."}
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">Real-Time Insights:</span>
                {" Access up-to-date metrics to make informed decisions."}
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">Scalable Solutions:</span>
                {
                  " Designed to grow with your business and adapt to your needs."
                }
              </div>
            </li>
          </ul>
        </section>

        {/* Why Choose Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Why Choose Us?</h2>
          <p className="text-xl mb-6">
            With Advertising Analytics Dashboard, You Can:
          </p>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                Save time by managing all your campaigns from a single
                interface.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>Gain a competitive edge with actionable insights.</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>Focus on growth while we handle the data.</div>
            </li>
          </ul>
        </section>

        {/* Our Vision Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Our Vision</h2>
          <p className="text-xl max-w-4xl">
            We Aim To Empower Businesses With Advanced Analytics And Intuitive
            Tools That Unlock The Full Potential Of Their Advertising Efforts.
            By Bridging Technology And Marketing, We Help You Reach New Heights.
          </p>
        </section>

        {/* Call to Action */}
        <section className="text-xl">
          <p>
            Have questions? Interested in learning more?{" "}
            <a href="/contact-us" className="underline hover:text-white/90">
              Contact Us
            </a>{" "}
            or explore our{" "}
            <a href="/services" className="underline hover:text-white/90">
              Services
            </a>{" "}
            to see how we can help your business thrive.
          </p>
        </section>
      </div>
    </div>
  );
}
