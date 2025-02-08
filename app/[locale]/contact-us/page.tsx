import ContactForm from "@/app/[locale]/contact-us/contact-form";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function ContactPage() {
  const t = useTranslations("ContactUs");
  return (
    <div className="min-h-screen bg-[#00BFFF] text-white">
      <div className="container mx-auto px-4 py-32">
        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl font-bold mb-6">{t("title")}</h1>

        {/* Subheading */}
        <p className="text-xl md:text-2xl mb-12 max-w-3xl">{t("subheading")}</p>

        {/* Contact Form */}
        <ContactForm />
      </div>
    </div>
  );
}
