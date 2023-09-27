"use client";
import { BiSearch } from "react-icons/bi";

const NavItems = () => {
  return (
    <div className=" w-auto py-2 rounded-md shadow-sm hover:shadow-md transition curser-pointer">
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6 cursor-pointer">Reviews</div>
        <div className="text-sm font-semibold px-6 flex-1 text-center cursor-pointer">
          Blog
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className=" hidden sm:block ">Find Artist</div>
          <div className="p-2 bg-red-600 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavItems;
