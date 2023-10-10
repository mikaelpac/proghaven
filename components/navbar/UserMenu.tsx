"use client";

import Link from "next/link";

import { LogOut, Settings, User, UserCircle2, Library } from "lucide-react";

import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";

interface UserMenuProps {
  username: string | null;
  signOut: () => Promise<void>;
}

const UserMenu: React.FC<UserMenuProps> = ({ username, signOut }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className="cursor-pointer">
      <UserCircle2 color="red" size={28} />
    </div>
  );
};

export default UserMenu;
