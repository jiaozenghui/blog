"use client";

// import { SignedIn, UserButton, useUser } from '@clerk/nextjs'
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Header from "./Header";
import Carousel from "./Carousel";
// import { useQuery } from 'convex/react';
import { api } from "@/convex/_generated/api";
import { useRouter } from "next/navigation";
import LoaderSpinner from "./LoaderSpinner";
import { useAudio } from "@/providers/AudioProvider";
import { cn } from "@/lib/utils";
import { PopularCard } from "./PopularCard";
import { PopularTags } from "./PopularTags";
import { FriendshipLink } from "./FriendshipLink";

const RightSidebar = () => {
  // const { user } = useUser();
  const topPodcasters = [];
  const router = useRouter();

  const { audio } = useAudio();

  return (
    <section className={cn("right_sidebar max-h-[calc(100vh-5px)]")}>
      {/* <SignedIn>
        <Link href={`/profile/${user?.id}`} className="flex gap-3 pb-12">
          <UserButton />
          <div className="flex w-full items-center justify-between">
            <h1 className="text-16 truncate font-semibold  ">{user?.firstName} {user?.lastName}</h1>
            <Image 
              src="/icons/right-arrow.svg"
              alt="arrow"
              width={24}
              height={24}
            />
          </div>
        </Link>
      </SignedIn> */}
      <PopularCard />
      <PopularTags className="mt-4" />
      <FriendshipLink className="mt-4" />
    </section>
  );
};

export default RightSidebar;
