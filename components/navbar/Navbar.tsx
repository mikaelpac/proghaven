"use client";

import { useEffect } from "react";
import Container from "../Container";
import { useAuth } from "@/components/providers/supabase-auth-provider";
import Logo from "./Logo";
import NavItems from "./NavItems";
import UserMenu from "./UserMenu";

const Navbar = () => {
  const { user, signOut } = useAuth();

  console.log(user);

  return (
    <div className=" w-full bg-black z-10">
      <div className=" md:py-3 py-2">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <div className="flex flex-row items-center justify-between gap-6">
              <NavItems />
              {user ? <div onClick={signOut}>Logged in</div> : <div>Login</div>}
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
