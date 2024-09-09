import { Dispatch, SetStateAction } from 'react';
import { useCallback } from 'react';

const useSelectBox = (setIsOpen: Dispatch<SetStateAction<boolean>>) => {
  const handleClcikWithoutSelectBox = useCallback(
    (e: Event) => {
      const target = e.target as HTMLElement;

      if (
        target.className &&
        !target.className.includes('custom-selected-box')
      ) {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  return {
    handleClcikWithoutSelectBox,
  };
};

export default useSelectBox;
