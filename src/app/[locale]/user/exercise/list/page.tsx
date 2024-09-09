'use client';

import React, { useState } from 'react';

import ButtonGroup from '#/components/exercise/list/ButtonGroup';
import ExerciseTable from '#/components/exercise/list/ExerciseTable';

const ExerciseListPage = () => {
  const [checkedExercise, setCheckedExercise] = useState<string[]>([]);
  const [page, setPage] = useState<number>(1);

  return (
    <div className="flex flex-col items-center min-h-[calc(100vh-4rem)] py-8">
      <div className="w-4/5 flex flex-col gap-8">
        <ButtonGroup checkedExercise={checkedExercise} page={page} />
        <ExerciseTable
          checkedExercise={checkedExercise}
          setCheckedExercise={setCheckedExercise}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ExerciseListPage;
