'use client';

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

const STATS_KEYS = ["patients", "satisfaction", "availability", "experience"] as const;

const Stats = () => {
  const t = useTranslations("stats");

  return (
    <section className="bg-gradient-primary py-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 gap-12 md:grid-cols-4">
          {STATS_KEYS.map((key, index) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, margin: "-100px" }}
              className="text-center"
            >
              <div className="text-5xl font-bold text-primary-foreground lg:text-6xl">{t(`${key}.number`)}</div>
              <div className="text-lg text-primary-foreground/90">{t(`${key}.label`)}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
