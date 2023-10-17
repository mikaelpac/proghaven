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
        <div className="cursor-pointer px-6 py-2">
          {Icon && <Icon />} {name}
        </div>
      </li>
      {/*       {!isLast ? <Separator className="bg-[#242424]" /> : null} */}
    </>
  );
};

export default DropDownItem;
