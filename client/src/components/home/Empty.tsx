'use client';

import { useState } from 'react';
import { PlusIcon } from '@heroicons/react/20/solid'

import PromptInput from './PromptInput';

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="text-center">
          <svg
            className="mx-auto h-12 w-12 text-neutral-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-semibold text-neutral-100">No images</h3>
          <p className="mt-1 text-sm text-neutral-500">Get started by creating a new image.</p>
          <div className="mt-6">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="inline-flex items-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-neutral-100 shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              New image
            </button>
          </div>
        </div>
      </div>
      <PromptInput open={open} onClose={() => setOpen(false)} />
    </>
  )
}

