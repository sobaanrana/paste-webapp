import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex flex-row gap-4 justify-center items-center mb-5  p-4  bg-red-300  ">
      <NavLink to="/" className="font-bold">
        Home
      </NavLink>
      <NavLink to="/pastes" className="font-bold">
        Pastes
      </NavLink>
    </div>
  );
};

export default Navbar;
