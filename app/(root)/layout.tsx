import LeftSidebar from "@/components/LeftSidebar";
import MobileNav from "@/components/MobileNav";
import RightSidebar from "@/components/RightSidebar";
import Image from "next/image";
import { Toaster } from "@/components/ui/toaster";
import PodcastPlayer from "@/components/PodcastPlayer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative flex flex-col">
      <main className="relative flex">
        <section className="flex min-h-screen flex-1 flex-col ">
          <div className="mx-auto flex w-full flex-col ">
            <div className="flex flex-col md:pb-14">
              <Toaster />

              {children}
            </div>
          </div>
        </section>

        <RightSidebar />
      </main>

      <PodcastPlayer />
    </div>
  );
}
