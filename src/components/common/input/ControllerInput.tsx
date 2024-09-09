import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import { ExercisePostFormInput } from '#/components/exercise/ExerciseForm';

import Input from '#components/common/input/Input';

interface ControllerInputProps {
  name: keyof ExercisePostFormInput;
  control: Control<ExercisePostFormInput>;
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

const ControllerInput = ({
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
}: ControllerInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={value}
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
          disabled={disabled}
          value={field.value ?? value}
          {...props}
        />
      )}
    />
  );
};

export default ControllerInput;
