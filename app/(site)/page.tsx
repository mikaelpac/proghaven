import Image from "next/image";

export default function Home() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Featured Albums */}
        <div className="p-4 bg-white shadow-lg rounded-sm">
          <h2 className="text-xl font-semibold mb-2">Featured Albums</h2>
          {/* Display featured albums here */}
        </div>

        {/* Latest Reviews */}
        <div className="p-4 bg-white shadow-lg rounded-sm">
          <h2 className="text-xl font-semibold mb-2">Latest Reviews</h2>
          {/* Display latest reviews here */}
        </div>

        {/* News */}
        <div className="p-4 bg-white shadow-lg rounded-sm">
          <h2 className="text-xl font-semibold mb-2">News</h2>
          {/* Display news articles here */}
        </div>

        {/* Featured Artists */}
        <div className="p-4 bg-white shadow-lg rounded-sm col-span-2">
          <h2 className="text-xl font-semibold mb-2">Featured Artists</h2>
          {/* Display featured artists here */}
        </div>

        {/* Upcoming Releases */}
        <div className="p-4 bg-white shadow-lg rounded-sm">
          <h2 className="text-xl font-semibold mb-2">Upcoming Releases</h2>
          {/* Display upcoming releases here */}
        </div>

        {/* Forum Threads */}
        <div className="p-4 bg-white shadow-lg rounded-sm">
          <h2 className="text-xl font-semibold mb-2">Forum Threads</h2>
          {/* Display forum threads here */}
        </div>
      </div>
    </div>
  );
}
