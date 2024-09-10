import { Dispatch, SetStateAction, useCallback } from 'react';

const useBox = (setIsOpen: Dispatch<SetStateAction<boolean>>, name: string) => {
  const handleClcikWithoutBox = useCallback(
    (event: Event) => {
      const target = event.target as HTMLElement;

      if (target.className && !target.className.includes(name)) {
        setIsOpen(false);
      }
    },
    [setIsOpen, name],
  );

  const handleEscape = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  return {
    handleClcikWithoutBox,
    handleEscape,
  };
};

export default useBox;
