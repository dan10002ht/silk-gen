import * as React from 'react';
import PropTypes from 'prop-types';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 cursor-pointer shadow-sm',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary-hover font-semibold',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive-hover font-semibold',
        outline: 'border-2 border-primary bg-transparent text-primary hover:bg-accent',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary-hover font-semibold',
        tertiary:
          'bg-tertiary text-tertiary-foreground hover:bg-tertiary-hover border border-tertiary-foreground/20',
        success: 'bg-success text-success-foreground hover:bg-success-hover font-semibold',
        warning: 'bg-warning text-warning-foreground hover:bg-warning-hover font-semibold',
        ghost: 'text-foreground hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline p-0 h-auto font-medium',
        soft: 'bg-accent text-accent-foreground hover:bg-tertiary font-medium',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3 text-xs',
        lg: 'h-11 rounded-md px-8 text-base',
        xl: 'h-12 rounded-md px-10 text-base font-semibold',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});

Button.displayName = 'Button';

Button.propTypes = {
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'default',
    'destructive',
    'outline',
    'secondary',
    'tertiary',
    'success',
    'warning',
    'ghost',
    'link',
    'soft',
  ]),
  size: PropTypes.oneOf(['default', 'sm', 'lg', 'xl', 'icon']),
  asChild: PropTypes.bool,
  children: PropTypes.node,
};

export { Button, buttonVariants };
