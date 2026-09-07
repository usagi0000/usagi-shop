"use client";

import Link from "next/link";
import { useId, useState, type ReactNode } from "react";
import { InstagramIcon, KoFiIcon } from "./Icons";
import { Logo } from "./Logo";
import { NewsletterForm } from "./NewsletterForm";
import { INSTAGRAM, KOFI_PAGE } from "@/lib/site";

const HELP = [
  { href: "/contact", label: "Shipping & Delivery" },
  { href: "/contact", label: "Returns & Exchanges" },
  { href: "/contact", label: "Contact" },
];

const ABOUT = [
  { href: "/about", label: "About Me" },
  { href: "/blog", label: "Blog" },
  { href: "/custom-order", label: "Custom Order" },
];

export function Footer() {
  return (
    <footer className="mt-4 overflow-x-clip border-t border-line bg-cream text-ink">
      <div className="mx-auto grid max-w-page gap-4 px-4 py-6 md:grid-cols-2 md:gap-10 md:py-8 lg:grid-cols-4 lg:px-8">
        <div className="flex flex-col items-center text-center md:items-start md:text-left">
          <div className="flex items-center gap-2">
            <Logo className="h-10 w-auto" />
            <span className="font-display text-lg font-bold">Usagi Art</span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">Thank you for supporting my passion!</p>
          <div className="mt-4 flex items-center justify-center gap-4 md:justify-start">
            <a
              href={KOFI_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ko-fi"
              className="rounded-xl bg-pink/20 p-2.5 text-ink hover:text-pink-deep md:rounded-none md:bg-transparent md:p-0"
            >
              <KoFiIcon className="h-8 w-8" />
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="rounded-xl bg-pink/20 p-2.5 text-ink hover:text-pink-deep md:rounded-none md:bg-transparent md:p-0"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
        <MobileAccordions />
        <FooterCol title="Help" links={HELP} />
        <FooterCol title="About" links={ABOUT} />
        <div className="hidden md:block">
          <h2 className="font-display text-sm font-bold">Newsletter</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Be the first to know about new releases and special offers!
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="px-4 pb-6">
        <div className="footer-deco mx-auto mb-3 flex max-w-64 items-center justify-center gap-2 text-sm text-pink-deep md:hidden" aria-hidden>
          <span className="text-pink-deep">♡</span>
        </div>
        <p className="text-center text-xs text-ink-soft">
          © 2026 Usagi Art. All rights reserved. <span className="text-pink-deep">♡</span>
        </p>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div className="hidden md:block">
      <h2 className="font-display text-sm font-bold">{title}</h2>
      <ul className="mt-3 space-y-1.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link href={l.href} className="text-ink-soft hover:text-pink-deep">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MobileAccordions() {
  const [open, setOpen] = useState<string | null>(null);
  const helpId = useId();
  const aboutId = useId();
  const newsId = useId();

  function toggle(id: string) {
    setOpen((cur) => (cur === id ? null : id));
  }

  return (
    <div className="flex w-full min-w-0 flex-col gap-2 md:hidden">
      <AccRow
        id={helpId}
        title="Help"
        tone="help"
        open={open === "help"}
        onToggle={() => toggle("help")}
      >
        <LinkList links={HELP} />
      </AccRow>
      <AccRow
        id={aboutId}
        title="About"
        tone="about"
        open={open === "about"}
        onToggle={() => toggle("about")}
      >
        <LinkList links={ABOUT} />
      </AccRow>
      <AccRow
        id={newsId}
        title="Newsletter"
        tone="news"
        open={open === "news"}
        onToggle={() => toggle("news")}
      >
        <p className="text-sm text-ink-soft">
          Be the first to know about new releases and special offers!
        </p>
        <NewsletterForm />
      </AccRow>
    </div>
  );
}

function AccRow({
  id,
  title,
  tone,
  open,
  onToggle,
  children,
}: {
  id: string;
  title: string;
  tone: "help" | "about" | "news";
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className={`footer-acc footer-acc-${tone}`}>
      <h2 className="m-0">
        <button
          type="button"
          className="footer-acc-btn"
          aria-expanded={open}
          aria-controls={id}
          onClick={onToggle}
        >
          <span className="footer-acc-title">
            <span className="text-pink-deep" aria-hidden>
              ♡
            </span>{" "}
            {title}
          </span>
          <svg
            viewBox="0 0 24 24"
            className={`footer-acc-chevron${open ? " is-open" : ""}`}
            aria-hidden
          >
            <path d="M6 9.5 L12 15.5 L18 9.5" />
          </svg>
        </button>
      </h2>
      <div
        id={id}
        role="region"
        className={`footer-acc-panel${open ? " is-open" : ""}`}
        inert={!open}
      >
        <div className="footer-acc-body">
          <div className="footer-acc-inner">{children}</div>
        </div>
      </div>
    </div>
  );
}

function LinkList({ links }: { links: { href: string; label: string }[] }) {
  return (
    <ul className="space-y-1.5 text-sm">
      {links.map((l) => (
        <li key={l.label}>
          <Link href={l.href} className="text-ink-soft hover:text-pink-deep">
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
