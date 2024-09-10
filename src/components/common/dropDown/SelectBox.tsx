import Image from 'next/image';
import React, {
  ChangeEvent,
  useState,
  MouseEvent,
  useEffect,
  forwardRef,
} from 'react';
import { twMerge } from 'tailwind-merge';

import DropDown from '#/components/common/dropDown/DropDown';
import ErrorMessage from '#/components/common/ErrorMessage';

import useBox from '#/hooks/useBox';

export type Option = {
  value: string;
  name: string;
};

interface SelectBoxProps {
  label: string;
  options: Option[];
  selectId: string;
  selectName: string;
  className?: string;
  selectClassName?: string;
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  errorMessage?: string;
  placeHolder: string;
  value?: string;
}

const SelectBox = forwardRef<HTMLSelectElement, SelectBoxProps>(
  ({
    label,
    options,
    selectId,
    selectName,
    className = '',
    selectClassName = '',
    onChange,
    errorMessage = '',
    placeHolder,
    value,
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [internalValue, setInternalValue] = useState<string | undefined>(
      value,
    );

    const { handleClcikWithoutBox } = useBox(setIsOpen, 'custom-selected-box');

    useEffect(() => {
      document.addEventListener('click', handleClcikWithoutBox);
      return () => {
        document.removeEventListener('click', handleClcikWithoutBox);
      };
    }, [handleClcikWithoutBox]);

    useEffect(() => {
      if (value !== internalValue) {
        setInternalValue(value);
      }
    }, [value, internalValue]);

    const handleSelect = (e: MouseEvent, selectedValue: Option['value']) => {
      e.stopPropagation();
      setIsOpen(false);
      setInternalValue(selectedValue);

      if (onChange) {
        onChange({
          target: { value: selectedValue, name: selectName, id: selectId },
        } as ChangeEvent<HTMLSelectElement>);
      }
    };

    return (
      <div className="flex flex-col align-center">
        <div
          className={twMerge(
            `flex flex-col justify-between items-center ${className}`,
          )}
        >
          <label className="text-neutral-500" htmlFor={selectId}>
            {label}
          </label>
          <div
            className={twMerge(
              `custom-selected-box relative border-1 border-gray-dark px-4 h-12 inline-block content-center rounded-lg cursor-pointer ${selectClassName}`,
            )}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <div
              className={twMerge(
                `custom-selected-box selected flex justify-between items-center ${
                  internalValue ? '' : 'text-gray-dark'
                }`,
              )}
            >
              <span>{internalValue ?? placeHolder}</span>
              <Image
                src={
                  isOpen
                    ? '/icon/angle-up-solid.svg'
                    : '/icon/angle-down-solid.svg'
                }
                width={12}
                height={12}
                alt={isOpen ? 'up icon' : 'down icon'}
              />
            </div>
            <DropDown
              isOpen={isOpen}
              options={options}
              handleSelect={handleSelect}
            />
          </div>
        </div>
        <ErrorMessage message={errorMessage ?? ''} />
      </div>
    );
  },
);

export default SelectBox;
