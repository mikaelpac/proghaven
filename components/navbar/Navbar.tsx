"use client";

import Container from "../Container";
import Logo from "./Logo";
import NavItems from "./NavItems";
import UserMenu from "./UserMenu";

const Navbar = () => {
  return (
    <div className=" w-full bg-black z-10">
      <div className=" md:py-3 py-2">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <div className="flex flex-row items-center justify-between gap-6">
              <NavItems />
              <UserMenu />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
