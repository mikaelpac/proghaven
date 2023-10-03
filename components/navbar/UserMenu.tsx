"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Link from "next/link";

import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";

const UserMenu = (user: any) => {
  const [isOpen, setIsOpen] = useState(false);

  console.log(user);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div>
          <Link href="/login">
            <div className="bg-red-500 px-4 py-2 rounded-md text-sm md:text-md">
              Login
            </div>
          </Link>
        </div>
      </div>
      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-[200px] bg-white overflow-hidden right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            <>
              <MenuItem onClick={() => {}} label="Login" />
              <MenuItem onClick={() => {}} label="Sign up" />
            </>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
