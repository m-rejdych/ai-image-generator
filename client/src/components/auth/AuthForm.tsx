'use client';

import { type FormEventHandler, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/Button';
import { login } from '@/services/auth';
import { BASE_APP_URL } from '@/constants/urls';

const INPUT_ID = 'apiKey' as const;

export default function AuthForm() {
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    router.refresh();
  }, []);

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (!apiKey.trim()) return;

    setLoading(true);
    try {
      const { isAuth } = await login(apiKey);
      if (isAuth) {
        router.push(BASE_APP_URL);
      }
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <input
            id={INPUT_ID}
            name={INPUT_ID}
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            type="text"
            placeholder="API key"
            className="block w-full rounded-md border-0 bg-neutral-100/5 py-1.5 text-neutral-100 shadow-sm ring-1 ring-inset ring-neutral-100/10 focus:ring-2 focus:ring-inset focus:ring-primary-500 sm:text-sm sm:leading-6 placeholder:text-neutral-400"
          />
        </div>

        <div>
          <Button type="submit" disabled={loading}>
            Jump in
          </Button>
        </div>
      </form>
    </div>
  );
}
