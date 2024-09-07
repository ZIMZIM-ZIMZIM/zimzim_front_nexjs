import React from 'react';
import { Control, Controller, FieldError } from 'react-hook-form';

import Input from '#components/common/input/Input';
import { ExercisePostFormInput } from '#/components/exercise/post/ExerciseForm';

interface ControllerInputProps {
  name: keyof ExercisePostFormInput;
  control: Control<ExercisePostFormInput>;
  placeholder: string;
  error?: FieldError;
  label: string;
  type: string;
  defaultValue: string;
  inputClassName?: string;
  max?: string | number;
  min?: number;
  disabled?: boolean;
}

const ControllerInput = ({
  name,
  control,
  placeholder,
  error,
  label,
  type,
  defaultValue,
  inputClassName,
  max,
  disabled,
  min,
  ...props
}: ControllerInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      defaultValue={defaultValue}
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
          value={field.value ?? ''}
          {...props}
        />
      )}
    />
  );
};

export default ControllerInput;
