import React from "react";

interface DropDownProps {
  children: React.ReactNode;
  label?: string | null;
}

const DropDown: React.FC<DropDownProps> = ({ children, label }) => {
  return (
    <div className="z-10 mt-2 w-[300px] bg-slate-400 divide-y divide-gray-500 rounded-lg shadow dark:bg-gray-700">
      {label && (
        <div className="px-4 py-2 text-sm text-black dark:text-gray-300 text-center">
          {label}
        </div>
      )}
      <ul className="flex flex-col text-slate-700 dark:text-slate-300">
        {children}
      </ul>
    </div>
  );
};

export default DropDown;
