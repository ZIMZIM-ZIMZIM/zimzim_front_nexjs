import React, { ReactNode } from 'react';

const FallbackView = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute bg-gray-light/50 flex flex-col justify-center items-center inset-0">
      <div className="flex flex-col gap-8 justify-center items-center h-full">
        {children}
      </div>
    </div>
  );
};

export default FallbackView;
