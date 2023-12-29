import { Fragment, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Dialog, Transition } from '@headlessui/react';
import { CldImage } from 'next-cloudinary';
import { TrashIcon } from '@heroicons/react/20/solid';

import Loader from '@/components/home/Loader';
import Button from '@/components/atoms/Button';
import { deleteImage } from '@/services/image';

interface Props {
  open: boolean;
  id: string;
  url: string;
  alt: string;
  onClose: () => void;
  onClosed: () => void;
}

export default function ImageDialog({ open, id, url, alt, onClose, onClosed }: Props) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);
  const router = useRouter();

  const handleClear = (): void => {
    setIsLoaded(false);
    setIsDeleting(false);
    onClosed();
  };

  const handleClose = (): void => {
    if (isDeleting) return;
    onClose();
  };

  const handleDelete = async (): Promise<void> => {
    if (isDeleting) return;

    try {
      setIsDeleting(true);
      await deleteImage(id);
      router.refresh();
      onClose();
    } catch (error) {
      setIsDeleting(false);
      console.log(error);
    }
  };

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={handleClear}>
      <Dialog initialFocus={imageRef} as="div" className="relative z-10" onClose={handleClose}>
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
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-neutral-900 px-4 pb-4 pt-5 text-left shadow-xl transition-all my-8 sm:w-full sm:max-w-[calc(100vh-8.5rem)] 2xl:max-w-5xl sm:p-6 aspect-1 w-screen">
                <CldImage
                  ref={imageRef}
                  src={url}
                  alt={alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 100vh, (min-width: 1536px) 1024px"
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
                <Button
                  disabled={isDeleting}
                  variant="error"
                  className="aspect-1"
                  onClick={handleDelete}
                >
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
