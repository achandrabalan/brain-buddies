import React from 'react';
import NavBar from '../components/NavBar';
import { useState, useEffect } from 'react';
import { supabase } from '../utils/supabase';
import { useRouter } from 'next/router';
import toast, { Toaster } from 'react-hot-toast';
import { stringify } from 'postcss';

export default function Profile() {
  const [userID, setUserID] = useState('');
  const router = useRouter();

  // fields
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fileName, setFileName] = useState('');

  // get user
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUserID(user.id);
    };
    fetchUser();
  }, []);

  // get existing profile from supabase
  useEffect(() => {
    const fetchProfile = async () => {
      if (!userID) return;
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userID)
        .single();
      if (error) {
        console.log(error);
        toast.error(error.message);
      } else {
        setUsername(data.username);
        setFirstName(data.first_name);
        setLastName(data.last_name);
      }
    };
    fetchProfile();
  }, [userID]);

  const handleFileUpload = (e) => {
    setFileName(e.target.files[0].name);
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.log(error);
      toast.error('Error logging out');
      return;
    }
    toast.success('Logged out');
    router.push('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <NavBar name={'refactors'} />
      <div className="flex h-[70px] justify-center items-center"></div>

      <form>
        <div class="flex flex-col space-y-12 items-center justify-center h-screen w-full ">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 class="text-lg font-bold leading-7 text-gray-900">Profile</h2>
            <p class="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label
                  for="username"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Username
                </label>
                <div class="mt-2">
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      type="text"
                      name="username"
                      id="username"
                      autocomplete="username"
                      className="pl-2 block flex-1 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-brain focus:ring-brain focus:border-brain focus:border-3 "
                      placeholder="janesmith"
                      value={username}
                      onChange={(e) => {
                        setUsername(e.target.value);
                      }}
                    />
                  </div>
                </div>
                {true && (
                  <span className="text-sm text-red-600">
                    username is taken
                  </span>
                )}
              </div>
              <div class="sm:col-span-4">
                <label
                  for="first_name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  First Name
                </label>
                <div class="mt-2">
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      type="text"
                      name="first_name"
                      id="first_name"
                      autocomplete="first_name"
                      className="pl-2 block flex-1 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-brain focus:ring-brain focus:border-brain focus:border-3 "
                      placeholder="janesmith"
                      value={firstName}
                    />
                  </div>
                </div>
              </div>
              <div class="sm:col-span-4">
                <label
                  for="last_name"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Last Name
                </label>
                <div class="mt-2">
                  <div class="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300  sm:max-w-md">
                    <input
                      type="text"
                      name="last_name"
                      id="last_name"
                      autocomplete="last_name"
                      className="pl-2 block flex-1 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6 focus:outline-brain focus:ring-brain focus:border-brain focus:border-3 "
                      placeholder="janesmith"
                      value={lastName}
                    />
                  </div>
                </div>
              </div>

              <div class="col-span-full">
                <label
                  for="cover-photo"
                  class="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div class="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div class="text-center">
                    <svg
                      class="mx-auto h-12 w-12 text-gray-300"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0021 18v-1.94l-2.69-2.689a1.5 1.5 0 00-2.12 0l-.88.879.97.97a.75.75 0 11-1.06 1.06l-5.16-5.159a1.5 1.5 0 00-2.12 0L3 16.061zm10.125-7.81a1.125 1.125 0 112.25 0 1.125 1.125 0 01-2.25 0z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <div class="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        for="file-upload"
                        class="relative cursor-pointer rounded-md bg-white font-semibold text-brain"
                      >
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          class="sr-only"
                          onChange={(e) => {
                            handleFileUpload(e);
                          }}
                        />
                      </label>
                      <p class="pl-1">or drag and drop</p>
                    </div>
                    <p class="text-xs leading-5 text-gray-600">
                      PNG, JPG up to 10MB
                    </p>
                    {fileName && (
                      <p class="text-xs pt-4 font-bold leading-5 text-gray-600">
                        {fileName}
                      </p>
                    )}
                  </div>
                </div>
                {true && (
                  <span className="text-sm text-red-600">
                    file size too large
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-x-3">
              <button
                onClick={(e) => {
                  handleSubmit(e);
                }}
                className="flex w-full mt-10 justify-center hover:border-brain hover:border-[2px]  hover:bg-white hover:text-brain rounded-md bg-brain px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brain"
              >
                Save
              </button>
              <button
                onClick={(e) => {
                  handleLogout(e);
                }}
                className="flex w-full mt-10 justify-center rounded-md bg-white px-3 py-1.5 text-sm font-semibold leading-6 text-brain hover:text-white hover:bg-brain shadow-sm focus-visible:outline focus-visible:outline-2 border-[2px] border-brain focus-visible:outline-brain"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
