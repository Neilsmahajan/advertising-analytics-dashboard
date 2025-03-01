import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/app/[locale]/navbar";
import Footer from "@/app/[locale]/footer";
import React, { Suspense } from "react";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, Locale } from "@/i18n/routing";
import { NextIntlClientProvider } from "next-intl";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Advertising Analytics Dashboard",
  description:
    "Manage And Analyze All Your Advertising Campaigns In One Unified Dashboard",
};

/**
 *
 * @param children
 * @constructor
 */
export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = await params;
  // Ensure that the incoming `locale` is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <Navbar />
          <Suspense fallback={<LoadingFallback />}>
            <main>{children}</main>
          </Suspense>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// Create a minimal LoadingFallback component or import one if available.
function LoadingFallback() {
  return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
}
