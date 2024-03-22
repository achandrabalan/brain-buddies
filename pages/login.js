import React from 'react';
import Link from 'next/link';
import { supabase } from '../utils/supabase';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const router = useRouter();

  const handleLogin = async (event) => {
    event.preventDefault(); // Prevent the form from submitting and refreshing the page
    const { data, error } = await supabase.auth.signInWithPassword({
      email: event.target.email.value,
      password: event.target.password.value,
    });
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Login successful');
    router.push('/');
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Log in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="focus:outline-none block pl-2 w-full rounded-md border-0 py-1.5 text-gray-900  ring-gray-300 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brain focus:border-brain focus:border-3 sm:text-sm sm:leading-6"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-brain px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brain"
            >
              Log in
            </button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <Link href="/sign-up">
            <a className="ml-4 font-semibold leading-6 text-brain hover:text-brain">
              Sign up now
            </a>
          </Link>
        </p>
      </div>
    </div>
  );
}
