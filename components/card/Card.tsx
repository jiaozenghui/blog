import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { articleListItemType } from "@/types/article";

const Card = ({ item, key }: { item: articleListItemType; key: string }) => {
  return (
    <div
      className=" mx-auto  cursor-pointer
     gap-y-4 hover:bg-slate-100 dark:hover:bg-gray-800  rounded-lg shadow-md overflow-hidden  ring-1 ring-slate-500/5"
    >
      <div className="md:flex">
        <div className="md:shrink-0">
          <Image
            width={20}
            height={30}
            className="h-48 w-full object-cover md:h-full md:w-24"
            src={item.coverImg}
            alt=""
          />
        </div>
        <div className="p-4 relative">
          <h3 className=" text-xl text-slate-500 font-bold">
            Company retreats
          </h3>
          <p className="mt-2 line-clamp-3  whitespace-break-spaces mb-6">
            Looking to take your team away on a retreat to enjoy awesome food
            and take in some sunshine? We have a list of places to do just that.
          </p>
          <div className="absolute inset-x-0 bottom-0  flex items-center justify-end py-3 pr-4 gap-4 content-center">
            <span className="text-slate-400">User</span>
            <span className="text-slate-400">2024-03-10 04:27:08</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
