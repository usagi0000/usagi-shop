import Link from "next/link";
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
    <footer className="mt-4 border-t border-line bg-cream text-ink">
      <div className="mx-auto grid max-w-page gap-10 px-4 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Logo className="h-10 w-auto" />
            <span className="font-display text-lg font-bold">Usagi Art</span>
          </div>
          <p className="mt-2 text-sm text-ink-soft">Thank you for supporting my passion!</p>
          <div className="mt-4 flex items-center gap-4">
            <a
              href={KOFI_PAGE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ko-fi"
              className="text-ink hover:text-pink-deep"
            >
              <KoFiIcon className="h-8 w-8" />
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-ink hover:text-pink-deep"
            >
              <InstagramIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
        <FooterCol title="Help" links={HELP} />
        <FooterCol title="About" links={ABOUT} />
        <div>
          <h2 className="font-display text-sm font-bold">Newsletter</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Be the first to know about new releases and special offers!
          </p>
          <NewsletterForm />
        </div>
      </div>
      <p className="pb-6 text-center text-xs text-ink-soft">
        © 2026 Usagi Art. All rights reserved. <span className="text-pink-deep">♡</span>
      </p>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { href: string; label: string }[] }) {
  return (
    <div>
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
