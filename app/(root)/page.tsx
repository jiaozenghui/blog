import CardList from "@/components/cardList/CardList";

const Home = () => {
  return (
    <div className="mt-3 flex flex-col gap-9 ">
      <section className="flex flex-col gap-3">
        <h1 className="text-xl font-bold  ">All Articles</h1>
        <div className=" flex flex-1 flex-col gap-4">
          <CardList />
        </div>
      </section>
    </div>
  );
};

export default Home;
