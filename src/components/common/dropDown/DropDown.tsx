import React, { MouseEvent } from 'react';
import { twMerge } from 'tailwind-merge';

interface DropDownProps {
  isOpen: boolean;
  options: { value: string; name: string }[];
  handleSelect: (
    event: MouseEvent<HTMLLIElement>,
    selectedValue: { value: string; name: string }['value'],
  ) => void;
  className?: string;
}

const DropDown = ({
  isOpen,
  options,
  handleSelect,
  className = '',
}: DropDownProps) => {
  return (
    <>
      {isOpen && (
        <ul
          className={twMerge(
            'custom-selected-box options absolute left-0 right-0 mt-3.5 z-10 bg-white border-gray-dark last:border-b-1 border-t-1 border-l-1 border-r-1 rounded-md',
            className,
          )}
        >
          {options.map((option) => (
            <li
              key={option.name}
              className="option px-4 py-1"
              onClick={(e: MouseEvent<HTMLLIElement>) =>
                handleSelect(e, option.value)
              }
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default DropDown;
