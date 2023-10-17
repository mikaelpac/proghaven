import React from "react";

interface DropDownProps {
  children: React.ReactNode;
  label?: string | null;
}

const DropDown: React.FC<DropDownProps> = ({ children, label }) => {
  return (
    <div className="absolute z-10 w-[300px] mt-2 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
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
