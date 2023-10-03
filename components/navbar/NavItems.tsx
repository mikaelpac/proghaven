"use client";
import { BiSearch } from "react-icons/bi";
import Link from "next/link";

const NavItems = () => {
  return (
    <div className=" w-auto py-2 rounded-md shadow-sm hover:shadow-md transition curser-pointer">
      <div className="flex flex-row items-center justify-between">
        <Link href="/reviews">
          <div className="text-sm font-semibold px-6 cursor-pointer text-gray-200">
            Reviews
          </div>
        </Link>
        <Link href="/blog">
          <div className="text-sm font-semibold px-6 flex-1 text-center text-gray-200 cursor-pointer">
            Blog
          </div>
        </Link>
        <div className="text-sm pl-6 pr-2 text-gray-600 md:flex flex-row hidden items-center gap-3">
          <div className=" hidden sm:block w-[80px]">Find Artist</div>
          <div className="p-2 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavItems;
