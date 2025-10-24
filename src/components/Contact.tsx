'use client';
import type { FormEvent } from "react";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

const INFO_CONFIG = [
  { key: "phone", icon: Phone },
  { key: "email", icon: Mail },
  { key: "location", icon: MapPin },
] as const;

const Contact = () => {
  const t = useTranslations("contact");
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    toast({
      title: t("form.successTitle"),
      description: t("form.successDescription"),
    });
    event.currentTarget.reset();
  };

  return (
    <section id="contact" className="bg-muted py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-4xl font-bold text-foreground lg:text-5xl">
                {t("heading")} <span className="bg-gradient-primary bg-clip-text text-transparent">{t("highlight")}</span>
              </h2>
              <p className="text-xl text-muted-foreground">{t("description")}</p>
            </div>

            <div className="space-y-6">
              {INFO_CONFIG.map(({ key, icon: Icon }) => {
                return (
                  <div key={key} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-primary">
                      <Icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <div>
                      <h4 className="mb-1 font-semibold text-foreground">{t(`info.${key}.title`)}</h4>
                      <p className="text-muted-foreground">{t(`info.${key}.value`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, margin: "-120px" }}
            className="rounded-3xl bg-card p-8 shadow-medium"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="fullName">
                  {t("form.nameLabel")}
                </label>
                <Input
                  id="fullName"
                  name="fullName"
                  placeholder={t("form.namePlaceholder")}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="email">
                  {t("form.emailLabel")}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("form.emailPlaceholder")}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="phone">
                  {t("form.phoneLabel")}
                </label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder={t("form.phonePlaceholder")}
                  className="h-12"
                  required
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground" htmlFor="message">
                  {t("form.messageLabel")}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("form.messagePlaceholder")}
                  className="min-h-32 resize-none"
                  required
                />
              </div>
              <Button
                type="submit"
                className="h-12 w-full text-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-strong"
              >
                {t("form.submit")}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
