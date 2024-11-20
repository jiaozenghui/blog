import CardList from "@/components/cardList/CardList";

const Home = () => {
  return (
    <div className="mt-9 flex flex-col gap-9 md:overflow-hidden">
      <section className="flex flex-col gap-5">
        <h1 className="text-20 font-bold  ">Trending Podcasts</h1>
        <div className=" flex flex-1 flex-col gap-4 p-4">
          <CardList />
        </div>
      </section>
    </div>
  );
};

export default Home;
