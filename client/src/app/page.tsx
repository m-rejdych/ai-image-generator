import { cookies } from 'next/headers';

import Empty from '@/components/home/Empty';
import Heading from '@/components/home/Heading';
import ImagesList from '@/components/home/ImagesList';
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
        <ImagesList images={images} />
      </ul>
    </div>
  ) : (
    <div className="h-screen flex justify-center items-center">
      <Empty />
    </div>
  );
}
