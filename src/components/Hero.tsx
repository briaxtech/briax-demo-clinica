'use client';

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const textVariants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

const Hero = () => {
  const t = useTranslations("hero");
  const perks = [t("perks.first"), t("perks.second")];

  const scrollToContact = () => {
    if (typeof window === "undefined") {
      return;
    }
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden bg-gradient-hero">
      <div className="container mx-auto px-6 py-20 lg:px-12 lg:py-0">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial="hidden"
            animate="show"
            transition={{ staggerChildren: 0.15 }}
            className="space-y-8"
          >
            <motion.h1
              variants={textVariants}
              className="text-5xl font-bold leading-tight text-foreground lg:text-7xl"
            >
              {t("heading")}{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">{t("highlight")}</span>
            </motion.h1>
            <motion.p
              variants={textVariants}
              className="text-xl leading-relaxed text-muted-foreground lg:text-2xl"
            >
              {t("description")}
            </motion.p>
            <motion.div variants={textVariants} className="flex flex-col gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group h-12 bg-primary text-lg transition-all duration-300 hover:bg-primary-dark hover:shadow-strong"
                onClick={scrollToContact}
              >
                {t("primaryCta")}
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 border-2 border-primary text-lg text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
                onClick={() => {
                  if (typeof window === "undefined") {
                    return;
                  }
                  document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {t("secondaryCta")}
              </Button>
            </motion.div>
            <motion.div variants={textVariants} className="flex items-center gap-8 pt-6 text-sm text-muted-foreground">
              {perks.map((perk) => (
                <div key={perk} className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                  <span>{perk}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 rounded-full bg-gradient-primary opacity-20 blur-3xl" aria-hidden />
            <div className="relative overflow-hidden rounded-3xl shadow-strong">
              <Image
                src="/hero-image.jpg"
                alt={t("imageAlt")}
                priority
                width={1200}
                height={900}
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
