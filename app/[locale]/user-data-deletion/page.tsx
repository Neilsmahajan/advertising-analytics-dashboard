"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";

export default function UserDataDeletionPage() {
  const t = useTranslations("UserDataDeletion");

  return (
    <div className="min-h-screen bg-[#00BFFF] text-white flex items-center justify-center p-8">
      <div className="max-w-2xl bg-white/10 p-8 rounded-md">
        <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
        <p className="mb-6">{t("instructions")}</p>
        <p>
          <Link href="/account" className="underline">
            {t("goToMyAccount")}
          </Link>
        </p>
      </div>
    </div>
  );
}
