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
      width={980}
      height={1111}
      className={className}
      preload={preload}
    />
  );
}
