import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center ml-2 md:mr-24">
      <Image
        src="/images/mbl-logo.png"
        width={35}
        height={35}
        alt="My Book Library logo"
      />
      <span className="hidden sm:flex self-center text-xl tracking-tight font-extrabold whitespace-nowrap dark:text-white ml-3">
        My Book Library
      </span>
    </Link>
  );
}
