export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-8">PRIVACY POLICY</h1>

        {/* Introduction */}
        <p className="text-xl mb-16 max-w-4xl">
          YOUR PRIVACY IS IMPORTANT TO US AT ADVERTISING ANALYTICS DASHBOARD.
          THIS PRIVACY POLICY OUTLINES THE TYPES OF INFORMATION WE COLLECT, HOW
          WE USE IT, AND THE STEPS WE TAKE TO PROTECT YOUR DATA.
        </p>

        {/* Information We Collect Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Information We Collect</h2>
          <ul className="space-y-6">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">Personal Information: </span>
                When you create an account, we collect details such as your
                name, email address, and any other data you provide during
                registration.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">Usage Data: </span>
                We track how you interact with our website, including the
                services you use, the pages you visit, and your preferences, to
                enhance your experience.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                <span className="font-semibold">Ad Platform Data: </span>
                If you connect your ad accounts, we access campaign performance
                metrics, but we never modify or interact with your ad campaigns.
              </div>
            </li>
          </ul>
        </section>

        {/* How We Use Your Information Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">
            How We Use Your Information
          </h2>
          <p className="text-xl mb-6">We Use Your Information To:</p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>Provide access to our platform and its features.</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>Improve and personalize your experience.</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                Communicate updates, promotional offers, and support-related
                information.
              </div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>Maintain the security and integrity of your data.</div>
            </li>
          </ul>
        </section>

        {/* Data Protection Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Data Protection</h2>
          <p className="text-xl">
            We implement industry-standard security measures to safeguard your
            personal information and ad platform data. Your data is encrypted
            and stored securely, and we regularly update our systems to address
            emerging security risks.
          </p>
        </section>

        {/* Sharing Your Information Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Sharing Your Information</h2>
          <p className="text-xl">
            We do not sell, trade, or rent your personal information to third
            parties. We may share your data with trusted third-party services
            only when necessary for operation, and these parties are required to
            maintain the confidentiality of your information.
          </p>
        </section>

        {/* Your Rights Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Your Rights</h2>
          <p className="text-xl mb-6">Your Have The Right To:</p>
          <ul className="space-y-4">
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>Access and update your personal information.</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>Delete your account and associated data.</div>
            </li>
            <li className="flex items-start">
              <span className="mr-3">•</span>
              <div>
                Opt-out of marketing communications by updating your
                preferences.
              </div>
            </li>
          </ul>
        </section>

        {/* Changes To This Policy Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Changes To This Policy</h2>
          <p className="text-xl">
            We may update this Privacy Policy periodically. Any changes will be
            posted on this page with an updated revision date.
          </p>
        </section>

        {/* Contact Us Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <p className="text-xl">
            If you have any questions about this Privacy Policy, please{" "}
            <a href="/contact-us" className="underline hover:text-white/90">
              contact us
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
