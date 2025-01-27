import ContactForm from "@/app/contact-us/contact-form";
import React from "react";

/**
 *
 * @constructor
 */
export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">CONTACT US</h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl mb-12 max-w-3xl">
          Have Questions? Contact Us To See How We Can Help Your Business Thrive
        </p>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
}
