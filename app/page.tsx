// import LandingContent from "@/components/ui/LandingContent";
import { LandingHero } from "@/components/ui/LandingHero";
import { LandingNavbar } from "@/components/ui/LandingNavbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="h-screen bg-[#111827] overflow-hidden">
      <div className="mx-auto max-w-screen-xl h-full w-full">
        <div className="h-full">
          <LandingNavbar />
          <LandingHero />
          {/* <LandingContent /> */}
        </div>
      </div>
    </main>
  );
}
