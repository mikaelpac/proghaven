"use client";

import React from "react";
import { Separator } from "../separator";

interface DropDownItemProps {
  Icon: React.ElementType | null;
  name: string;
  onClick: () => void;
  isLast: boolean;
}

const DropDownItem: React.FC<DropDownItemProps> = ({
  Icon,
  name,
  onClick,
  isLast,
}) => {
  return (
    <>
      <li className="cursor-pointer" onClick={onClick}>
        <div className="cursor-pointer px-3 py-2   bg-[#242424] text-[#A7A7A7] hover:bg-[#a7a7a7] hover:text-white">
          {Icon && <Icon />} {name}
        </div>
      </li>
      {/*       {!isLast ? <Separator className="bg-[#242424]" /> : null} */}
    </>
  );
};

export default DropDownItem;
