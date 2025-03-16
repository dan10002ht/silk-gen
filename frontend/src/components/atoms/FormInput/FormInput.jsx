import * as React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@/components/atoms/Input';
import { Label } from '@/components/atoms/Label';
import { cn } from '@/lib/utils';

const FormInput = ({ label, error, className, type = 'text', required = false, ...props }) => {
  return (
    <div className="flex flex-col gap-y-1 space-y-2">
      {label && (
        <Label className="text-sm font-medium">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
      )}
      <Input
        type={type}
        className={cn('w-full', error && 'border-red-500 focus-visible:ring-red-500', className)}
        {...props}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  className: PropTypes.string,
  required: PropTypes.bool,
};

export default FormInput;
