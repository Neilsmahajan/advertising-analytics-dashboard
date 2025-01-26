import { QuerySection } from "@/components/query-section"
import { SignOutButton } from "@/components/sign-out-button"


// This would come from your Firebase auth
const mockUser = {
  name: "Neil Mahajan",
  email: "Neilmahajan@gmail.com",
}

// These would come from your Firebase Firestore
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
]

export default function AccountPage() {

  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-2">MY ACCOUNT</h1>
        <p className="text-xl mb-12">Welcome, {mockUser.name}!</p>
        <p className="text-lg mb-12">MANAGE YOUR PROFILE AND SAVED QUERIES HERE.</p>

        {/* Profile Information Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Profile Information</h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-medium">Name:</span>
              <span>{mockUser.name}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">Email Address:</span>
              <span>{mockUser.email}</span>
            </div>
            <div className="pt-4">
              <SignOutButton />
            </div>
          </div>
        </section>

        {/* Saved Queries Section */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Saved Queries</h2>
          <div className="space-y-4">
            {services.map((service) => (
              <QuerySection key={service} title={`${service} Queries`}>
                <div className="pl-4 opacity-50">
                  No saved queries yet. Queries will appear here once you save them.
                </div>
              </QuerySection>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

