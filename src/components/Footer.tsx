import Image from "next/image";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useTranslations } from "next-intl";

const SOCIAL_LINKS = [
  { key: "facebook", icon: Facebook, label: "Facebook" },
  { key: "instagram", icon: Instagram, label: "Instagram" },
  { key: "linkedin", icon: Linkedin, label: "LinkedIn" },
  { key: "twitter", icon: Twitter, label: "Twitter" },
] as const;

const SERVICE_LINKS = [
  { key: "cardiology", href: "#services" },
  { key: "neurology", href: "#services" },
  { key: "generalMedicine", href: "#services" },
  { key: "checkups", href: "#services" },
] as const;

const COMPANY_LINKS = [
  { key: "about", href: "#about" },
  { key: "team", href: "#about" },
  { key: "facilities", href: "#about" },
  { key: "blog", href: "#" },
] as const;

const Footer = () => {
  const t = useTranslations("footer");
  const navbarT = useTranslations("navbar");
  const year = new Date().getFullYear();

  return (
    <footer className="bg-foreground py-16 text-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12 grid gap-12 md:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="/logo.png"
                alt={navbarT("brand")}
                width={48}
                height={48}
                className="h-12 w-12 brightness-0 invert"
              />
              <span className="text-xl font-bold">{navbarT("brand")}</span>
            </div>
            <p className="leading-relaxed text-background/80">{t("description")}</p>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t("servicesTitle")}</h4>
            <ul className="space-y-2 text-background/80">
              {SERVICE_LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="transition-colors hover:text-background">
                    {t(`serviceLinks.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t("companyTitle")}</h4>
            <ul className="space-y-2 text-background/80">
              {COMPANY_LINKS.map((link) => (
                <li key={link.key}>
                  <a href={link.href} className="transition-colors hover:text-background">
                    {t(`companyLinks.${link.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="mb-4 font-semibold">{t("followUsTitle")}</h4>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map(({ key, icon: Icon, label }) => (
                <a
                  key={key}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-background/10 transition-colors hover:bg-background/20"
                  aria-label={label}
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-background/20 pt-8 text-center text-background/60">
          <p>{t("rights", { year })}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
