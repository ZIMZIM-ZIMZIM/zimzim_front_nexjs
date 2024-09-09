import React from 'react';

const LoadingBar = () => (
  <div className="w-full flex justify-center items-center h-20">
    <div className="w-full max-w-xl bg-gray-300 h-2 rounded-full overflow-hidden">
      <div className="bg-blue-500 h-full animate-fill" />
    </div>
  </div>
);

export default LoadingBar;
