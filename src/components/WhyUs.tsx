'use client';

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const FEATURE_CONFIG = [
  {
    key: "experts",
    image: "/doctor-trust.jpg",
  },
  {
    key: "technology",
    image: "/technology.jpg",
  },
  {
    key: "personalizedCare",
    image: "/team.jpg",
  },
] as const;

const WhyUs = () => {
  const t = useTranslations("whyUs");

  return (
    <section id="about" className="bg-background py-24">
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
          <p className="mx-auto max-w-3xl text-xl text-muted-foreground">{t("description")}</p>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-3">
          {FEATURE_CONFIG.map((feature, index) => (
            <motion.article
              key={feature.key}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-80px" }}
              className="group space-y-6 transition-transform duration-300 hover:-translate-y-2"
            >
              <div className="relative overflow-hidden rounded-3xl shadow-medium transition-shadow duration-300 group-hover:shadow-strong">
                <Image
                  src={feature.image}
                  alt={t(`features.${feature.key}.title`)}
                  width={640}
                  height={420}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
              <div className="space-y-3">
                <h3 className="text-2xl font-semibold text-foreground">{t(`features.${feature.key}.title`)}</h3>
                <p className="leading-relaxed text-muted-foreground">{t(`features.${feature.key}.description`)}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyUs;
