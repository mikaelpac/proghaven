import React from "react";

interface DropDownProps {
  children: React.ReactNode;
}

const DropDown: React.FC<DropDownProps> = ({ children }) => {
  return (
    <div className="z-10 mt-2 w-[300px] bg-slate-400 divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
      <ul className=" text-sm text-gray-700 dark:text-gray-200">{children}</ul>
    </div>
  );
};

export default DropDown;
