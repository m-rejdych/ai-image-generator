import Image from 'next/image';
import { cookies } from 'next/headers';

import Empty from '@/components/home/Empty';
import AddImageButton from '@/components/home/AddImageButton';
import Heading from '@/components/home/Heading';
import { getImages } from '@/services/image';

export default async function App() {
  const images = await getImages(cookies().toString());

  return images.length ? (
    <div className="min-h-screen p-4 sm:p-6 lg:p-20">
    <Heading />
      <ul
        role="list"
        className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
      >
        {images.map(({ id, url, name }) => (
          <li key={id} className="relative">
            <div className="group aspect-h-7 aspect-w-7 block w-full overflow-hidden rounded-lg bg-neutral-900 focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 focus-within:ring-offset-neutral-900">
              <Image
                fill
                sizes="(max-width: 1024px) 300px, (min-width: 1024px) 240px"
                src={url}
                alt={name}
                className="pointer-events-none object-cover group-hover:opacity-75"
              />
              <button type="button" className="absolute inset-0">
                <span className="sr-only">View details for {name}</span>
              </button>
            </div>
            <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-neutral-100">
              {name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <Empty />
    </div>
  );
}
