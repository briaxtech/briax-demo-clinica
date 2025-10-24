'use client';

import { motion } from "framer-motion";
import { Activity, Brain, Heart, Stethoscope } from "lucide-react";
import { useTranslations } from "next-intl";

import { Card, CardContent } from "@/components/ui/card";

const SERVICE_CONFIG = [
  { key: "cardiology", icon: Heart },
  { key: "neurology", icon: Brain },
  { key: "generalMedicine", icon: Activity },
  { key: "checkups", icon: Stethoscope },
] as const;

const Services = () => {
  const t = useTranslations("services");

  return (
    <section id="services" className="bg-muted py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 space-y-4 text-center"
        >
          <h2 className="text-4xl font-bold text-foreground lg:text-5xl">
            {t("heading")}{" "}
            <span className="bg-gradient-primary bg-clip-text text-transparent">{t("highlight")}</span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">{t("description")}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {SERVICE_CONFIG.map((service, index) => {
            return (
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card className="border-none bg-card shadow-soft transition-all duration-300 hover:-translate-y-2 hover:shadow-medium">
                  <CardContent className="space-y-4 p-8">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-primary">
                      <service.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground">{t(`items.${service.key}.title`)}</h3>
                    <p className="leading-relaxed text-muted-foreground">{t(`items.${service.key}.description`)}</p>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
