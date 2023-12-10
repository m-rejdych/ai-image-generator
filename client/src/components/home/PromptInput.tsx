import { Fragment, useState, useRef } from 'react';
import { Combobox, Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

import Loader from './Loader';

import { generateImage } from '@/services/image';

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Example({ open, onClose }: Props) {
  const [prompt, setPrompt] = useState('');
  const [name, setName] = useState('');
  const [showNameInput, setShowNameInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [url, setUrl] = useState('');
  const nameRef = useRef<HTMLInputElement>(null);

  const isLoading = (!imageLoaded && !!url) || loading;

  const handleClose = (): void => {
    if (isLoading) return;
    onClose();
  };

  const handleKeyDownPrompt = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    if (!prompt) return;

    setShowNameInput(true);
    setTimeout(() => nameRef.current?.focus(), 0);
  };

  const handleKeyDownName = async (e: React.KeyboardEvent<HTMLInputElement>): Promise<void> => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    if (!name) return;

    try {
      setLoading(true);
      const url = await generateImage(name, prompt);
      setUrl(url);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleClear = (): void => {
    setPrompt('');
    setName('');
    setUrl('');
    setShowNameInput(false);
    setImageLoaded(false);
  };

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={handleClear} appear>
      <Dialog as="div" className="relative z-10" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-2xl transform divide-y divide-neutral-700 overflow-hidden rounded-xl bg-neutral-900 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox disabled={loading || !!url}>
                <div className="relative">
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent disabled:text-neutral-500 px-4 text-neutral-200 placeholder:text-neutral-400 focus:ring-0 sm:text-sm"
                    placeholder="Describe your image"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDownPrompt}
                  />
                </div>
                <Transition show={showNameInput}
                  className="relative"
                  enter="transition ease-out duration-300 transform"
                  enterFrom="-translate-y-full"
                  enterTo="translate-y-0"
                >
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent disabled:text-neutral-500 px-4 text-neutral-200 placeholder:text-neutral-400 focus:ring-0 sm:text-sm"
                    placeholder="Enter a name for your image"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleKeyDownName}
                    ref={nameRef}
                  />
                </Transition>
                <Transition
                  show={!!(loading || url)}
                  className="relative w-full aspect-square flex items-center justify-center "
                  enter="transition ease-out duration-300 transform"
                  enterFrom="-translate-y-full"
                  enterTo="translate-y-0"
                >
                  {url && <Image fill sizes="(max-width: 672px) 100vw, (min-width: 672px) 672px" src={url} alt={name} onLoad={() => setImageLoaded(true)} />}
                  {isLoading && (
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-full w-full flex justify-center items-center">
                      <Loader />
                    </div>
                  )}
                </Transition>
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
