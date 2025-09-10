"use client";

import Image from "next/image";
import Link from "next/link";
export default function LogoBand() {
  return null;
    <div
      className="
        fixed 
        top-[39px]   /* adjust so it sits below your nav height */
        left-1/2 
        -translate-x-1/2 
        z-10         /* lower than hero image */
        bg-transparent
        "
      >
<div className="relative z-30 bg-brand-cream">
  <div className="mx-auto max-w-6xl px-4">
    <div className="flex h-[100px] md:h-[190px] items-center justify-center">
      <Link href="/" aria-label="FS Blends — Home" className="block"></Link>
      <Image
        src="/fs-logo.svg"
        alt="FS Blends"
        width={360}
        height={320}
        className="w-[200px] md:w-[260px] h-auto"
        priority
      />
    </div>
    </div>
    </div>
    </div>
  );
}
