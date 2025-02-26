"use client";

// import QueryForm from "@/components/query-form";
import React from "react";
// import { useState } from "react";
import axios from "axios";
// import { auth } from "@/lib/firebaseConfig";
// import { useAuthState } from "react-firebase-hooks/auth";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";

/**
 *
 * @returns
 */
export default function GoogleAdsQueryForm() {
  const t = useTranslations("GoogleAdsQueryForm");
  // const queryFields = {
  //   customerId: t("customerId"),
  // };

  const searchParams = useSearchParams();
  const code = searchParams.get("code");
  // let passthrough_val;

  const handleAuthenticate = async () => {
    try {
      const response = await axios.post(
        "https://us-central1-advertisinganalytics-dashboard.cloudfunctions.net/authenticate_google_ads_function",
        // "http://127.0.0.1:5001/advertisinganalytics-dashboard/us-central1/authenticate_google_ads_function",
        {},
      );
      console.log(
        "Redirecting to Google Ads authentication page:",
        response.data.url,
      );
      // passthrough_val = response.data.passthroughVal;
      window.open(response.data.url, "_blank");
    } catch (error) {
      console.error("Error during Google Ads authentication:", error);
    }
  };

  return (
    <div>
      {!code ? (
        <Button
          onClick={handleAuthenticate}
          className="bg-[#47adbf] hover:bg-[#47adbf]/90 text-white"
        >
          {t("connectWithGoogleAds")}
        </Button>
      ) : (
        <></>
      )}
    </div>
  );
}
