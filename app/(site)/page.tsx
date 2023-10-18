import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-4 max-w-[1100px]">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="p-4 bg-white shadow-lg rounded-lg lg:col-span-2">
          <h2 className="text-xl font-semibold mb-2">New Reviews</h2>
        </div>

        <div className="p-4 bg-white shadow-lg rounded-lg lg:col-span-1">
          <h2 className="text-xl font-semibold mb-2">Trending Albums</h2>
        </div>
      </div>
    </div>
  );
}
