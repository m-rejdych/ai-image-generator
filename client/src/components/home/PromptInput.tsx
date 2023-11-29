import { Fragment, useState } from 'react'
import { Combobox, Dialog, Transition } from '@headlessui/react'

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function Example({ open, onClose }: Props) {
  const [prompt, setPrompt] = useState('')
  const [loading, setLoading] = useState(false);

  const handleClose = (): void => {
    if (loading) return;
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key !== 'Enter') return;

    e.preventDefault();
    if (!prompt) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }

  return (
    <Transition.Root show={open} as={Fragment} afterLeave={() => setPrompt('')} appear>
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
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto p-4 sm:p-6 md:p-20 lg:p-28">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Dialog.Panel className="mx-auto max-w-3xl transform divide-y divide-neutral-700 overflow-hidden rounded-xl bg-neutral-900 shadow-2xl ring-1 ring-black ring-opacity-5 transition-all">
              <Combobox disabled={loading}>
                <div className="relative">
                  <Combobox.Input
                    className="h-12 w-full border-0 bg-transparent disabled:text-neutral-500 px-4 text-neutral-200 placeholder:text-neutral-400 focus:ring-0 sm:text-sm"
                    placeholder="Describe your image"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                </div>
                {loading && (
                  <div className="p-8">
                    <div className="relative h-12 w-12 mx-auto rounded-full border-t-2 border-b-2 border-neutral-500 after:absolute after:h-12 after:w-12 after:rounded-full after:border-t-2 after:border-b-2 after:border-primary-600 after:animate-spin" />
                  </div>
                )}
              </Combobox>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root >
  )
}

