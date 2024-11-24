import Image from "next/image";
import styles from "./card.module.css";
import Link from "next/link";
import { articleListItemType } from "@/types/article";
import { HeaderActions } from "../HeaderActions";
import { ChevronDown, Circle, Plus, Star } from "lucide-react"
const Card = ({ item, key }: { item: articleListItemType; key: string }) => {



  return (
    <div
      className=" mx-auto  cursor-pointer
     gap-y-4 hover:bg-accent rounded-lg shadow-md overflow-hidden  ring-1 ring-slate-500/5"
    >
      <div className="md:flex">
        <div className="md:shrink-0">
          <Image
            width={152}
            height={152}
            className="object-cover hidden md:block"
            src={item.coverImg}
            alt=""
          />
        </div>
        <div className="p-3 relative">
          <h3 className=" flex text-xl  font-bold justify-between">
            <span>Company retreats</span>
            <HeaderActions />
          </h3>
          <p className="mt-2 line-clamp-3 text-muted-foreground  whitespace-break-spaces mb-6">
            Looking to take your team away on a retreat to enjoy awesome food
            and take in some sunshine? We have a list of places to do just that.
          </p>
          <div className="flex space-x-4 text-sm justify-end text-muted-foreground">
            <div className="flex items-center">
              <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
              TypeScript
            </div>
            <div className="flex items-center">
              <Star className="mr-1 h-3 w-3" />
              20k
            </div>
            <div>Updated April 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
