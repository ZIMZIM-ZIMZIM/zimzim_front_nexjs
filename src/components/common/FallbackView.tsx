import React, { ReactNode } from 'react';

const FallbackView = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute bg-gray-light/50 h-full w-full">
      <div className="flex flex-col gap-8 justify-center items-center h-full">
        {children}
      </div>
    </div>
  );
};

export default FallbackView;
