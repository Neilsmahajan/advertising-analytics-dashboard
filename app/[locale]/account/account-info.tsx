"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebaseConfig";
import SignOutButton from "./sign-out-button";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function AccountInfo() {
  const t = useTranslations("Account");
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <p>{t("loading")}</p>;
  }

  if (error) {
    return <p>{t("error")} {error.message}</p>;
  }

  if (user) {
    return (
      <>
        {/* Header Section */}
        <h1 className="text-4xl md:text-6xl font-bold mb-2">{t("title")}</h1>
        <p className="text-xl mb-12">{t("welcome")} {user.displayName}!</p>
        <p className="text-lg mb-12">
          {t("manageProfile")}
        </p>

        {/* Profile Information Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">{t("profileInfo")}</h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="font-medium">{t("name")}:</span>
              <span>{user.displayName}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{t("emailAddress")}:</span>
              <span>{user.email}</span>
            </div>
          </div>
          <div className="pt-4">
            <SignOutButton />
          </div>
        </section>
      </>
    );
  }

  return <p>{t("noUserSignedIn")}</p>;
}
