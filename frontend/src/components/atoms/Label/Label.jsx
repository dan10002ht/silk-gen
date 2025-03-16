import * as React from 'react';
import PropTypes from 'prop-types';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const labelVariants = cva(
  'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
);

const Label = React.forwardRef(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));

Label.displayName = LabelPrimitive.Root.displayName;

Label.propTypes = {
  className: PropTypes.string,
  // Since this is a base label component using Radix UI, we allow any other valid label props
  // These are spread via ...props
};

export { Label };
