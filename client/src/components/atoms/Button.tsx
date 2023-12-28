import type { HTMLProps } from 'react';

type ButtonTypes = 'submit' | 'button' | 'reset' | undefined;

type Variant = 'primary' | 'error';

interface Props extends Omit<HTMLProps<HTMLButtonElement>, 'type'> {
  type?: ButtonTypes;
  variant?: Variant;
}

interface ClassNameOptions {
  disabled: boolean | undefined;
  className: string | undefined;
  variant: Variant | undefined;
}

const getClassName = ({ disabled, className, variant }: ClassNameOptions): string => {
  const baseClassNames =
    'flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm font-semibold leading-6 text-neutral-100 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500';

  if (disabled)
    return `${baseClassNames} bg-neutral-600 text-neutral-300 focus:outline-none pointer-events-none ${
      className ?? ''
    }`;

  const bg = (() => {
    switch (variant) {
      case 'error':
        return 'bg-red-600 hover:bg-red-500';
      case 'primary':
      default:
        return 'bg-primary-600 hover:bg-primary-500';
    }
  })();

  return `${baseClassNames} ${bg} text-neutral-100 focus-visible:outline-primary-500 ${
    className ?? ''
  }`;
};

export default function Button({ disabled, children, className, variant, ...props }: Props) {
  return (
    <button {...props} disabled={disabled} className={getClassName({ disabled, className, variant })}>
      {children}
    </button>
  );
}
