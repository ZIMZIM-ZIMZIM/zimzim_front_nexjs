import Image from 'next/image';
import React, {
  ChangeEvent,
  useState,
  MouseEvent,
  useEffect,
  forwardRef,
} from 'react';
import { twMerge } from 'tailwind-merge';

import ErrorMessage from '#components/common/ErrorMessage';
import useSelectBox from '#hooks/useSelectBox';

type Option = {
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

    const { handleClcikWithoutSelectBox } = useSelectBox(setIsOpen);

    useEffect(() => {
      document.addEventListener('click', handleClcikWithoutSelectBox);
      return () => {
        document.removeEventListener('click', handleClcikWithoutSelectBox);
      };
    }, [handleClcikWithoutSelectBox]);

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
            {isOpen && (
              <ul className="custom-selected-box options absolute left-0 right-0 mt-3.5 z-10 bg-white border-gray-dark last:border-b-1 border-t-1 border-l-1 border-r-1 rounded-md">
                {options.map((option) => (
                  <li
                    key={option.name}
                    className="option px-4 py-1"
                    onClick={(e: MouseEvent) => handleSelect(e, option.value)}
                  >
                    {option.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <ErrorMessage message={errorMessage ?? ''} />
      </div>
    );
  },
);

export default SelectBox;
