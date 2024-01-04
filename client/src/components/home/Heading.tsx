'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import Button from '@/components/atoms/Button';
import PromptInput from '@/components/home/PromptInput';
import { logout } from '@/services/auth';
import { AUTH_URL } from '@/constants/urls';

export default function Heading() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    setIsLoading(true);

    try {
      if (await logout()) {
        router.push(AUTH_URL);
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-6">
        <div className="md:flex md:items-center md:justify-between mb-3">
          <div className="min-w-0 flex-1">
            <h2 className="text-2xl font-bold leading-7 text-white sm:truncate sm:text-3xl sm:tracking-tight">
              Generate an image
            </h2>
          </div>
          <div className="mt-4 flex flex-col md:flex-row md:ml-4 md:mt-0">
            <Button
              type="button"
              disabled={isLoading}
              onClick={() => setOpen(true)}
              className="whitespace-nowrap"
            >
              Add image
            </Button>
            <Button
              type="button"
              variant="secondary"
              className="whitespace-nowrap mt-4 md:ml-4 md:mt-0"
              disabled={isLoading}
              onClick={handleLogout}
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center" aria-hidden="true">
            <div className="w-full border-t border-neutral-500" />
          </div>
          <div className="relative flex justify-center">
            <span className="bg-neutral-900 px-3 text-base font-semibold leading-6 text-neutral-300">
              Images
            </span>
          </div>
        </div>
      </div>
      <PromptInput open={open} onClose={() => setOpen(false)} />
    </>
  );
}
