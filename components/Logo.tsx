import Image from "next/image";

export function Logo({
  className = "h-12 w-auto",
  preload = false,
}: {
  className?: string;
  preload?: boolean;
}) {
  return (
    <Image
      src="/images/logo.png"
      alt="Usagi Art"
      width={452}
      height={512}
      className={className}
      preload={preload}
    />
  );
}
