"use client";

import { motion, useScroll, useTransform, useMotionTemplate } from "framer-motion";
import Image from "next/image";

export default function BackgroundLogo() {
  const { scrollYProgress } = useScroll();

  // Fade + micro-scale (same)
  const opacity = useTransform(scrollYProgress, [0, 0.35, 1], [1, 0.85, 0.85]);
  const scale   = useTransform(scrollYProgress, [0, 0.35, 1], [1.10, 1.0, 1.0]);

  // Gentle vertical parallax
  const y       = useTransform(scrollYProgress, [0, 0.35, 1], ["1vh", "6vh", "2vh"]);
  // Blur amount (number) → CSS filter string using useMotionTemplate
  const blurPx  = useTransform(scrollYProgress, [0, 0.35, 1], [0, 6, 6]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] flex items-start justify-center"
      style={{ opacity }}
    >
      <motion.div
        className="mt-[88px] md:mt-[124px] will-change-transform"
        style={{ scale, y, filter }}
      >
        <Image
          src="/fs-logo.svg"
          alt=""
          width={540}
          height={480}
          className="w-[200px] md:w-[700px] h-auto opacity-100"
          priority
        />
      </motion.div>
    </motion.div>
  );
}