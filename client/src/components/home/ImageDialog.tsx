import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CldImage } from 'next-cloudinary';
import { TrashIcon } from '@heroicons/react/20/solid';

import Loader from '@/components/home/Loader';
import Button from '@/components/atoms/Button';

interface Props {
  open: boolean;
  url: string;
  alt: string;
  onClose: () => void;
  onClosed: () => void;
}

export default function ImageDialog({ open, url, alt, onClose, onClosed }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const handleClear = (): void => {
    setIsLoaded(false);
    onClosed();
  };

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={handleClear}>
      <Dialog initialFocus={imageRef} as="div" className="relative z-10" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex flex-col min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-neutral-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-[calc(100vh-4.5rem)] xl:max-w-5xl sm:p-6 aspect-1 w-screen">
                <CldImage
                  ref={imageRef}
                  src={url}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1280px) 100vh, (min-width: 1280px) 1024px"
                  onLoad={() => setIsLoaded(true)}
                />
                {!isLoaded && (
                  <div className="h-full flex items-center justify-center">
                    <Loader />
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-neutral-900 shadow-xl transition-all">
                <Button variant="error" className=" aspect-1">
                  <TrashIcon className="w-5 h-5" />
                </Button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
