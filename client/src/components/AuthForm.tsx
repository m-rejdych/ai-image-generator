'use client';

import { useState, type FormEventHandler } from 'react';
import { useRouter } from 'next/navigation';

import { login } from '@/services/auth';

const INPUT_ID = 'apiKey' as const;

export default function AuthForm() {
  const [apiKey, setApiKey] = useState('');
  const router = useRouter();

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    try {
      const success = await login(apiKey);

      if (success) {
        router.push('/app');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <input
            id={INPUT_ID}
            name={INPUT_ID}
            type="text"
            placeholder="API key"
            className="block w-full rounded-md border-0 bg-neutral-100/5 py-1.5 text-neutral-100 shadow-sm ring-1 ring-inset ring-neutral-100/10 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 placeholder:text-neutral-400"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
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
  );
}
