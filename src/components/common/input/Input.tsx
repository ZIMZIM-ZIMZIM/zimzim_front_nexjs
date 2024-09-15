import React, { InputHTMLAttributes, forwardRef, ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';

import ErrorMessage from '#components/common/ErrorMessage';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  inputClassName?: string;
  label?: string;
  errorMessage?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className = '',
      inputClassName = '',
      onChange,
      autoComplete = 'off',
      placeholder,
      type = 'text',
      children,
      label,
      errorMessage,
      name,
      ...props
    },
    ref,
  ) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
      onChange?.(event);
    };

    return (
      <div className="flex flex-col align-center">
        <div
          className={twMerge(
            `flex flex-col gap-1 justify-between align-center ${className}`,
          )}
        >
          <label className="text-neutral-500">{label}</label>
          <div className="relative">
            <input
              name={name}
              type={type}
              className={twMerge(
                `border-1 border-gray-dark rounded-lg h-12 w-full px-4 ${inputClassName}`,
              )}
              onChange={handleChange}
              placeholder={placeholder}
              autoComplete={autoComplete}
              ref={ref}
              {...props}
            />
            {children}
          </div>
        </div>
        <ErrorMessage message={errorMessage ?? ''} />
      </div>
    );
  },
);

export default Input;
