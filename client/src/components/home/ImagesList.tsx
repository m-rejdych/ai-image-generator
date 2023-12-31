'use client';

import { useState } from 'react';
import { CldImage } from 'next-cloudinary';

import ImageDialog from '@/components/home/ImageDialog';
import type { Image as ImageType } from '@/services/image';

interface Props {
  images: ImageType[];
}

export default function ImagesList({ images }: Props) {
  const [id, setId] = useState('');
  const [url, setUrl] = useState('');
  const [alt, setAlt] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = (id: string, url: string, name: string): void => {
    setId(id);
    setUrl(url);
    setAlt(name);
    setOpen(true);
  };

  const handleClose = (): void => {
    setId('');
    setUrl('');
    setAlt('');
  };

  return (
    <>
      {images.map(({ id, url, name }) => (
        <li key={id} className="relative">
          <div className="group aspect-h-7 aspect-w-7 block w-full overflow-hidden rounded-lg bg-neutral-900 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-900">
            <CldImage
              fill
              priority
              sizes="(max-width: 1024px) 300px, (min-width: 1024px) 240px"
              src={url}
              alt={name}
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
            <button
              type="button"
              className="absolute inset-0"
              onClick={() => handleOpen(id, url, name)}
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
        id={id}
        url={url}
        alt={alt}
        onClose={() => setOpen(false)}
        onClosed={() => setUrl('')}
      />
    </>
  );
}
