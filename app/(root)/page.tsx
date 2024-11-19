"use client";
import PodcastCard from '@/components/PodcastCard'
import LoaderSpinner from '@/components/LoaderSpinner';
import useFetch from "@/common/hooks/useFetch";
import axios from "@axios";
import { articleListItemType } from '@/types/article';

const Home = () => {
  let { data, isLoading } = useFetch<articleListItemType[], any>(() =>
    axios.get("/api/works/templist").then((res) => res.data.data.list),
  );
  if(isLoading) return <LoaderSpinner />
  
  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className='flex flex-col gap-5'>
        <h1 className="text-20 font-bold  ">Trending Podcasts</h1>
        <div className="podcast_grid">
          {data?.map(({ id, title, desc, coverImg}) => (
            <PodcastCard 
              key={id}
              imgUrl={coverImg as string}
              title={title}
              description={desc}
              podcastId={id}
            />
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home