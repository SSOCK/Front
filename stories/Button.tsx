import React from 'react';
import { twMerge } from 'tailwind-merge';

export interface ButtonProps {
  label: string;
  variant?: 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  className?: string;
  onClick?: () => void;
}

export const Button = ({
  label,
  variant,
  className,
  ...props
}: ButtonProps) => {
  const baseStyle =
    'py-1 px-2 inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';

  const mode =
    variant === 'destructive'
      ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90'
      : variant === 'outline'
        ? 'border border-primary bg-primary-foreground text-primary hover:font-bold'
        : variant === 'secondary'
          ? 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
          : variant === 'ghost'
            ? 'text-black hover:bg-accent hover:text-accent-foreground'
            : variant === 'link'
              ? 'text-primary underline-offset-4 hover:underline'
              : 'bg-primary text-primary-foreground hover:bg-primary/90';

  return (
    <button
      type="button"
      className={twMerge([baseStyle, mode, className].join(' '))}
      {...props}
    >
      {label}
    </button>
  );
};
