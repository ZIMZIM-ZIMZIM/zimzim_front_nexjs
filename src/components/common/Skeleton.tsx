import React from 'react';

interface SkeletonProps {
  theadNumber: number;
  tbodyRowNumber: number;
  tbodyCellNumber: number;
}

const Skeleton = ({
  theadNumber,
  tbodyRowNumber,
  tbodyCellNumber,
}: SkeletonProps) => {
  return (
    <div className="animate-pulse">
      <table className="table-auto w-full">
        <thead className="border-b-1">
          <tr>
            {Array(theadNumber)
              .fill('')
              .map((_, index) => (
                <th key={index} className="p-4">
                  <div className="h-4 bg-gray-200 rounded-lg" />
                </th>
              ))}
          </tr>
        </thead>
        <tbody>
          {Array(tbodyRowNumber)
            .fill('')
            .map((_, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-secondary-light/20">
                {Array(tbodyCellNumber)
                  .fill('')
                  .map((_, cellIndex) => (
                    <td key={cellIndex} className="p-4">
                      <div className="h-4 bg-gray-200 rounded-lg" />
                    </td>
                  ))}
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Skeleton;
