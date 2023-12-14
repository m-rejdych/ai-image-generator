'use client';

import { useState } from 'react';

import Button from '@/components/atoms/Button';
import PromptInput from './PromptInput';

export default function AddImageButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed top-8 right-8">
      <Button onClick={() => setOpen(true)}>Add</Button>
      <PromptInput open={open} onClose={() => setOpen(false)} />
    </div>
  );
}
