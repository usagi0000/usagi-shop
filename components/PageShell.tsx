import type { ReactNode } from "react";

export function PageShell({
  title,
  kicker,
  children,
  center,
}: {
  title: string;
  kicker?: string;
  children: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`mx-auto max-w-page px-4 py-10 md:px-8 ${center ? "text-center" : ""}`}>
      {kicker ? <p className="font-script text-lg text-pink-deep">{kicker}</p> : null}
      <h1 className="font-display text-3xl font-bold text-ink">{title}</h1>
      <div className={`mt-6 ${center ? "mx-auto flex flex-col items-center" : ""}`}>{children}</div>
    </div>
  );
}
