'use client';

import type { FormEventHandler } from 'react';

const INPUT_ID = 'apiKey' as const;

export default function Home() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-neutral-100">
          Enter your API key
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <input
              id={INPUT_ID}
              name={INPUT_ID}
              type="text"
              placeholder="API key"
              className="block w-full rounded-md border-0 bg-neutral-100/5 py-1.5 text-neutral-100 shadow-sm ring-1 ring-inset ring-neutral-100/10 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 placeholder:text-neutral-400"
            />
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-primary-600 px-3 py-1.5 text-sm font-semibold leading-6 text-neutral-100 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
            >
              Jump in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
