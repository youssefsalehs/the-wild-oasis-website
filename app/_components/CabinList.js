import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";
import { unstable_noStore as noStore } from "next/cache";

export default async function CabinsList({ filter }) {
  noStore();
  const cabins = await getCabins();
  let filtered = [];
  if (!cabins.length) return null;
  if (filter === "all") {
    filtered = cabins;
  } else if (filter === "small") {
    filtered = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  } else if (filter === "medium") {
    filtered = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );
  } else if (filter === "large") {
    filtered = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filtered.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}
