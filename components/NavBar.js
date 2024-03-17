import React from 'react';
import Hamburger from 'hamburger-react';
import Link from 'next/link';

const NavBar = () => {
  const [menuToggled, setMenuToggled] = React.useState(false);

  return (
    <div className="absolute z-50 flex w-full h-[65px] items-center bg-white justify-between border-b-[1px] border-gray-300">
      <div className="flex items-center">
        <Hamburger
          toggled={menuToggled}
          toggle={setMenuToggled}
          size={27}
          distance="sm"
        />
        <h1 className=" text-3xl ml-3 font-angkor">Brain Buddies</h1>
      </div>
      <div className="flex">
        <Link href="/sign-up">
          <button className="bg-black hover:bg-[#363636] hover:text-white text-white text-md font-bold border-[1px] border-black  py-1 px-8 rounded-[4px] mr-4">
            Sign up
          </button>
        </Link>
        <Link href="/login">
          <button className="bg-white hover:bg-[#363636] hover:text-white text-black text-md font-bold border-[1px] border-black  py-1 px-8 rounded-[4px] mr-4">
            Log in
          </button>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
