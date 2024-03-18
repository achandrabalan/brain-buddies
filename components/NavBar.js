import React, { useEffect, useState } from 'react';
import Hamburger from 'hamburger-react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '../utils/supabase';
import { toast, Toaster } from 'react-hot-toast';

const NavBar = () => {
  const [menuToggled, setMenuToggled] = useState(false);
  const [signedIn, setSignedIn] = useState(false);
  const [pictureURL, setPictureURL] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Indicate loading
      const { data, error } = await supabase.auth.getSession();

      setSignedIn(!!data.session);
      if (data.session) {
        const { data: profileData, error: pictureError } = await supabase
          .from('profiles')
          .select('profile_picture_url')
          .eq('id', data.session.user.id)
          .single();

        if (pictureError) {
          toast.error(pictureError.message);
        } else if (profileData?.profile_picture_url !== pictureURL) {
          setPictureURL(profileData?.profile_picture_url);
        }
      }
      setIsLoading(false); // Loading complete
    };
    fetchData();
  }, []); // Consider dependencies if needed

  return (
    <div className="absolute z-50 flex w-full h-[85px] items-center bg-white justify-between border-b-[1px] border-gray-300">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center">
        <Hamburger
          toggled={menuToggled}
          toggle={setMenuToggled}
          size={27}
          distance="sm"
        />
        <Link href="/">
          <h1 className=" text-3xl ml-3 font-angkor cursor-pointer">
            Brain Buddies
          </h1>
        </Link>
      </div>
      {!signedIn ? (
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
      ) : isLoading ? (
        <div>Loading...</div> // Placeholder or loader
      ) : (
        <Link href="/profile">
          <img
            src={pictureURL || '/default-profile.png'}
            alt="profile picture"
            className="h-[70px] w-[70px] rounded-full mr-4 cursor-pointer border-black  "
          />
        </Link>
      )}
    </div>
  );
};

export default NavBar;
