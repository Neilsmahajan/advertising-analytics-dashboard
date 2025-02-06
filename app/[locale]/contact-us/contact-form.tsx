"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import React from "react";
import { useTranslations } from "next-intl";

/**
 *
 * @returns
 */
export default function ContactForm() {
  const t = useTranslations("ContactUs");
  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("form.nameError"),
    }),
    email: z.string().email({
      message: t("form.emailError"),
    }),
    phone: z.string().optional(),
    message: z.string().min(10, {
      message: t("form.messageError"),
    }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // In a real application, you would handle the form submission here
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 max-w-2xl"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                {t("form.name")} <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.namePlaceholder")}
                  className="bg-white/20 border-none text-white placeholder:text-white/60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                {t("form.email")} <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.emailPlaceholder")}
                  type="email"
                  className="bg-white/20 border-none text-white placeholder:text-white/60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">{t("form.phone")}</FormLabel>
              <FormControl>
                <Input
                  placeholder={t("form.phonePlaceholder")}
                  type="tel"
                  className="bg-white/20 border-none text-white placeholder:text-white/60"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">
                {t("form.message")} <span className="text-red-400">*</span>
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder={t("form.messagePlaceholder")}
                  className="bg-white/20 border-none text-white placeholder:text-white/60 min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          size="lg"
          className="text-white bg-[#0077be] hover:bg-[#005f9e]"
        >
          {t("form.sendButton")}
        </Button>
      </form>
    </Form>
  );
}
