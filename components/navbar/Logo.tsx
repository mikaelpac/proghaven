"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

const Logo = () => {
  const router = useRouter();

  return (
    <div
      className="flex justify-start cursor-pointer xl:text-2xl md:text-xl text-md px-2"
      onClick={() => router.push("/")}
    >
      <span className="font-semibold">Prog</span>
      <span className="text-red-600 font-semibold">haven</span>
    </div>
  );
};

export default Logo;
