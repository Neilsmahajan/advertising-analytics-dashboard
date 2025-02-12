import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";
import { Locale, routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as Locale)) {
    const headersList = await headers();
    const acceptLanguage = headersList.get("accept-language");
    if (acceptLanguage) {
      const preferredLocale = acceptLanguage.split(",")[0].split("-")[0];
      if (routing.locales.includes(preferredLocale as Locale)) {
        locale = preferredLocale;
      } else {
        locale = routing.defaultLocale;
      }
    } else {
      locale = routing.defaultLocale;
    }
  }

  return {
    locale,
    messages: (await import(`@/messages/${locale}.json`)).default,
  };
});
