import React from 'react';
import {
  Control,
  Controller,
  FieldError,
  Path,
  PathValue,
  FieldValues,
} from 'react-hook-form';

import Input from '#components/common/input/Input';

interface ControllerInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  placeholder: string;
  error?: FieldError;
  label: string;
  type: string;
  inputClassName?: string;
  max?: string | number;
  min?: number;
  disabled?: boolean;
  value: string;
}

const ControllerInput = <T extends FieldValues>({
  name,
  control,
  placeholder,
  error,
  label,
  type,
  inputClassName,
  max,
  disabled,
  min,
  value,
  ...props
}: ControllerInputProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value as PathValue<T, Path<T>>}
      render={({ field }) => (
        <Input
          {...field}
          label={label}
          type={type}
          placeholder={placeholder}
          inputClassName={inputClassName}
          className="flex-row items-center"
          errorMessage={error?.message}
          max={max}
          min={min}
          value={field.value as string | number | undefined}
          disabled={disabled}
          {...props}
        />
      )}
    />
  );
};

export default ControllerInput;
