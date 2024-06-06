"use client"
import Quicks from "@/components/core/quicks/quicks";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-row bg-primary-black">
      {/* Side */}
      <nav className="w-[285px]">
      </nav>
      {/* main */}
      <main className="w-full border-l border-white">
        <div className="h-10 bg-primary-grey">
          <Image
            className="pl-3 pt-3" 
            src={"./search.svg"}
            alt="iconSearch"
            width={24}
            height={24}
          />
        </div>
        {/* button quick */}
        <div>
          <Quicks />
        </div>
      </main>
    </main>
  );
}
