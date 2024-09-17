const useEnterKeyDown = () => {
  const handleKeyDown = <T>(
    event: React.KeyboardEvent<HTMLInputElement>,
    value: T,
    func: (value: T) => void,
  ) => {
    if (event.key === 'Enter') {
      func(value);
    }
  };
  return {
    handleKeyDown,
  };
};

export default useEnterKeyDown;
