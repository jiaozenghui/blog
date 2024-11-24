import React from "react";
import styles from "./cardList.module.css";
//import Pagination from "../pagination/Pagination";
import Image from "next/image";
import Card from "../card/Card";
import { articleListItemType } from "@/types/article";

import LoaderSpinner from "@/components/LoaderSpinner";
import useFetch from "@/common/hooks/useFetch";
import { Get } from "@axios";
import { type ListData } from "axios";

const CardList = async ({ page, cat }: any) => {
  let [err, data] = await Get<ListData<articleListItemType>>(
    "/api/articles/list"
  );
  const POST_PER_PAGE = 2;

  // const hasPrev = POST_PER_PAGE * (page - 1) > 0;
  // const hasNext = POST_PER_PAGE * (page - 1) + POST_PER_PAGE < count;

  return (
    <div className='grid  gap-y-4 ' >
        {data?.data?.list?.map((item: any) => (
          <Card item={item} key={item._id} />
        ))}
    </div>
  );
};

export default CardList;
