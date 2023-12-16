'use client';

import { useState } from 'react';
import Image from 'next/image';

import ImageDialog from '@/components/home/ImageDialog';
import type { Image as ImageType } from '@/services/image';

interface Props {
  images: ImageType[];
}

export default function ImagesList({ images }: Props) {
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = (url: string, name: string): void => {
    setUrl(url);
    setAlt(name);
    setOpen(true);
  };

  return (
    <>
      {images.map(({ id, url, name }) => (
        <li key={id} className="relative">
          <div className="group aspect-h-7 aspect-w-7 block w-full overflow-hidden rounded-lg bg-neutral-900 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-900">
            <Image
              width={500}
              height={500}
              priority
              src={url}
              alt={name}
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0"
              onClick={() => handleOpen(url, name)}
            >
              <span className="sr-only">View details for {name}</span>
            </button>
          </div>
          <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-neutral-100">
            {name}
          </p>
        </li>
      ))}
      <ImageDialog
        open={open}
        url={url}
        alt={alt}
        onClose={() => setOpen(false)}
        onClosed={() => setUrl('')}
      />
    </>
  );
}
