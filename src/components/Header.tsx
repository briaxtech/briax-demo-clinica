'use client';

import { useState } from "react";
import Image from "next/image";
import { Check, ChevronDown, Menu } from "lucide-react";
import { motion } from "framer-motion";
import { useLocale, useTranslations } from "next-intl";

import { locales } from "@/i18n/config";
import { usePathname, useRouter } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { key: "home", href: "#home" },
  { key: "services", href: "#services" },
  { key: "about", href: "#about" },
] as const;

const Header = () => {
  const [open, setOpen] = useState(false);
  const t = useTranslations("navbar");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const scrollTo = (selector: string) => {
    if (typeof window === "undefined") {
      return;
    }

    setOpen(false);
    window.setTimeout(() => {
      document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleLocaleChange = (nextLocale: string) => {
    if (nextLocale === locale) {
      return;
    }

    const currentUrl = typeof window !== "undefined" ? new URL(window.location.href) : null;

    if (currentUrl && currentUrl.search) {
      const query = Object.fromEntries(currentUrl.searchParams.entries());
      router.replace({ pathname, query }, { locale: nextLocale });
    } else {
      router.replace(pathname, { locale: nextLocale });
    }

    if (currentUrl?.hash) {
      const hash = currentUrl.hash;
      requestAnimationFrame(() => {
        if (hash) {
          window.location.hash = hash;
        }
      });
    }

    router.refresh();

    setOpen(false);
  };

  const renderLanguageSelect = (triggerClassName = "w-36") => (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          aria-label={t("languageLabel")}
          className={cn(
            "flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground transition-colors ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 hover:border-primary",
            triggerClassName,
          )}
        >
          <span className="truncate">{t(`languages.${locale}`)}</span>
          <ChevronDown className="h-4 w-4 opacity-60" aria-hidden />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={4}
        className="min-w-[8rem] p-1 data-[side=top]:slide-in-from-bottom-2 data-[side=bottom]:slide-in-from-top-2 data-[state=open]:animate-in data-[state=closed]:animate-out"
      >
        {locales.map((option) => (
          <DropdownMenuItem
            key={option}
            onSelect={() => handleLocaleChange(option)}
            className={cn(
              "flex cursor-pointer items-center justify-between gap-2 rounded-sm px-3 py-1.5 text-sm transition-colors data-[highlighted]:bg-primary data-[highlighted]:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
              locale === option && "font-semibold",
            )}
          >
            <span>{t(`languages.${option}`)}</span>
            {locale === option ? <Check className="h-4 w-4" aria-hidden /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-lg"
    >
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex h-20 items-center justify-between">
          <button
            onClick={() => scrollTo("#home")}
            className="flex items-center gap-3 text-left transition-opacity hover:opacity-80"
            aria-label={t("brandAria")}
          >
            <Image
              src="/logo.png"
              alt={t("brand")}
              width={48}
              height={48}
              className="h-12 w-12"
              priority
            />
            <span className="text-2xl font-bold text-foreground">{t("brand")}</span>
          </button>

          <nav className="hidden items-center gap-6 md:flex">
            {NAV_ITEMS.map(({ key, href }) => (
              <button
                key={href}
                onClick={() => scrollTo(href)}
                className="text-sm font-medium text-foreground transition-colors hover:text-primary"
              >
                {t(`items.${key}`)}
              </button>
            ))}
            <Button
              onClick={() => scrollTo("#contact")}
              className="bg-primary transition-all duration-300 hover:bg-primary-dark"
            >
              {t("contactCta")}
            </Button>
            {renderLanguageSelect()}
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label={t("openMenuAria")}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px]">
              <nav className="mt-8 flex flex-col gap-6">
                {NAV_ITEMS.map(({ key, href }) => (
                  <button
                    key={href}
                    onClick={() => scrollTo(href)}
                    className="text-left text-lg font-medium text-foreground transition-colors hover:text-primary"
                  >
                    {t(`items.${key}`)}
                  </button>
                ))}
                <Button
                  onClick={() => scrollTo("#contact")}
                  className="w-full bg-primary transition-all duration-300 hover:bg-primary-dark"
                >
                  {t("contactCta")}
                </Button>
                <div className="space-y-2 pt-2">
                  <p className="text-sm font-medium text-muted-foreground">{t("languageLabel")}</p>
                  {renderLanguageSelect("w-full")}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
