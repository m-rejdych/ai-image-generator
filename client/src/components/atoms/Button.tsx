import type { HTMLProps } from 'react';

type ButtonTypes = 'submit' | 'button' | 'reset' | undefined;

interface Props extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
  type?: ButtonTypes;
}

interface ClassNameOptions {
  disabled?: boolean;
  className?: string;
}

const getClassName = ({ disabled, className }: ClassNameOptions): string => {
  const baseClassNames =
    'flex w-full justify-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-neutral-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

  if (disabled)
    return `${baseClassNames} bg-neutral-600 text-neutral-300 focus:outline-none pointer-events-none ${
      className ?? ''
    }`;

  return `${baseClassNames} bg-primary-600 text-neutral-100 hover:bg-primary-500 focus-visible:outline-primary-500 ${
    className ?? ''
  }`;
};

export default function Button({ disabled, children, className, ...props }: Props) {
  return (
    <button {...props} disabled={disabled} className={getClassName({ disabled, className })}>
      {children}
    </button>
  );
}
