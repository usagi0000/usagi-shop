export function Sparkle({ className = "h-3 w-3 text-gold" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden>
      <path
        d="M8 0 L9.4 6.6 L16 8 L9.4 9.4 L8 16 L6.6 9.4 L0 8 L6.6 6.6 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function SearchIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16 L20.5 20.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

export function UserIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="8" r="3.4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M5 19.5 c1.6-3.4 4-5 7-5 s5.4 1.6 7 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function BagIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M6 8 h12 l-.8 11.2 a1.5 1.5 0 0 1-1.5 1.3 H8.3 a1.5 1.5 0 0 1-1.5-1.3 L6 8 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 8 V7.2 A3 3 0 0 1 15 7.2 V8"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function CartPlusIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 5 h2 l.6 2 m0 0 L8.2 14 h9.4 L20 7 H6.6"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="9.2" cy="18.2" r="1.4" fill="currentColor" />
      <circle cx="16.6" cy="18.2" r="1.4" fill="currentColor" />
    </svg>
  );
}

export function KoFiIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={className} aria-hidden>
      <path
        d="M6.2 10.6 h14.9 v9.5 a5.2 5.2 0 0 1-5.2 5.2 H11.4 a5.2 5.2 0 0 1-5.2-5.2 V10.6 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M21.1 12.2 h2.6 a3.6 3.6 0 0 1 0 7.2 H21.1"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path
        d="M13.7 16.3 c0-1.15 .95-1.9 1.9-1.28 .95-.62 1.9 .13 1.9 1.28 0 1.2-1.9 2.6-1.9 2.6 s-1.9-1.4-1.9-2.6 Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.1" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.15" cy="6.85" r="1.15" fill="currentColor" />
    </svg>
  );
}

export function Leaf({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M5 19 C8 8 16 5 21 4 C20 14 12 20 5 19 Z"
        fill="#8fbf84"
        stroke="#4a3728"
        strokeWidth="1.2"
      />
      <path d="M8 17 C12 12 16 8 20 6" stroke="#4a3728" strokeWidth="1" fill="none" />
    </svg>
  );
}
